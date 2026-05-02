import type { Tool } from "../App.tsx";
import  ToolCard from "./ToolCard.tsx";

interface ToolsGridProps {
  tools: Tool[];
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <section className="tools-section">
      <div className="container">
        <div className="tools-section-header">
          <p className="section-label">▸ All Tools</p>
          <h2 className="section-title">Explore AI Tools</h2>
          <p className="section-subtitle">
            {tools.length} tools across {" "}
            {[...new Set(tools.map((t) => t.category))].length} categories
          </p>
        </div>

        <div className="tools-grid">
          {tools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}