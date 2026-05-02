interface HeaderProps {
  onBack: () => void;

}

export default function Header({ onBack }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div className="header-logo">
            <span className="logo-icon">◈</span>
            MN <span>AI Hub</span>
          </div>
          <p className="header-subtitle">
            Discover the best AI tools — curated, categorized, and ready to use.
          </p>
        </div>
        <button className="back-btn" onClick={onBack}>
          ← Back to Home
        </button>
        
      </div>
    </header>
  );
}