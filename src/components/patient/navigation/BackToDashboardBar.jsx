function BackToDashboardBar({ onNavigate, label = 'Back to Dashboard' }) {
  return (
    <div className="back-row">
      <button
        type="button"
        className="back-link"
        onClick={() => onNavigate('dashboard')}
      >
        <span className="back-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M15.75 19.5 8.25 12l7.5-7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>{label}</span>
      </button>
    </div>
  );
}

export default BackToDashboardBar;

