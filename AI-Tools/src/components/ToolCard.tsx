import { useState } from "react";
import type { Tool } from "../App";

const categoryConfig: Record<string, { color: string; bg: string; icon: string }> = {
  Chat: { color: "#3b82f6", bg: "#eff6ff", icon: "💬" },
  Image: { color: "#a855f7", bg: "#faf5ff", icon: "🎨" },
  Video: { color: "#f43f5e", bg: "#fff1f2", icon: "🎬" },
  Code: { color: "#10b981", bg: "#f0fdf4", icon: "💻" },
  Audio: { color: "#f59e0b", bg: "#fffbeb", icon: "🎵" },
  Productivity: { color: "#6366f1", bg: "#eef2ff", icon: "⚡" },
};

function getLogoUrl(tool: Tool): string {
  try {
    const hostname = new URL(tool.url).hostname.replace("www.", "");
    return `https://logo.clearbit.com/${hostname}`;
  } catch {
    return "";
  }
}

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const config = categoryConfig[tool.category] ?? { color: "#64748b", bg: "#f8fafc", icon: "🤖" };
  const logoUrl = getLogoUrl(tool);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="tool-card">
      <div
        className="tool-card-image"
        style={{ background: config.bg, borderBottom: `1px solid ${config.color}22` }}
      >
        {logoUrl && !imgFailed ? (
          <img
            src={logoUrl}
            alt={`${tool.name} logo`}
            className="tool-img"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="tool-card-icon">{config.icon}</span>
        )}
      </div>

      <div className="tool-card-badges">
        {tool.isFree ? (
          <span className="badge badge-free">FREE</span>
        ) : (
          <span className="badge badge-paid">PAID</span>
        )}
        {tool.isNew && <span className="badge badge-new">NEW</span>}
        {tool.isPopular && <span className="badge badge-popular">POPULAR</span>}
      </div>

      <div className="tool-card-body">
        <div className="tool-card-header">
          <h3 className="tool-card-name">{tool.name}</h3>
          <span
            className="tool-category-pill"
            style={{
              color: config.color,
              borderColor: `${config.color}44`,
              background: `${config.color}12`,
            }}
          >
            {tool.category}
          </span>
        </div>
        <p className="tool-card-desc">{tool.description}</p>
      </div>

      <div className="tool-card-footer">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="tool-card-btn"
          style={{ background: config.color }}
        >
          Try {tool.name} →
        </a>
      </div>
    </div>
  );
}