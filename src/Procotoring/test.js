import React, { useState, useEffect, useRef } from 'react';
import "../css/index.css"
const ProctoringSystem = () => {
  const [isCameraAllowed, setIsCameraAllowed] = useState(false);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [violations, setViolations] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [status, setStatus] = useState('Normal');
  const [faceStatus, setFaceStatus] = useState('Checking...');
  const [peopleCount, setPeopleCount] = useState(0);

  const [mouseInactiveTime, setMouseInactiveTime] = useState(0);
  const [mouseMovementCounter, setMouseMovementCounter] = useState(0);

  const setupWebcamRef = useRef(null);
  const webcamFeedRef = useRef(null);
  const faceOverlayRef = useRef(null);
  const latestScreenshotRef = useRef(null);
  const micIndicatorRef = useRef(null);
  const activityIndicatorRef = useRef(null);

  const streamRef = useRef(null);
  const poseRef = useRef(null);

  const mouseActivityInterval = useRef(null);
  const mouseInactivityInterval = useRef(null);
  const videoCheckInterval = useRef(null);
  const lastViolationTimeRef = useRef(0);
  const originalWindowSize = useRef({ width: window.innerWidth, height: window.innerHeight });

  const violationCooldown = 1000;

  useEffect(() => {
    if (isTestRunning) {
      document.addEventListener('mousemove', handleMouseMove);
      preventCheating();
      startMouseInactivityTracking();
      startVideoMonitoring();
      startMouseActivityDecay();
      checkMicActivityForViolation();
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(mouseInactivityInterval.current);
      clearInterval(videoCheckInterval.current);
      clearInterval(mouseActivityInterval.current);
    };
  }, [isTestRunning]);

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      setupWebcamRef.current.srcObject = stream;
      webcamFeedRef.current.srcObject = stream;
      setIsCameraAllowed(true);
      startMicMonitoring(stream);

      const Pose = await import('@mediapipe/pose');
      poseRef.current = new Pose.Pose({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
      poseRef.current.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
    } catch (err) {
      alert('Camera and microphone access are required.');
      console.error(err);
    }
  };

  const startMicMonitoring = (stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const checkMicVolume = () => {
      analyser.getByteFrequencyData(dataArray);
      const avgVolume = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;

      if (micIndicatorRef.current) {
        micIndicatorRef.current.style.backgroundColor = avgVolume > 50 ? 'red' : avgVolume > 15 ? 'orange' : 'gray';
      }

      if (avgVolume > 50) {
        recordViolation('Loud Sound', 'Excessive noise detected');
      }

      requestAnimationFrame(checkMicVolume);
    };

    checkMicVolume();
  };

  const startTest = () => {
    setIsTestRunning(true);
    setViolations([]);
    setScreenshots([]);
    takeScreenshot();
    alert('Test started. You are now being monitored.');
  };

  const endTest = () => {
    setIsTestRunning(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const resetTest = () => {
    window.location.reload();
  };

  const handleMouseMove = () => {
    if (!isTestRunning) return;
    setMouseInactiveTime(0);
    setMouseMovementCounter((prev) => Math.min(prev + 0.3, 100));
    updateActivityIndicator();
  };

  const startMouseActivityDecay = () => {
    mouseActivityInterval.current = setInterval(() => {
      if (!isTestRunning) return;
      setMouseMovementCounter((prev) => Math.max(0, prev - 0.5));
      updateActivityIndicator();
    }, 300);
  };

  const updateActivityIndicator = () => {
    if (!activityIndicatorRef.current) return;
    const activityLevel = (mouseMovementCounter / 50) * 100;
    activityIndicatorRef.current.style.width = `${Math.min(activityLevel, 100)}%`;

    if (activityLevel > 80) {
      activityIndicatorRef.current.style.backgroundColor = '#F44336';
      recordViolation('Unusual Mouse Activity', 'Mouse activity extremely high');
      endTest();
    } else if (activityLevel > 50) {
      activityIndicatorRef.current.style.backgroundColor = '#FF9800';
    } else {
      activityIndicatorRef.current.style.backgroundColor = '#2196F3';
    }
  };

  const startMouseInactivityTracking = () => {
    mouseInactivityInterval.current = setInterval(() => {
      if (!isTestRunning) return;
      setMouseInactiveTime((prev) => {
        if (prev >= 60) {
          recordViolation('Mouse Inactivity', 'No mouse movement for 60 seconds');
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const preventCheating = () => {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) recordViolation('Tab Switch', 'Switched tabs or minimized window');
    });
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      recordViolation('Context Menu', 'Right click detected');
    });
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && (e.key === 'c' || e.key === 'v')) || (e.altKey && e.key.toLowerCase() === 'tab') || (e.key === 'F12') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i')) {
        recordViolation('Keyboard Shortcut', `Shortcut pressed: ${e.key}`);
      }
    });
    window.addEventListener('blur', () => recordViolation('Window Blur', 'Window lost focus'));
    window.addEventListener('resize', () => {
      const widthChange = Math.abs(window.innerWidth - originalWindowSize.current.width) / originalWindowSize.current.width;
      const heightChange = Math.abs(window.innerHeight - originalWindowSize.current.height) / originalWindowSize.current.height;
      if (widthChange > 0.2 || heightChange > 0.2) {
        recordViolation('Window Resize', 'Window resized');
      }
    });
  };

  const takeScreenshot = () => {
    if (!webcamFeedRef.current) return;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = webcamFeedRef.current.videoWidth;
    canvas.height = webcamFeedRef.current.videoHeight;
    context.drawImage(webcamFeedRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
    latestScreenshotRef.current.src = dataUrl;
    setScreenshots((prev) => [...prev, { timestamp: new Date().toLocaleTimeString(), dataUrl }]);
  };

  const recordViolation = (type, details) => {
    const now = Date.now();
    if (now - lastViolationTimeRef.current < violationCooldown) return;
    lastViolationTimeRef.current = now;

    const violation = { timestamp: new Date().toLocaleTimeString(), type, details };
    setViolations((prev) => [...prev, violation]);
    takeScreenshot();
    setStatus('Violation Detected');

    setTimeout(() => setStatus('Normal'), 3000);

    if (violations.length + 1 >= 6 && isTestRunning) {
      alert('Too many violations. Test will end.');
      endTest();
    }
  };

  const startVideoMonitoring = () => {
    videoCheckInterval.current = setInterval(checkForPose, 3000);
  };

  const checkForPose = async () => {
    try {
      if (!poseRef.current || !webcamFeedRef.current) return;
      const canvas = faceOverlayRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const results = await poseRef.current.send({ image: webcamFeedRef.current });

      const landmarks = results.poseLandmarks || [];

      if (landmarks.length > 0) {
        ctx.strokeStyle = 'lime';
        ctx.lineWidth = 3;
        landmarks.forEach(point => {
          ctx.beginPath();
          ctx.arc(point.x * canvas.width, point.y * canvas.height, 5, 0, 2 * Math.PI);
          ctx.stroke();
        });
        setFaceStatus('Pose Detected');
        setPeopleCount(1);
      } else {
        setFaceStatus('No Person');
        setPeopleCount(0);
        recordViolation('No Person Detected', 'No user detected in camera');
      }
    } catch (err) {
      console.error('Pose detection error:', err);
    }
  };

  const checkMicActivityForViolation = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(streamRef.current);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    setInterval(() => {
      analyser.getByteFrequencyData(dataArray);
      const avgVolume = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
      if (avgVolume > 85) {
        recordViolation('Loud Sound Detected', 'Continuous loud noise');
      }
    }, 1000);
  };

  return (
    <div>
      <h1>Proctoring Test System</h1>

      {!isCameraAllowed && (
        <div id="setup-panel">
          <h2>Setup</h2>
          <button onClick={requestCameraAccess}>Allow Camera Access</button>
        </div>
      )}

      {isCameraAllowed && !isTestRunning && (
        <div id="camera-preview">
          <h3>Camera Preview</h3>
          <video ref={setupWebcamRef} width="320" height="240" autoPlay muted></video>
          <button onClick={startTest}>Start Test</button>
        </div>
      )}

      {isTestRunning && (
        <div id="test-area">
          <h2>Test Running</h2>
          <p>Status: <span>{status}</span></p>

          <div className="monitoring">
            <h3>Activity Monitoring</h3>
            <div id="mouse-activity">
              <div ref={activityIndicatorRef} id="activity-indicator" style={{ height: '10px', backgroundColor: 'gray' }}></div>
            </div>
          </div>

          <div className="monitoring">
            <h3>Video and Mic Monitoring</h3>
            <div style={{ position: 'relative' }}>
              <video ref={webcamFeedRef} width="480" height="360" autoPlay muted></video>
              <canvas ref={faceOverlayRef} width="480" height="360" style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
            </div>

            <div ref={micIndicatorRef} style={{ width: '100px', height: '10px', backgroundColor: 'gray', marginTop: '10px' }}></div>
            <p>Face Detected: {faceStatus}</p>
            <p>People Count: {peopleCount}</p>
            <img ref={latestScreenshotRef} src="" alt="Screenshot" width="160" height="120" />
          </div>

          <div className="monitoring">
            <h3>Violations</h3>
            <div id="violations">
              {violations.map((v, idx) => (
                <p key={idx}><strong>{v.timestamp}:</strong> {v.type} - {v.details}</p>
              ))}
            </div>
          </div>

          <button onClick={endTest}>End Test</button>
        </div>
      )}

      {!isTestRunning && isCameraAllowed && (
        <div id="results">
          <h2>Test Results</h2>
          <div id="violation-log">
            {violations.length ? violations.map((v, idx) => (
              <p key={idx}><strong>{v.timestamp}:</strong> {v.type} - {v.details}</p>
            )) : <p>No violations detected during the test.</p>}
          </div>
          <button onClick={resetTest}>Start New Test</button>
        </div>
      )}
    </div>
  );
};

export default ProctoringSystem;
