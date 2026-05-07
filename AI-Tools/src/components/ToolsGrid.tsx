import type { Tool } from "../App.tsx";
import ToolCard from "./ToolCard.tsx";

interface ToolsGridProps {
  tools: Tool[];
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
  const categoryCount = [...new Set(tools.map((t) => t.category))].length;

  return (
    <section className="tools-section">
      <div className="container">
        <div className="tools-section-header">
          <p className="section-label">▸ All Tools</p>
          <h2 className="section-title">Explore AI Tools</h2>
          <p className="section-subtitle">
            {tools.length} tool{tools.length !== 1 ? "s" : ""} across{" "}
            {categoryCount} categor{categoryCount !== 1 ? "ies" : "y"}
          </p>
        </div>

        {tools.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No tools found</h3>
            <p className="empty-state-desc">
              Try a different search term or select a different category.
            </p>
          </div>
        ) : (
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <ToolCard key={`${tool.name}-${index}`} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}