import style from './table.module.css'

export type InventoryItem = {
  id: string
  nombre: string
  descripcion: string | null
  precio: number
  stock: number
  tipo: string
}

type TableProps = {
  items: InventoryItem[]
  onEdit?: (item: InventoryItem) => void
  onDelete?: (item: InventoryItem) => void
}

function Table({ items, onEdit, onDelete }: TableProps) {
  return (
    <section className={style.wrapper} aria-label="Tabla de inventario">
      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td data-label="Nombre" className={style.nameCell} title={item.nombre}>
                  {item.nombre}
                </td>
                <td data-label="Descripcion" className={style.description} title={item.descripcion ?? 'Sin descripcion'}>
                  {item.descripcion ?? 'Sin descripcion'}
                </td>
                <td data-label="Precio" className={style.numericCell}>${item.precio.toFixed(2)}</td>
                <td data-label="Stock" className={style.numericCell}>{item.stock}</td>
                <td data-label="Tipo">
                  <span className={style.tipoBadge}>{item.tipo}</span>
                </td>
                <td data-label="Acciones">
                  <div className={style.actions}>
                    <button
                      type="button"
                      className={`${style.actionButton} ${style.editButton}`}
                      onClick={() => onEdit?.(item)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className={`${style.actionButton} ${style.deleteButton}`}
                      onClick={() => onDelete?.(item)}
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Table