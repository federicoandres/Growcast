interface Cultivo {
  id: string
  nombre: string
  etapa: string
}

interface Props {
  cultivos: Cultivo[]
  onSelectCultivo: (id: string) => void
  onNuevoCultivo: () => void
}

export function Dashboard({ cultivos, onSelectCultivo, onNuevoCultivo }: Props) {
  const ahora = new Date()
  const fecha = ahora.toLocaleDateString('es-AR')
  const hora = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className='min-h-screen bg-gray-950 text-white relative'>
      <header className='bg-gray-900 border-b border-green-900 px-6 py-4 flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-green-400'>CultivOS</h1>
          <p className='text-gray-400 text-sm'>Cannabis Co-Pilot</p>
        </div>
        <div data-testid='fecha-hora' className='text-right text-gray-400 text-sm'>
          <p>{fecha}</p>
          <p className='text-lg font-bold text-white'>{hora}</p>
        </div>
      </header>

      <main className='p-6'>
        <h2 className='text-gray-400 text-sm mb-4'>Tus cultivos</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {cultivos.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCultivo(c.id)}
              className='bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left hover:border-green-600 transition-colors'
            >
              <h3 className='text-lg font-bold text-green-400'>{c.nombre}</h3>
              <p className='text-gray-500 text-xs mt-1'>{c.etapa}</p>
            </button>
          ))}
        </div>
      </main>

      <button
        data-testid='boton-nuevo-cultivo'
        onClick={onNuevoCultivo}
        className='fixed bottom-6 right-6 bg-green-600 hover:bg-green-500 text-white rounded-full w-14 h-14 text-3xl font-bold shadow-lg flex items-center justify-center'
      >
        +
      </button>
    </div>
  )
}