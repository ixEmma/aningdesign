function HeaderIconButton({children,label,onClick,isActive = false,controls}) {
  return (
    <button
      type="button"
      className={`header-icon-button${isActive ? ' is-active' : ''}`}
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-expanded={controls ? isActive : undefined}
      aria-controls={controls}
    >
      {children}
    </button>
  )
}

export default HeaderIconButton

