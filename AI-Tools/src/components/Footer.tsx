export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            <span>◈</span> MN AI Hub
          </div>
          <p className="footer-copy">
            © {year} MN AI Hub — Built with React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}