const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY ='AIzaSyA1tTu537HUkzwOMyjun1HeLlYG4hsIYQA';

app.post('/api/generate-roadmap', async (req, res) => {
  const { formResponses } = req.body;

   console.log("📥 Received formResponses:", formResponses); // 👈 ADD THIS

  const prompt = `
You are a roadmap generation assistant. Based on the following user responses, generate a personalized learning roadmap in pure JSON format (no explanation, no markdown).

User responses:
${JSON.stringify(formResponses, null, 2)}

Output strictly in this JSON format:
{
  "modules": [
    {
      "title": "Module 1: Basics",
      "chapters": [
        {
          "title": "Chapter 1: Introduction to Programming",
          "description": "Learn what programming is...",
          "references": ["https://youtube.com/..."]
        }
      ]
    }
  ]
}
`;
 console.log("📨 Prompt sent to Gemini:", prompt);
  try {
   const response = await axios.post(
             `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
            contents: [{ parts: [{ text: prompt }] }],
        },
        {
            headers: {
            'Content-Type': 'application/json',
            },
        }
);

        const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        console.log("📦 Gemini raw response:", rawText); // ✅ Add this

        const jsonStart = rawText.indexOf('{');
        const jsonEnd = rawText.lastIndexOf('}');

        if (jsonStart === -1 || jsonEnd === -1) {
        console.error("❌ JSON structure not found in response");
        return res.status(500).json({ error: "Invalid response from Gemini. No JSON found." });
        }

        const jsonString = rawText.slice(jsonStart, jsonEnd + 1);

        let parsed;
        try {
        parsed = JSON.parse(jsonString);
        } catch (e) {
        console.error("❌ JSON parsing failed:", e.message);
        console.error("👀 Raw JSON String:", jsonString);
        return res.status(500).json({ error: "JSON parsing failed from Gemini response." });
        }

        res.json(parsed);

  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
