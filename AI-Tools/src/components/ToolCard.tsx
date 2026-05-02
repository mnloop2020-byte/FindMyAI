import type { Tool } from "../App";

const categoryColors: Record<string, string> = {
  Chat: "#3b82f6",
  Image: "#a855f7",
  Video: "#f43f5e",
  Code: "#10b981",
  Audio: "#f59e0b",
  Productivity: "#06b6d4",
};

const categoryBg: Record<string, string> = {
  Chat: "#eff6ff",
  Image: "#faf5ff",
  Video: "#fff1f2",
  Code: "#f0fdf4",
  Audio: "#fffbeb",
  Productivity: "#ecfeff",
};

const toolImages: Record<string, string> = {
  "ChatGPT": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png",
  "Claude": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/240px-Claude_AI_logo.svg.png",
  "Midjourney": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Midjourney_Emblem.png/240px-Midjourney_Emblem.png",
  "GitHub Copilot": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/GitHub_Copilot_logo.svg/240px-GitHub_Copilot_logo.svg.png",
  "Suno": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Suno_AI_Logo.png/240px-Suno_AI_Logo.png",
  "Runway": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Runway_ml_logo.png/240px-Runway_ml_logo.png",
  "Notion AI": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/240px-Notion-logo.svg.png",
  "Cursor": "https://cursor.sh/brand/icon.svg",
  "DALL·E 3": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png",
  "ElevenLabs": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/ElevenLabs_logo.png/240px-ElevenLabs_logo.png",
};

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const color = categoryColors[tool.category];
  const bg = categoryBg[tool.category];
  const imgSrc = toolImages[tool.name];

  return (
    <div className="tool-card">

      {/* Image */}
      <div className="tool-card-image" style={{ background: bg, borderBottom: `1px solid ${color}22` }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={tool.name}
            className="tool-img"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <span className="tool-card-icon">🤖</span>
        )}
      </div>

      {/* Badges */}
      <div className="tool-card-badges">
        {tool.isFree ? (
          <span className="badge badge-free">FREE</span>
        ) : (
          <span className="badge badge-paid">PAID</span>
        )}
        {tool.isNew && <span className="badge badge-new">NEW</span>}
        {tool.isPopular && <span className="badge badge-popular">POPULAR</span>}
      </div>

      {/* Content */}
      <div className="tool-card-body">
        <div className="tool-card-header">
          <h3 className="tool-card-name">{tool.name}</h3>
          <span className="tool-category-pill" style={{ color: color, borderColor: `${color}44`, background: `${color}12` }}>
            {tool.category}
          </span>
        </div>
        <p className="tool-card-desc">{tool.description}</p>
      </div>

      {/* Button */}
      <div className="tool-card-footer">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="tool-card-btn"
          style={{ background: color }}
        >
          Try {tool.name} →
        </a>
      </div>

    </div>
  );
}