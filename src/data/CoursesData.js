import react_0 from "../assets/react_0.png"
import react_bg from "../assets/react_bg_0.svg"
import dsa_0 from "../assets/dsa_0.png"
import dsa_bg_0 from "../assets/dsa__bg_0.svg"
import cyber_0 from "../assets/cyber_0.png"


const courses = [
    // {
    //   id: 1,
    //   title: "JavaScript Basics",
    //   description: "Learn JS from scratch with free resources.",
    //   category: "Programming"
    // },
    {
      id: 2,
      img: react_0,
      title: "React for Beginners",
      description: "Understand components, props, and state.",
      category: "Web Development",
      style: {
    backgroundImage: `url(${react_bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#102B22',
    borderRadius: '12px'
  }
    },
    {
      id: 3,
      img: dsa_0,
      title: "Data Structures in Java",
      description: "Prepare for interviews with DSA in Java. helo java i am tejas etc ",
      category: "Programming",
      style: {
    backgroundImage: `url(${dsa_bg_0})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#102B22',
    borderRadius: '12px'
  }
    },
    {
      id: 4,
      img: cyber_0,
      title: "Cybersecurity",
      description: "Design user-friendly interfaces with principles of visual hierarchy and usability. iam more text to fill the space ",
      category: "Design",
      style: {
    backgroundImage: `url(${react_bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#102B22',
    borderRadius: '12px'
  }
    },
    {
      id: 5,
      img: react_0,
      title: "devops",
      description: "Get started with ML models, training data, and evaluation techniques.",
      category: "AI/ML",
      style: {
    backgroundImage: `url(${react_bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#102B22',
    borderRadius: '12px'
  }
    },
    // {
    //   id: 6,
    //   title: "Operating Systems Essentials",
    //   description: "Learn about processes, memory management, file systems, and more.",
    //   category: "Computer Science"
    // },
    // {
    //   id: 7,
    //   title: "Advanced React",
    //   description: "Build modern UIs with hooks, context API, and routing.",
    //   category: "Web Development"
    // },
    // {
    //   id: 8,
    //   title: "Database Management with MySQL",
    //   description: "Explore relational databases, queries, joins, and normalization.",
    //   category: "Backend"
    // },
    // {
    //     id: 9,
    //     title: "Database Management with progestrate",
    //     description: "Explore relational databases, queries, joins, and normalization.",
    //     category: "Backend"
    //   }
  ];
  
  export default courses;
  