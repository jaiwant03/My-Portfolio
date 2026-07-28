import "../styles/achievements.css";

const achievements = [
  {
    title: "Internships",
    value: "3+",
    description: "Completed internships in Full Stack Development, Data Analytics, and Artificial Intelligence."
  },
  {
    title: "Projects",
    value: "25+",
    description: "Developed AI, Web Development, Data Science, and Full Stack applications."
  },
  {
    title: "Global Certifications",
    value: "6",
    description: "Earned internationally recognized certifications from leading technology platforms."
  },
  {
    title: "Technical Skills",
    value: "30+",
    description: "Experienced with programming languages, frameworks, databases, AI tools, and cloud technologies."
  },
  {
    title: "AI Tools",
    value: "15+",
    description: "Worked with modern AI tools for development, automation, productivity, and research."
  },
  {
    title: "Problem Solving",
    value: "500+",
    description: "Solved coding problems across LeetCode and CodeChef to strengthen DSA skills."
  }
];

function Achievements() {
  return (
    <div className="achievements-page">
      <h1>Achievements</h1>

      <div className="achievement-grid">
        {achievements.map((item, index) => (
          <div className="achievement-card" key={index}>
            <h2>{item.value}</h2>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;