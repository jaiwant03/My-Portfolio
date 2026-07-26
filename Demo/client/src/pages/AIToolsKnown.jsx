import "../styles/AIToolsKnown.css";

function AIToolsKnown() {
  return (
    <div className="ai-tools-page">
      <h1>AI Tools Worked</h1>

      <div className="ai-tools-grid">
        {["ChatGPT","Claude","Google Gemini","Microsoft Copilot","BlackBox","DeepSeek","VS code","Antigravity","Cursor AI","Perplexity AI","Kiro","Lovable AI","Gamma AI","Canva","Figma AI"].map((tool) => (
          <div className="ai-tool-card" key={tool}>
            <span className="shimmer" aria-hidden="true" />
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIToolsKnown;
