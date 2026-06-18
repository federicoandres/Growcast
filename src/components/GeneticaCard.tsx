interface Intervencion {
  tipo: 'trasplante' | 'poda' | 'producto' | 'cosecha'
  fecha: string
  detalle: string
}

interface Props {
  descripcion: string
  cantidadPlantas: number
  fechaInicio: string
  intervenciones: readonly Intervencion[]
  onNuevaIntervencion?: () => void
}

const tipoLabel: Record<Intervencion['tipo'], string> = {
  trasplante: 'Trasplante',
  poda: 'Poda',
  producto: 'Producto aplicado',
  cosecha: 'Cosecha',
}

function calcularSemanaDia(fechaInicio: string) {
  const inicio = new Date(fechaInicio)
  const ahora = new Date()
  const diffMs = ahora.getTime() - inicio.getTime()
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const semana = Math.floor(diffDias / 7) + 1
  const dia = (diffDias % 7) + 1
  return { semana, dia }
}

function ultimaPorTipo(intervenciones: readonly Intervencion[], tipo: string) {
  const filtradas = intervenciones.filter((i) => i.tipo === tipo)
  if (filtradas.length === 0) return null
  return filtradas.reduce((a, b) => (new Date(a.fecha) > new Date(b.fecha) ? a : b))
}

export function GeneticaCard(props: Props) {
  const descripcion = props.descripcion
  const cantidadPlantas = props.cantidadPlantas
  const fechaInicio = props.fechaInicio
  const intervenciones = props.intervenciones
  const onNuevaIntervencion = props.onNuevaIntervencion
  const { semana, dia } = calcularSemanaDia(fechaInicio)
  const tipos: Intervencion['tipo'][] = ['trasplante', 'poda', 'producto', 'cosecha']

  return (
    <div className='bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6'>
      <div className='flex justify-between items-start mb-4 border-b border-gray-800 pb-3'>
        <div>
          <h2 className='text-lg font-bold text-green-400'>{descripcion}</h2>
          <p className='text-gray-500 text-xs mt-1'>{cantidadPlantas} plantas</p>
        </div>
        <span data-testid='semana-dia' className='text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300'>
          Semana {semana} - Dia {dia}
        </span>
      </div>

      <p className='text-gray-400 text-xs mb-2'>Ultimas intervenciones</p>
      <div className='grid grid-cols-2 gap-3 md:grid-cols-4 mb-4'>
        {tipos.map((tipo) => {
          const ultima = ultimaPorTipo(intervenciones, tipo)
          return (
            <div key={tipo} className='bg-gray-800 rounded-xl p-3'>
              <p className='text-gray-500 text-xs mb-1'>{tipoLabel[tipo]}</p>
              {ultima ? (
                <div>
                  <p className='text-sm text-white'>{ultima.detalle}</p>
                  <p className='text-gray-600 text-xs mt-1'>{ultima.fecha}</p>
                </div>
              ) : (
                <p className='text-gray-600 text-xs'>Sin registro</p>
              )}
            </div>
          )
        })}
      </div>

      <button
        data-testid='boton-nueva-intervencion'
        onClick={onNuevaIntervencion}
        className='text-sm px-4 py-1.5 rounded bg-green-700 hover:bg-green-600 text-white'
      >
        + Registrar intervencion
      </button>
    </div>
  )
}