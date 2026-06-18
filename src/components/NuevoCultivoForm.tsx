interface Genetica {
  id: string
  nombre: string
}

interface DatosCultivo {
  nombre: string
  etapa: string
  fechaInicio: string
  cantidadPlantas: number
  geneticaId: string
}

interface Props {
  geneticasDisponibles: readonly Genetica[]
  onGuardar: (datos: DatosCultivo) => void
  onCargarGenetica: () => void
}

import { useState } from 'react'

export function NuevoCultivoForm({ geneticasDisponibles, onGuardar, onCargarGenetica }: Props) {
  const [nombre, setNombre] = useState('')
  const [etapa, setEtapa] = useState('clones')
  const [fechaInicio, setFechaInicio] = useState('')
  const [cantidadPlantas, setCantidadPlantas] = useState('')
  const [geneticaId, setGeneticaId] = useState(geneticasDisponibles[0]?.id ?? '')

  function handleGuardar() {
    onGuardar({
      nombre,
      etapa,
      fechaInicio,
      cantidadPlantas: Number(cantidadPlantas),
      geneticaId,
    })
  }

  return (
    <div className='max-w-md mx-auto bg-gray-900 rounded-xl p-6 space-y-4'>
      <h2 className='text-xl font-bold text-green-400'>Nuevo cultivo</h2>

      <div>
        <label htmlFor='nombre' className='block text-sm text-gray-400 mb-1'>Nombre</label>
        <input
          id='nombre'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className='w-full bg-gray-800 rounded px-3 py-2 text-white'
        />
      </div>

      <div>
        <label htmlFor='etapa' className='block text-sm text-gray-400 mb-1'>Etapa</label>
        <select
          id='etapa'
          value={etapa}
          onChange={(e) => setEtapa(e.target.value)}
          className='w-full bg-gray-800 rounded px-3 py-2 text-white'
        >
          <option value='clones'>Clones</option>
          <option value='vegetativo'>Vegetativo</option>
          <option value='floracion'>Floracion</option>
          <option value='floracion_tardia'>Floracion tardia</option>
        </select>
      </div>

      <div>
        <label htmlFor='fecha-inicio' className='block text-sm text-gray-400 mb-1'>Fecha de inicio</label>
        <input
          id='fecha-inicio'
          type='date'
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className='w-full bg-gray-800 rounded px-3 py-2 text-white'
        />
      </div>

      <div>
        <label htmlFor='cantidad-plantas' className='block text-sm text-gray-400 mb-1'>Cantidad de plantas</label>
        <input
          id='cantidad-plantas'
          type='number'
          value={cantidadPlantas}
          onChange={(e) => setCantidadPlantas(e.target.value)}
          className='w-full bg-gray-800 rounded px-3 py-2 text-white'
        />
      </div>

      {geneticasDisponibles.length === 0 ? (
        <div className='bg-yellow-950 border border-yellow-700 rounded p-3 space-y-2'>
          <p className='text-yellow-400 text-sm'>Tenes que cargar una genetica primero</p>
          <button
            data-testid='boton-cargar-genetica'
            onClick={onCargarGenetica}
            className='bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded text-sm'
          >
            Cargar genetica
          </button>
        </div>
      ) : (
        <div>
          <label htmlFor='genetica' className='block text-sm text-gray-400 mb-1'>Genetica</label>
          <select
            id='genetica'
            value={geneticaId}
            onChange={(e) => setGeneticaId(e.target.value)}
            className='w-full bg-gray-800 rounded px-3 py-2 text-white'
          >
            {geneticasDisponibles.map((g) => (
              <option key={g.id} value={g.id}>{g.nombre}</option>
            ))}
          </select>
        </div>
      )}

      <button
        data-testid='boton-guardar-cultivo'
        onClick={handleGuardar}
        className='w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium'
      >
        Guardar
      </button>
    </div>
  )
}