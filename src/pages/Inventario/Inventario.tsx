import { useMemo, useState, type FormEvent } from 'react'
import style from './Inventario.module.css'
import { Table, type InventoryItem, Button, Modal, FilterBar, InlineAlert } from '../../components'
import useData from '../../hooks/useData'

type SortValue = 'name-asc' | 'price-asc' | 'price-desc'

function Inventario() {
  const { datos, insertar, actualizar, eliminar } = useData()

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [tipo, setTipo] = useState('')
  const [sortValue, setSortValue] = useState<SortValue>('name-asc')
  const [selectedType, setSelectedType] = useState('all')
  const [formError, setFormError] = useState('')

  const items: InventoryItem[] = datos.map((medicamento) => ({
    id: String(medicamento.id),
    nombre: medicamento.nombre,
    descripcion: medicamento.descripcion ?? null,
    precio: medicamento.precio,
    stock: medicamento.stock,
    tipo: medicamento.tipo,
  }))

  const resetForm = () => {
    setNombre('')
    setDescripcion('')
    setPrecio('')
    setStock('')
    setTipo('')
    setFormError('')
  }

  const typeOptions = useMemo(
    () => [...new Set(items.map((item) => item.tipo.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [items],
  )

  const filteredItems = useMemo(() => {
    if (selectedType === 'all') return items
    return items.filter((item) => item.tipo === selectedType)
  }, [items, selectedType])

  const visibleItems = useMemo(() => {
    const list = [...filteredItems]

    if (sortValue === 'price-asc') {
      list.sort((a, b) => a.precio - b.precio)
      return list
    }

    if (sortValue === 'price-desc') {
      list.sort((a, b) => b.precio - a.precio)
      return list
    }

    list.sort((a, b) => a.nombre.localeCompare(b.nombre))
    return list
  }, [filteredItems, sortValue])

  const lowStockCount = visibleItems.filter((item) => item.stock < 5).length
  const criticalStockCount = visibleItems.filter((item) => item.stock <= 0).length

  const handleEdit = (item: InventoryItem) => {
    setEditingItemId(item.id)
    setNombre(item.nombre)
    setDescripcion(item.descripcion ?? '')
    setPrecio(String(item.precio))
    setStock(String(item.stock))
    setTipo(item.tipo)
    setIsFormModalOpen(true)
  }

  const handleDelete = (item: InventoryItem) => {
    setItemToDelete(item)
    setIsDeleteModalOpen(true)
  }

  const openCreateModal = () => {
    setEditingItemId(null)
    resetForm()
    setIsFormModalOpen(true)
  }

  const closeFormModal = () => {
    setIsFormModalOpen(false)
    setEditingItemId(null)
    setIsSaving(false)
    resetForm()
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setItemToDelete(null)
    setIsDeleting(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedPrecio = Number(precio)
    const parsedStock = Number(stock)

    if (!nombre.trim()) {
      setFormError('El nombre es obligatorio.')
      return
    }

    if (parsedPrecio <= 0 || Number.isNaN(parsedPrecio)) {
      setFormError('El precio debe ser mayor a 0.')
      return
    }

    if (parsedStock < 0 || Number.isNaN(parsedStock)) {
      setFormError('El stock debe ser mayor o igual a 0.')
      return
    }

    if (!tipo.trim()) {
      setFormError('El tipo es obligatorio.')
      return
    }

    setFormError('')
    setIsSaving(true)

    if (editingItemId) {
      await actualizar(
        Number(editingItemId),
        nombre.trim(),
        parsedPrecio,
        parsedStock,
        tipo.trim(),
        descripcion.trim() || undefined,
      )
    } else {
      await insertar(
        nombre.trim(),
        parsedPrecio,
        parsedStock,
        tipo.trim(),
        descripcion.trim() || undefined,
      )
    }

    closeFormModal()
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return
    setIsDeleting(true)
    await eliminar(Number(itemToDelete.id))
    closeDeleteModal()
  }

  const modalBody = (
    <form id="agregar-medicamento-form" className={style.form} onSubmit={handleSubmit}>
      {formError ? <InlineAlert variant="error" message={formError} /> : null}

      <label className={style.field}>
        Nombre
        <input value={nombre} onChange={(event) => setNombre(event.target.value)} placeholder='Loratadina' required />
      </label>

      <label className={style.field}>
        Descripcion
        <textarea
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          rows={3}
          placeholder="Opcional"
        />
      </label>

      <div className={style.row}>
        <label className={style.field}>
          Precio
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}
            placeholder='$0.00'
            required
          />
        </label>

        <label className={style.field}>
          Stock
          <input
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            placeholder='Cantidad disponible'
            required
          />
        </label>
      </div>

      <label className={style.field}>
        Tipo
        <input value={tipo} onChange={(event) => setTipo(event.target.value)} required placeholder='Analgesico'/>
      </label>
    </form>
  )

  const modalFooter = (
    <div className={style.modalActions}>
      <Button onClick={closeFormModal} disabled={isSaving}>Cancelar</Button>
      <Button type="submit" form="agregar-medicamento-form" disabled={isSaving}>
        {isSaving ? 'Guardando...' : editingItemId ? 'Guardar cambios' : 'Guardar medicamento'}
      </Button>
    </div>
  )

  const deleteBody = (
    <p className={style.confirmText}>
      Estas seguro que deseas borrar el medicamento
      <span className={style.confirmName}> {itemToDelete?.nombre}</span>?
    </p>
  )

  const deleteFooter = (
    <div className={style.modalActions}>
      <Button onClick={closeDeleteModal} disabled={isDeleting}>Cancelar</Button>
      <Button onClick={confirmDelete} disabled={isDeleting}>
        {isDeleting ? 'Borrando...' : 'Si, borrar'}
      </Button>
    </div>
  )

  return (
    <section className={style.container}>
      <header className={style.header}>
        <div className={style.headerText}>
          <h1 className={style.title}>Inventario de medicamentos</h1>
          <p className={style.subtitle}>Control de productos y existencias en tiempo real.</p>
        </div>
        <Button onClick={openCreateModal}>Agregar medicamento</Button>
      </header>

      <FilterBar
        typeOptions={typeOptions}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        sortValue={sortValue}
        onSortChange={(value) => setSortValue(value as SortValue)}
      />

      {lowStockCount > 0 ? (
        <InlineAlert
          variant={criticalStockCount > 0 ? 'error' : 'warning'}
          message={`Hay ${lowStockCount} medicamento(s) con stock menor a 5 unidades.`}
        />
      ) : null}

      <Table items={visibleItems} onEdit={handleEdit} onDelete={handleDelete} lowStockThreshold={5} />
      <Modal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        title={editingItemId ? 'Editar medicamentos' : 'Agregar medicamentos'}
        body={modalBody}
        footer={modalFooter}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirmar borrado"
        body={deleteBody}
        footer={deleteFooter}
      />
    </section>
  )
}

export default Inventario
