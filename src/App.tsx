import { useState } from 'react'
import { WaterCard } from './components/WaterCard'
import { AmbienteCard } from './components/AmbienteCard'
import { SustratoCard } from './components/SustratoCard'
import { GeneticaCard } from './components/GeneticaCard'
import { Dashboard } from './components/Dashboard'
import { NuevoCultivoForm } from './components/NuevoCultivoForm'

const misGeneticas = [
  { id: 'g1', nombre: 'Tropical Runtz' },
  { id: 'g2', nombre: 'Carlson Phenotype A' },
]

const cultivosBaseInicial = [
  { id: 'flor1', nombre: 'Sala Flor', etapa: 'floracion' },
  { id: 'madre1', nombre: 'Sala Madre', etapa: 'vegetativo' },
  { id: 'clones1', nombre: 'Sala Clones', etapa: 'clones' },
]

const datosAguaInicial: Record<string, any> = {
  flor1: { nombre: 'Sala Flor', fecha: '2026-05-15', ph: 6.5, ec: 1.8, ppm: 900, temperatura: 23, orp: 350 },
  madre1: { nombre: 'Sala Madre', fecha: '2026-06-01', ph: 6.2, ec: 1.4, ppm: 700, temperatura: 22, orp: 380 },
  clones1: { nombre: 'Sala Clones', fecha: '2026-06-08', ph: 5.9, ec: 0.8, ppm: 400, temperatura: 21, orp: 420 },
}

const datosAmbienteInicial: Record<string, any> = {
  flor1: { nombre: 'Sala Flor', etapa: 'floracion', temperatura: 26, humedad: 88, co2: 1200 },
  madre1: { nombre: 'Sala Madre', etapa: 'vegetativo', temperatura: 24, humedad: 60, co2: null },
  clones1: { nombre: 'Sala Clones', etapa: 'clones', temperatura: 23, humedad: 70, co2: null },
}

const datosSustratoInicial: Record<string, any[]> = {
  flor1: [{ nombre: 'Tropical Runtz - Tanda 2', etapa: 'floracion', cantidadPlantas: 6, temperatura: 21, humedad: 45, ph: 6.1, ec: 1.6, runoffPh: 6.3, runoffEc: 1.9 }],
  madre1: [{ nombre: 'Carlson Phenotype A', etapa: 'vegetativo', cantidadPlantas: 4, temperatura: 23, humedad: 55, ph: 5.9, ec: 1.2, runoffPh: 6.0, runoffEc: 1.3 }],
  clones1: [{ nombre: 'Clones varios', etapa: 'clones', cantidadPlantas: 12, temperatura: 23, humedad: 70, ph: 5.8, ec: 0.7, runoffPh: 5.9, runoffEc: 0.8 }],
}

const datosGeneticaInicial: Record<string, any[]> = {
  flor1: [{
    descripcion: 'Tropical Runtz - Tanda 2',
    cantidadPlantas: 6,
    fechaInicio: '2026-05-01',
    intervenciones: [
      { tipo: 'trasplante', fecha: '2026-05-10', detalle: 'Maceta 11L' },
      { tipo: 'poda', fecha: '2026-06-01', detalle: 'Defoliacion' },
      { tipo: 'producto', fecha: '2026-06-12', detalle: 'PK boost 2ml/L' },
    ],
  }],
  madre1: [{
    descripcion: 'Carlson Phenotype A',
    cantidadPlantas: 4,
    fechaInicio: '2026-04-01',
    intervenciones: [
      { tipo: 'trasplante', fecha: '2026-04-15', detalle: 'Maceta 7L' },
      { tipo: 'poda', fecha: '2026-05-20', detalle: 'Apical' },
    ],
  }],
  clones1: [{
    descripcion: 'Clones varios',
    cantidadPlantas: 12,
    fechaInicio: '2026-06-05',
    intervenciones: [
      { tipo: 'trasplante', fecha: '2026-06-05', detalle: 'Vasos 200ml' },
    ],
  }],
}

const navTabs = [
  { id: 'ambiente', label: 'Ambiente' },
  { id: 'agua', label: 'Solucion de riego' },
  { id: 'plantas', label: 'Cultivares' },
]

