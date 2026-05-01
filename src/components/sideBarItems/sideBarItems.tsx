import { NavLink } from 'react-router'
import type { ReactNode } from 'react'
import style from './sideBarItems.module.css'

type SideBarItemsProps = {
  icon: ReactNode
  label: string
  path: string
  disabled: boolean
  collapsed: boolean
}

function SideBarItems({ icon, label, path, disabled, collapsed }: SideBarItemsProps) {
  const content = (
    <>
      <span className={style.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={style.label} aria-hidden={collapsed}>
        {label}
      </span>
    </>
  )

  if (disabled) {
    return (
      <button
        type="button"
        className={`${style.item} ${collapsed ? style.collapsed : ''} ${style.disabled}`}
        disabled
        aria-label={`${label} (próximamente)`}
      >
        {content}
      </button>
    )
  }

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        `${style.item} ${collapsed ? style.collapsed : ''} ${isActive ? style.active : ''}`
      }
      aria-label={label}
    >
      {content}
    </NavLink>
  )
}

export default SideBarItems