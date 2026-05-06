import styles from './filterBar.module.css'

type FilterBarProps = {
  typeOptions: string[]
  selectedType: string
  onTypeChange: (value: string) => void
  sortValue: string
  onSortChange: (value: string) => void
}

function FilterBar({ typeOptions, selectedType, onTypeChange, sortValue, onSortChange }: FilterBarProps) {
  return (
    <section className={styles.wrapper} aria-label="Filtros de inventario">
      <label className={styles.field}>
        Filtrar por tipo
        <select value={selectedType} onChange={(event) => onTypeChange(event.target.value)}>
          <option value="all">Todos</option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        Ordenar por
        <select value={sortValue} onChange={(event) => onSortChange(event.target.value)}>
          <option value="name-asc">Nombre (A-Z)</option>
          <option value="price-asc">Precio (menor a mayor)</option>
          <option value="price-desc">Precio (mayor a menor)</option>
        </select>
      </label>
    </section>
  )
}

export default FilterBar