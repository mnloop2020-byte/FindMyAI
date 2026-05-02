interface WelcomeProps {
  onExplore: () => void;
}


export default function Welcome({ onExplore }: WelcomeProps) {
  // {onExplore} means we are using destructuring to extract the onExplore function from the props object passed to the Welcome component. This allows us to use onExplore directly within our component without having to reference props.onExplore every time we want to call it. The onExplore function is expected to be a callback function that will be 
  // triggered when the user clicks the "Explore Tools" button, allowing us to switch from the welcome page to the tools page in our app. 
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <span className="welcome-badge">◈ AI Tools Directory</span>
        <h1 className="welcome-title">
          Welcome to <span>MN AI Hub</span>
        </h1>
        <p className="welcome-subtitle">
          Discover and explore the best AI tools available today —
          curated, categorized, and ready to use. From chat to code,
          image to audio, we have it all in one place.
        </p>
        <button className="welcome-btn" onClick={onExplore}>
          Explore Tools →
        </button>
      </div>
    </div>
  );
}