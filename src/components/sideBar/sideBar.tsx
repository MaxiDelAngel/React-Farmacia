import { useState, useEffect } from 'react'
import SideBarItems from '../sideBarItems/sideBarItems'
import style from './sideBar.module.css'

const menuItems = [
  {
    id: 'dashboard',
    label: 'Resumen general',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13.5A1.5 1.5 0 0 1 5.5 12H9v7H5.5A1.5 1.5 0 0 1 4 17.5v-4ZM10.5 5h3A1.5 1.5 0 0 1 15 6.5v12A1.5 1.5 0 0 1 13.5 20h-3A1.5 1.5 0 0 1 9 18.5v-12A1.5 1.5 0 0 1 10.5 5Zm6.5 4a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H16v-10h1Z" />
      </svg>
    ),
  },
  {
    id: 'inventory',
    label: 'Inventario',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4.75A1.75 1.75 0 0 1 6.75 3h10.5A1.75 1.75 0 0 1 19 4.75v14.5A1.75 1.75 0 0 1 17.25 21H6.75A1.75 1.75 0 0 1 5 19.25V4.75Zm3 2.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5H8Zm0 4a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5H8Zm0 4a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5H8Z" />
      </svg>
    ),
  },
  {
    id: 'prescriptions',
    label: 'Recetas',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 3A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 16.5 3h-9Zm1.25 4.25a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h5.75a.75.75 0 0 1 0 1.5H9.5a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h3.25a.75.75 0 0 1 0 1.5H9.5a.75.75 0 0 1-.75-.75Z" />
      </svg>
    ),
  },
  {
    id: 'customers',
    label: 'Clientes',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-6.75 7.25a6.75 6.75 0 1 1 13.5 0 .75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75Z" />
      </svg>
    ),
  },
]

function SideBar() {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const handler = (e: MediaQueryListEvent) => setCollapsed(e.matches)
    setCollapsed(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <aside className={`${style.sidebar} ${collapsed ? style.collapsed : ''}`}>
      <div className={style.brandSection}>
        <div className={style.brandCopy} aria-hidden={collapsed}>
          <span className={style.brandEyebrow}>Farmacia</span>
          <h1>Panel central</h1>
        </div>

        <button
          type="button"
          className={style.collapseButton}
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          aria-pressed={collapsed}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={collapsed ? 'M9.47 6.47a.75.75 0 0 1 1.06 0L15.56 11.5a.75.75 0 0 1 0 1.06l-5.03 5.03a.75.75 0 1 1-1.06-1.06L13.97 12 9.47 7.53a.75.75 0 0 1 0-1.06Z' : 'M14.53 6.47a.75.75 0 0 1 0 1.06L10.03 12l4.5 4.47a.75.75 0 1 1-1.06 1.06l-5.03-5.03a.75.75 0 0 1 0-1.06l5.03-5.03a.75.75 0 0 1 1.06 0Z'} />
          </svg>
        </button>
      </div>

      <nav className={style.navigation} aria-label="Navegacion principal">
        {menuItems.map((item) => (
          <SideBarItems
            key={item.id}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <footer className={style.footer}>
        <span>Power By Max Del Angel</span>
      </footer>
    </aside>
  )
}

export default SideBar