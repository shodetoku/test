function DashboardSummaryCard({ className = '', as = 'div', children, onClick, type = 'button' }) {
  const Component = as;
  const classes = ['summary-card', className].filter(Boolean).join(' ');

  if (Component === 'button') {
    return (
      <button type={type} className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
}

export default DashboardSummaryCard;
