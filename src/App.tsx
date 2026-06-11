import { useState } from 'react'
import { WaterCard } from './components/WaterCard'
import { AmbienteCard } from './components/AmbienteCard'

const tanques = [
  { nombre: 'Sala Madre', fecha: '2026-06-01', ph: 6.2, ec: 1.4, ppm: 700, temperatura: 22, orp: 380 },
  { nombre: 'Sala Flor', fecha: '2026-05-15', ph: 6.5, ec: 1.8, ppm: 900, temperatura: 23, orp: 350 },
  { nombre: 'Sala Clones', fecha: '2026-06-08', ph: 5.9, ec: 0.8, ppm: 400, temperatura: 21, orp: 420 },
]

const salas = [
  { nombre: 'Sala Madre', etapa: 'vegetativo' as const, temperatura: 24, humedad: 60, co2: null },
  { nombre: 'Sala Flor', etapa: 'floracion' as const, temperatura: 26, humedad: 88, co2: 1200 },
  { nombre: 'Sala Clones', etapa: 'clones' as const, temperatura: 23, humedad: 70, co2: null },
]

function App() {
  const [tab, setTab] = useState('agua')

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-green-900 px-6 py-4">
        <h1 className="text-2xl font-bold text-green-400">🌱 GrowCast</h1>
        <p className="text-gray-400 text-sm">Monitor de cultivo indoor</p>
      </header>

      <nav className="flex gap-2 px-6 py-3 bg-gray-900 border-b border-gray-800">
        {['agua', 'ambiente', 'luz', 'runoff'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded text-sm font-medium capitalize ${
              tab === t ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="p-6">
        {tab === 'agua' && tanques.map((t) => <WaterCard key={t.nombre} {...t} />)}
        {tab === 'ambiente' && salas.map((s) => <AmbienteCard key={s.nombre} {...s} />)}
        {tab === 'luz' && <p className="text-gray-400">Próximamente...</p>}
        {tab === 'runoff' && <p className="text-gray-400">Próximamente...</p>}
      </main>
    </div>
  )
}

export default App