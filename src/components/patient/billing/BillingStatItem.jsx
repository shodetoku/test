function BillingStatItem({ icon, label, value, info }) {
  return (
    <div className="stat-item">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        <span className="stat-info">{info}</span>
      </div>
    </div>
  );
}

export default BillingStatItem;
