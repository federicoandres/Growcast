interface Props {
  nombre: string
  etapa: 'clones' | 'vegetativo' | 'floracion' | 'floracion_tardia'
  cantidadPlantas: number
  temperatura: number
  humedad: number
  ph: number
  ec: number
  runoffPh: number
  runoffEc: number
}

export function SustratoCard(props: Props) {
  const nombre = props.nombre
  const etapa = props.etapa
  const cantidadPlantas = props.cantidadPlantas
  const temperatura = props.temperatura
  const humedad = props.humedad
  const ph = props.ph
  const ec = props.ec
  const runoffPh = props.runoffPh
  const runoffEc = props.runoffEc
  const deltaEc = Math.round((runoffEc - ec) * 100) / 100
  const alertaDelta = Math.abs(deltaEc) > 1
  const grado = String.fromCharCode(176)

  return (
    <div className='bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6'>
      <div className='flex justify-between items-center mb-4 border-b border-gray-800 pb-3'>
        <div>
          <h2 className='text-lg font-bold text-green-400'>{nombre}</h2>
          <p className='text-gray-500 text-xs'>{cantidadPlantas} plantas</p>
        </div>
        <span className='text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400'>{etapa}</span>
      </div>

      {alertaDelta ? (
        <div className='mb-4 bg-red-900 border border-red-700 rounded-lg px-4 py-2 text-red-300 text-sm'>
          alerta Delta EC alto entre sustrato y runoff
        </div>
      ) : null}

      <p className='text-gray-400 text-xs mb-2 mt-2'>Sustrato</p>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4 mb-4'>
        <div className='bg-gray-800 rounded-xl p-4'>
          <p className='text-gray-400 text-xs mb-1'>Temperatura</p>
          <p className='text-2xl font-bold text-orange-400'>{temperatura}{grado}C</p>
        </div>
        <div className='bg-gray-800 rounded-xl p-4'>
          <p className='text-gray-400 text-xs mb-1'>Humedad</p>
          <p className='text-2xl font-bold text-blue-400'>{humedad}%</p>
        </div>
        <div className='bg-gray-800 rounded-xl p-4'>
          <p className='text-gray-400 text-xs mb-1'>pH</p>
          <p className='text-2xl font-bold text-green-400'>{ph}</p>
        </div>
        <div className='bg-gray-800 rounded-xl p-4'>
          <p className='text-gray-400 text-xs mb-1'>EC</p>
          <p className='text-2xl font-bold text-blue-300'>{ec}</p>
        </div>
      </div>

      <p className='text-gray-400 text-xs mb-2'>Runoff</p>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <div className='bg-gray-800 rounded-xl p-4'>
          <p className='text-gray-400 text-xs mb-1'>pH</p>
          <p className='text-2xl font-bold text-green-300'>{runoffPh}</p>
        </div>
        <div className='bg-gray-800 rounded-xl p-4'>
          <p className='text-gray-400 text-xs mb-1'>EC</p>
          <p className='text-2xl font-bold text-blue-300'>{runoffEc}</p>
        </div>
        <div className='bg-gray-800 rounded-xl p-4'>
          <p className='text-gray-400 text-xs mb-1'>Delta EC</p>
          <p className='text-2xl font-bold'>{deltaEc}</p>
        </div>
      </div>
    </div>
  )
}