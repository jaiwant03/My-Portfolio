import "../styles/skills.css";

/* =========================
   Programming Languages
========================= */
import python from "../assets/tech/python.png";
import java from "../assets/tech/java.png";
import c from "../assets/tech/c.png";
import js from "../assets/tech/js.png";
import typescript from "../assets/tech/typescript.png";
import sql from "../assets/tech/sql.png";

/* =========================
   Generative AI
========================= */
import llms from "../assets/tech/llms.png";
import ollama from "../assets/tech/ollama.png";
import langchain from "../assets/tech/langchain.png";
import huggingface from "../assets/tech/huggingface.png";
import rag from "../assets/tech/rag.png";
import sentenceTransformers from "../assets/tech/sentence_transformers.png";
import faiss from "../assets/tech/faiss.png";

/* =========================
   AI / Machine Learning
========================= */
import opencv from "../assets/tech/opencv.png";
import numpy from "../assets/tech/numpy.png";
import pandas from "../assets/tech/pandas.png";
import supervisedUnsupervised from "../assets/tech/supervised_unsupervised_learning.png";
import modelEvaluation from "../assets/tech/model_evaluation.png";
import featureEngineering from "../assets/tech/feature_engineering.png";

/* =========================
   Frontend Technologies
========================= */
import html from "../assets/tech/html.png";
import css from "../assets/tech/css.png";
import react from "../assets/tech/react.png";
import tailwind from "../assets/tech/tailwind.png";
import framerMotion from "../assets/tech/framer_motion.png";
import materialUi from "../assets/tech/material_ui.png";
import vite from "../assets/tech/vite.png";

/* =========================
   Backend & API Development
========================= */
import node from "../assets/tech/node.png";
import express from "../assets/tech/express.png";
import fastapi from "../assets/tech/fastapi.png";
import restApi from "../assets/tech/rest_api.png";
import jwt from "../assets/tech/jwt_authentication.png";
import google from "../assets/tech/google_authentication.png";
/* =========================
   Databases
========================= */
import mysql from "../assets/tech/mysql.png";
import postgresql from "../assets/tech/postgresql.png";
import mongodb from "../assets/tech/mongodb.png";
import redis from "../assets/tech/redis.png";
import firebase from "../assets/tech/firebase.png";
import supabase from "../assets/tech/supabase.png";

/* =========================
   Visualization & Analytics
========================= */
import colab from "../assets/tech/colab.png";
import jupyter from "../assets/tech/jupyter.png";
import powerbi from "../assets/tech/powerbi.png";
import tableau from "../assets/tech/tableau.png";
import chartjs from "../assets/tech/chartjs.png";
import matplotlib from "../assets/tech/matplotlib.png";
import seaborn from "../assets/tech/seaborn.png";

/* =========================
   Deployment (DevOps)
========================= */
import vercel from "../assets/tech/vercel.png";
import netlify from "../assets/tech/netlify.png";
import render from "../assets/tech/render.png";
import aws from "../assets/tech/aws.png";
import docker from "../assets/tech/docker.png";
import postman from "../assets/tech/postman.png";
import githubActions from "../assets/tech/github_actions.png";
import railway from "../assets/tech/railway.png";

/* =========================
   Core Fundamentals
========================= */
import dsa from "../assets/tech/dsa.png";
import oop from "../assets/tech/oop.png";
import dbms from "../assets/tech/dbms.png";
import network from "../assets/tech/computer_network.png";

/* =========================
   Reusable Section (card)
========================= */
const SkillSection = ({ title, skills }) => (
  <div className="skill-section">
    <h3>{title}</h3>
    <div className="skill-grid">
      {skills.map((skill, index) => (
        <div className="skill-card" key={index}>
          <img src={skill.icon} alt={skill.name} />
          <span>{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function Skills() {
  return (
    <section className="skills-page">
      {/* ❄️ Snowfall layers */}
      <div className="snow-layer"></div>

      {/* ❄️ Snow accumulation at bottom */}
      <div className="snow-ground"></div>

      <h2 className="skills-title">Tech Stack</h2>

      <div className="skills-grid">
        <SkillSection
          title="Programming Languages"
          skills={[
            { name: "Python", icon: python },
            { name: "Java", icon: java },
            { name: "C", icon: c },
            { name: "JavaScript", icon: js },
            { name: "TypeScript", icon: typescript },
            { name: "SQL", icon: sql }
          ]}
        />

        <SkillSection
          title="Generative AI"
          skills={[
            { name: "LLMs", icon: llms },
            { name: "Ollama", icon: ollama },
            { name: "LangChain", icon: langchain },
            { name: "Hugging Face", icon: huggingface },
            { name: "RAG", icon: rag },
            { name: "Sentence Transformers", icon: sentenceTransformers },
            { name: "FAISS (Vector DB)", icon: faiss }
          ]}
        />

        <SkillSection
          title="AI / ML"
          skills={[
            { name: "OpenCV", icon: opencv },
            { name: "NumPy", icon: numpy },
            { name: "Pandas", icon: pandas },
            { name: "Supervised & Unsupervised Learning", icon: supervisedUnsupervised },
            { name: "Model Evaluation", icon: modelEvaluation },
            { name: "Feature Engineering", icon: featureEngineering }
          ]}
        />

        <SkillSection
          title="Frontend Technologies"
          skills={[
            { name: "HTML", icon: html },
            { name: "CSS", icon: css },
            { name: "ReactJS", icon: react },
            { name: "Tailwind CSS", icon: tailwind },
            { name: "Framer Motion", icon: framerMotion },
            { name: "Material UI", icon: materialUi },
            { name: "Vite", icon: vite }
          ]}
        />

        <SkillSection
          title="Backend & API Development"
          skills={[
            { name: "Node.js", icon: node },
            { name: "Express.js", icon: express },
            { name: "FastAPI", icon: fastapi },
            { name: "RESTful APIs", icon: restApi },
            { name: "JWT Authentication", icon: jwt },
            { name: "Google Authentication", icon: google }
          ]}
        />

        <SkillSection
          title="Databases"
          skills={[
            { name: "MySQL", icon: mysql },
            { name: "PostgreSQL", icon: postgresql },
            { name: "MongoDB", icon: mongodb },
            { name: "Redis", icon: redis },
            { name: "Firebase", icon: firebase },
            { name: "Supabase", icon: supabase }
          ]}
        />

        <SkillSection
          title="Visualization & Analytics"
          skills={[
            { name: "Google Colab", icon: colab },
            { name: "Jupyter Notebook", icon: jupyter },
            { name: "Power BI", icon: powerbi },
            { name: "Tableau", icon: tableau },
            { name: "Chart.js", icon: chartjs },
            { name: "Matplotlib", icon: matplotlib },
            { name: "Seaborn", icon: seaborn }
          ]}
        />

        <SkillSection
          title="Deployment (DevOps)"
          skills={[
            { name: "Vercel", icon: vercel },
            { name: "Netlify", icon: netlify },
            { name: "Render", icon: render },
            { name: "AWS", icon: aws },
            { name: "Docker", icon: docker },
            { name: "Postman", icon: postman },
            { name: "GitHub Actions", icon: githubActions },
            { name: "Railway", icon: railway }
          ]}
        />

        <SkillSection
          title="Core Fundamentals"
          skills={[
            { name: "Data Structures & Algorithms", icon: dsa },
            { name: "Object-Oriented Programming", icon: oop },
            { name: "DBMS", icon: dbms },
            { name: "Computer Network", icon: network }
          ]}
        />
      </div>
    </section>
  );
}