import "../styles/achievements.css";

const achievements = [
{
  title: "Thooral Hackathon",
  value: "1st Place",
  description: (
    <>
      Crowned <strong>Champion</strong> at the{" "}
      <strong>Thooral Hackathon</strong>, securing{" "}
      <strong>1st Place</strong> and a{" "}
      <strong>₹15,000 Cash Prize</strong>. The competition was conducted by{" "}
      <strong>PSG College of Technology - Thooral Hackathon</strong>, where our team delivered an{" "}
      <strong>innovative</strong> and{" "}
      <strong>high-impact solution</strong> under competitive conditions.
    </>
  )
},
{
  title: "Code 'O' Clock Hackathon",
  value: "3rd Place",
  description: (
    <>
  Secured <strong>3rd Place</strong> at the{" "}
  <strong>Code 'O' Clock Hackathon</strong> organized by{" "}
  <strong>Coimbatore Institute of Technology (CIT)</strong>. Demonstrated{" "}
  <strong>exceptional problem-solving</strong>,{" "}
  <strong>team collaboration</strong>, and{" "}
  <strong>technical innovation</strong> to develop an impactful solution during
  the hackathon.
</>
  )
},
{
  title: "International Credentials",
  value: "6+",
  description: (
    <>
      Earned <strong>6+ internationally recognized certifications</strong> from{" "}
      <strong>leading global technology platforms</strong>, demonstrating{" "}
      <strong>continuous learning</strong>,{" "}
      <strong>technical excellence</strong>, and{" "}
      <strong>industry-ready expertise</strong> across{" "}
      <strong>Artificial Intelligence</strong>,{" "}
      <strong>Data Science</strong>, and{" "}
      <strong>Full-Stack Development</strong>.
    </>
  )
},

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