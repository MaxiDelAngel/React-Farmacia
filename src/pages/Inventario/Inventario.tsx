import style from './Inventario.module.css'
import { Table, type InventoryItem } from '../../components'

const mockData: InventoryItem[] = [
  {
    id: '1',
    nombre: 'Paracetamol 500mg',
    descripcion: 'Analgésico y antipirético para dolor leve a moderado.',
    precio: 45.5,
    stock: 120,
    tipo: 'analgesico',
  },
  {
    id: '2',
    nombre: 'Omeprazol 20mg',
    descripcion: null,
    precio: 82,
    stock: 70,
    tipo: 'gastro',
  },
  {
    id: '3',
    nombre: 'Loratadina 10mg',
    descripcion: 'Antihistamínico para aliviar síntomas de alergia.',
    precio: 63.9,
    stock: 95,
    tipo: 'antialergico',
  },
]

function Inventario() {
  const handleEdit = (item: InventoryItem) => {
    console.log('Editar:', item)
  }

  const handleDelete = (item: InventoryItem) => {
    console.log('Borrar:', item)
  }

  return (
    <section className={style.container}>
      <header className={style.header}>
        <h1 className={style.title}>Inventario de medicamentos</h1>
        <p className={style.subtitle}>Control de productos y existencias en tiempo real.</p>
      </header>

      <Table items={mockData} onEdit={handleEdit} onDelete={handleDelete} />
    </section>
  )
}

export default Inventario
