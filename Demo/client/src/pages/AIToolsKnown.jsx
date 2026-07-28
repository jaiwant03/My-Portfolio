import "../styles/AIToolsKnown.css";

// AI Tool Logos
import chatgpt from "../assets/ai-tools/chatgpt.png";
import claude from "../assets/ai-tools/claude.png";
import gemini from "../assets/ai-tools/gemini.png";
import copilot from "../assets/ai-tools/copilot.png";
import blackbox from "../assets/ai-tools/blackbox.png";
import deepseek from "../assets/ai-tools/deepseek.png";
import vscode from "../assets/ai-tools/vscode.png";
import antigravity from "../assets/ai-tools/antigravity.png";
import cursor from "../assets/ai-tools/cursor.png";
import perplexity from "../assets/ai-tools/perplexity.png";
import kiro from "../assets/ai-tools/kiro.png";
import lovable from "../assets/ai-tools/lovable.png";
import gamma from "../assets/ai-tools/gamma.png";
import canva from "../assets/ai-tools/canva.png";
import figma from "../assets/ai-tools/figma.png";

function AIToolsKnown() {
  const aiTools = [
    { name: "ChatGPT", image: chatgpt },
    { name: "Claude", image: claude },
    { name: "Google Gemini", image: gemini },
    { name: "Microsoft Copilot", image: copilot },
    { name: "BlackBox", image: blackbox },
    { name: "DeepSeek", image: deepseek },
    { name: "VS Code", image: vscode },
    { name: "Antigravity", image: antigravity },
    { name: "Cursor AI", image: cursor },
    { name: "Perplexity AI", image: perplexity },
    { name: "Kiro", image: kiro },
    { name: "Lovable AI", image: lovable },
    { name: "Gamma AI", image: gamma },
    { name: "Canva", image: canva },
    { name: "Figma AI", image: figma },
  ];

  return (
    <div className="ai-tools-page">
      <h1>AI Tools Worked</h1>

      <div className="ai-tools-grid">
        {aiTools.map((tool) => (
          <div className="ai-tool-card" key={tool.name}>
            <span className="shimmer" aria-hidden="true"></span>

            <img
              src={tool.image}
              alt={tool.name}
              className="ai-tool-logo"
            />

            <h3>{tool.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIToolsKnown;