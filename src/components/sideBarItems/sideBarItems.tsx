import type { ReactNode } from 'react'
import style from './sideBarItems.module.css'

type SideBarItemsProps = {
  icon: ReactNode
  label: string
  collapsed: boolean
}

function SideBarItems({ icon, label, collapsed }: SideBarItemsProps) {
  return (
    <button type="button" className={`${style.item} ${collapsed ? style.collapsed : ''}`}>
      <span className={style.icon} aria-hidden="true">
        {icon}
      </span>

      <span className={style.label} aria-hidden={collapsed}>
        {label}
      </span>
    </button>
  )
}

export default SideBarItems