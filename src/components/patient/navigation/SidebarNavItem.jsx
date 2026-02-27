import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SidebarNavItem({ item, isActive, onClick, className = '' }) {
  const stateClassName = isActive ? 'active' : '';
  const classes = ['portal-nav-item', stateClassName, className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-current={isActive ? 'page' : undefined}
      onClick={() => onClick(item.path)}
    >
      <FontAwesomeIcon icon={item.icon} />
      <span>{item.label}</span>
    </button>
  );
}

export default SidebarNavItem;
