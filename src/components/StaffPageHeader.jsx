function StaffPageHeader({ title, subtitle, action }) {
  return (
    <header className="staff-header">
      <div className="staff-header-info">
        <div className="staff-avatar">
          <span>S</span>
        </div>
        <div className="staff-header-details">
          <h1>{title}</h1>
          {subtitle && (
            <p>{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="staff-header-actions">{action}</div>}
    </header>
  );
}

export default StaffPageHeader;
