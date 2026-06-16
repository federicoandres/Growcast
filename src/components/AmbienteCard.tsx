interface Props {
  nombre: string
  etapa: 'clones' | 'vegetativo' | 'floracion' | 'floracion_tardia'
  temperatura: number
  humedad: number
  co2?: number | null
}

function calcularVPD(temp: number, hr: number): number {
  const svp = 0.61078 * Math.exp((17.2694 * temp) / (temp + 238.3))
  const vpd = svp * (1 - hr / 100)
  return Math.round(vpd * 100) / 100
}

function rangoVPD(etapa: Props['etapa']): [number, number] {
  const rangos = {
    clones: [0.4, 0.8] as [number, number],
    vegetativo: [0.8, 1.2] as [number, number],
    floracion: [1.0, 1.5] as [number, number],
    floracion_tardia: [1.2, 1.6] as [number, number],
  }
  return rangos[etapa]
}

const etapaLabel: Record<Props['etapa'], string> = {
  clones: 'Clones',
  vegetativo: 'Vegetativo',
  floracion: 'Floracion',
  floracion_tardia: 'Floracion tardia',
}

export function AmbienteCard({ nombre, etapa, temperatura, humedad, co2 }: Props) {
  const vpd = calcularVPD(temperatura, humedad)
  const [min, max] = rangoVPD(etapa)
  const vpdOk = vpd >= min && vpd <= max
  return (
    <div className='bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6'>
      <div className='flex justify-between items-center mb-4 border-b border-gray-800 pb-3'>
        <h2 className='text-lg font-bold text-green-400'>{nombre}</h2>
        <span className='text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400'>{etapaLabel[etapa]}</span>
      </div>
      {!vpdOk && (
        <div className='mb-4 bg-red-900 border border-red-700 rounded-lg px-4 py-2 text-red-300 text-sm'>
          alerta VPD fuera de rango {min}-{max} kPa
        </div>
      )}
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <div className='bg-gray-800 rounded-xl p-4'>
          <p className='text-gray-400 text-xs mb-1'>Temperatura</p>
          <p className='text-3xl font-bold text-orange-400'>{temperatura} C</p>
        </div>
        <div className='bg-gray-800 rounded-xl p-4'>
          <p className='text-gray-400 text-xs mb-1'>Humedad</p>
          <p className='text-3xl font-bold text-blue-400'>{humedad} %</p>
        </div>
        <div className='bg-gray-800 rounded-xl p-4'>
          <p className='text-gray-400 text-xs mb-1'>VPD</p>
          <p className='text-3xl font-bold text-green-400'>{vpd} kPa</p>
          <p className='text-gray-500 text-xs mt-1'>Optimo: {min}-{max}</p>
        </div>
        {co2 != null && (
          <div className='bg-gray-800 rounded-xl p-4'>
            <p className='text-gray-400 text-xs mb-1'>CO2</p>
            <p className='text-3xl font-bold text-purple-400'>{co2} ppm</p>
          </div>
        )}
      </div>
    </div>
  )
}