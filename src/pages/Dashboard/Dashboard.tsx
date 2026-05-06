import style from './Dashboard.module.css'
import { Card } from '../../components'
import useData from '../../hooks/useData'

function Dashboard() {
  const { datos } = useData()

  const totalMedicamentos = datos.length
  const totalPiezas = datos.reduce((total, item) => total + item.stock, 0)
  const valorTotalInventario = datos.reduce((total, item) => total + item.precio * item.stock, 0)

  //Aqui le doy formato chido xd bien chatgpteado esta madre.
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)

  return (
    <section className={style.container}>
      <header className={style.header}>
        <h1 className={style.title}>Resumen general</h1>
        <p className={style.subtitle}>Vista rapida del estado del inventario.</p>
      </header>

      <div className={style.grid}>
        <Card
          title="Valor total del inventario"
          value={formatCurrency(valorTotalInventario)}
          subtitle="Actualizado en tiempo real"
        />
        <Card title="Medicamentos registrados" value={String(totalMedicamentos)} subtitle="Productos activos" />
        <Card title="Piezas disponibles" value={String(totalPiezas)} subtitle="Stock total acumulado" />
      </div>
    </section>
  )
}

export default Dashboard