function App() {
  const [vista, setVista] = useState<'dashboard' | 'cultivo' | 'nuevo-cultivo'>('dashboard')
  const [cultivoId, setCultivoId] = useState<string | null>(null)
  const [tab, setTab] = useState('ambiente')

  const [cultivosBase, setCultivosBase] = useState(cultivosBaseInicial)
  const [datosAgua, setDatosAgua] = useState(datosAguaInicial)
  const [datosAmbiente, setDatosAmbiente] = useState(datosAmbienteInicial)
  const [datosSustrato, setDatosSustrato] = useState(datosSustratoInicial)
  const [datosGenetica, setDatosGenetica] = useState(datosGeneticaInicial)

  function abrirCultivo(id: string) {
    setCultivoId(id)
    setTab('ambiente')
    setVista('cultivo')
  }

  function volverADashboard() {
    setVista('dashboard')
    setCultivoId(null)
  }

  function guardarNuevoCultivo(datos: { nombre: string; etapa: string; fechaInicio: string; cantidadPlantas: number; geneticaId: string }) {
    const id = 'cultivo-' + Date.now()
    const genetica = misGeneticas.find((g) => g.id === datos.geneticaId)

    setCultivosBase((prev) => [...prev, { id, nombre: datos.nombre, etapa: datos.etapa }])
    setDatosAmbiente((prev) => ({ ...prev, [id]: { nombre: datos.nombre, etapa: datos.etapa, temperatura: 24, humedad: 60, co2: null } }))
    setDatosAgua((prev) => ({ ...prev, [id]: { nombre: datos.nombre, fecha: datos.fechaInicio, ph: 6.0, ec: 1.0, ppm: 500, temperatura: 22, orp: 400 } }))
    setDatosSustrato((prev) => ({ ...prev, [id]: [{ nombre: genetica ? genetica.nombre : datos.nombre, etapa: datos.etapa, cantidadPlantas: datos.cantidadPlantas, temperatura: 22, humedad: 60, ph: 6.0, ec: 1.0, runoffPh: 6.0, runoffEc: 1.0 }] }))
    setDatosGenetica((prev) => ({ ...prev, [id]: [{ descripcion: genetica ? genetica.nombre : datos.nombre, cantidadPlantas: datos.cantidadPlantas, fechaInicio: datos.fechaInicio, intervenciones: [] }] }))

    abrirCultivo(id)
  }

  if (vista === 'nuevo-cultivo') {
    return (
      <div className='min-h-screen bg-gray-950 text-white py-10'>
        <NuevoCultivoForm
          geneticasDisponibles={misGeneticas}
          onGuardar={guardarNuevoCultivo}
          onCargarGenetica={() => alert('Cargar genetica: proximamente')}
        />
      </div>
    )
  }

  if (vista === 'dashboard') {
    return (
      <Dashboard
        cultivos={cultivosBase}
        onSelectCultivo={abrirCultivo}
        onNuevoCultivo={() => setVista('nuevo-cultivo')}
      />
    )
  }

  const cultivo = cultivosBase.find((c) => c.id === cultivoId)

  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <header className='bg-gray-900 border-b border-green-900 px-6 py-4 flex items-center gap-4'>
        <button onClick={volverADashboard} className='text-gray-400 hover:text-white text-sm'>
          back
        </button>
        <div>
          <h1 className='text-2xl font-bold text-green-400'>{cultivo ? cultivo.nombre : ''}</h1>
          <p className='text-gray-400 text-sm'>CultivOS - Cannabis Co-Pilot</p>
        </div>
      </header>

      <nav className='flex gap-2 px-6 py-3 bg-gray-900 border-b border-gray-800'>
        {navTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={'px-4 py-1.5 rounded text-sm font-medium ' + (tab === t.id ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white')}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className='p-6'>
        {tab === 'ambiente' && cultivoId && <AmbienteCard {...datosAmbiente[cultivoId]} />}
        {tab === 'agua' && cultivoId && <WaterCard {...datosAgua[cultivoId]} />}
        {tab === 'plantas' && cultivoId && datosGenetica[cultivoId].map((g: any, i: number) => (
          <div key={i}>
            <GeneticaCard {...g} onNuevaIntervencion={() => alert('Registrar intervencion: proximamente')} />
            <SustratoCard {...datosSustrato[cultivoId][i]} />
          </div>
        ))}
      </main>
    </div>
  )
}

export default App