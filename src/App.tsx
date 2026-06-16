import { useState } from 'react'
import { WaterCard } from './components/WaterCard'
import { AmbienteCard } from './components/AmbienteCard'
import { SustratoCard } from './components/SustratoCard'

const tanques = [
  { nombre: 'Sala Madre', fecha: '2026-06-01', ph: 6.2, ec: 1.4, ppm: 700, temperatura: 22, orp: 380 },
  { nombre: 'Sala Flor', fecha: '2026-05-15', ph: 6.5, ec: 1.8, ppm: 900, temperatura: 23, orp: 350 },
  { nombre: 'Sala Clones', fecha: '2026-06-08', ph: 5.9, ec: 0.8, ppm: 400, temperatura: 21, orp: 420 },
]

const salas = [
  { nombre: 'Sala Madre', etapa: 'vegetativo', temperatura: 24, humedad: 60, co2: null },
  { nombre: 'Sala Flor', etapa: 'floracion', temperatura: 26, humedad: 88, co2: 1200 },
  { nombre: 'Sala Clones', etapa: 'clones', temperatura: 23, humedad: 70, co2: null },
]

const grupos = [
  { nombre: 'Tropical Runtz - Tanda 2', etapa: 'floracion', cantidadPlantas: 6, temperatura: 21, humedad: 45, ph: 6.1, ec: 1.6, runoffPh: 6.3, runoffEc: 1.9 },
  { nombre: 'Carlson Phenotype A', etapa: 'vegetativo', cantidadPlantas: 4, temperatura: 23, humedad: 55, ph: 5.9, ec: 1.2, runoffPh: 6.0, runoffEc: 1.3 },
]

function App() {
  const [tab, setTab] = useState('agua')

  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <header className='bg-gray-900 border-b border-green-900 px-6 py-4'>
        <h1 className='text-2xl font-bold text-green-400'>CultivOS</h1>
        <p className='text-gray-400 text-sm'>Cannabis Co-Pilot</p>
      </header>

      <nav className='flex gap-2 px-6 py-3 bg-gray-900 border-b border-gray-800'>
        {['agua', 'ambiente', 'plantas', 'luz', 'runoff'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={'px-4 py-1.5 rounded text-sm font-medium capitalize ' + (tab === t ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white')}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className='p-6'>
        {tab === 'agua' && tanques.map((t) => <WaterCard key={t.nombre} {...t} />)}
        {tab === 'ambiente' && salas.map((s) => <AmbienteCard key={s.nombre} {...s} />)}
        {tab === 'plantas' && grupos.map((g) => <SustratoCard key={g.nombre} {...g} />)}
        {tab === 'luz' && <p className='text-gray-400'>Proximamente...</p>}
        {tab === 'runoff' && <p className='text-gray-400'>Proximamente...</p>}
      </main>
    </div>
  )
}

export default App