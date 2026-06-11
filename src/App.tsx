import { useState } from 'react'
import { WaterCard } from './components/WaterCard'

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
              tab === t
                ? 'bg-green-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="p-6">
        {tab === 'agua' && (
          <WaterCard ph={6.5} ec={1.8} temperatura={22} />
        )}
        {tab === 'ambiente' && <p className="text-gray-400">Próximamente...</p>}
        {tab === 'luz' && <p className="text-gray-400">Próximamente...</p>}
        {tab === 'runoff' && <p className="text-gray-400">Próximamente...</p>}
      </main>
    </div>
  )
}

export default App