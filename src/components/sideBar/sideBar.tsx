import { useState, useEffect } from 'react'
import SideBarItems from '../sideBarItems/sideBarItems'
import style from './sideBar.module.css'

type MenuItem = {
  id: string
  label: string
  path: string
  disabled: boolean
  icon: React.ReactNode
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Resumen general',
    path: '/',
    disabled: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13.5A1.5 1.5 0 0 1 5.5 12H9v7H5.5A1.5 1.5 0 0 1 4 17.5v-4ZM10.5 5h3A1.5 1.5 0 0 1 15 6.5v12A1.5 1.5 0 0 1 13.5 20h-3A1.5 1.5 0 0 1 9 18.5v-12A1.5 1.5 0 0 1 10.5 5Zm6.5 4a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H16v-10h1Z" />
      </svg>
    ),
  },
  {
    id: 'inventory',
    label: 'Inventario',
    path: '/inventory',
    disabled: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7.25 12 3l9 4.25v9.5L12 21l-9-4.25v-9.5Zm9 .44-7-3.3v2.48l7 3.3 7-3.3V4.39l-7 3.3Zm-7 1.87v6.19l6.25 2.95v-6.2L5 9.56Zm7.75 9.14L19 15.75V9.56l-6.25 2.94v6.2Z" />
      </svg>
    ),
  },
  {
    id: 'prescriptions',
    label: 'Recetas',
    path: '/prescriptions',
    disabled: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.75 3A1.75 1.75 0 0 0 5 4.75v14.5C5 20.22 5.78 21 6.75 21h10.5c.97 0 1.75-.78 1.75-1.75V7.5L14.5 3H6.75Zm7 1.56L17.44 8h-3.69V4.56ZM8 11.25c0-.41.34-.75.75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Zm0 3.5c0-.41.34-.75.75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Zm0 3.5c0-.41.34-.75.75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z" />
      </svg>
    ),
  },
  {
    id: 'customers',
    label: 'Clientes',
    path: '/customers',
    disabled: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-6.75 7.25a6.75 6.75 0 1 1 13.5 0 .75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75Z" />
      </svg>
    ),
  },
]

function SideBar() {
  const [collapsed, setCollapsed] = useState(false)

  // Agregue esto para que se colapse automaticamente en pantallas pequeñas
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
            path={item.path}
            disabled={item.disabled}
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