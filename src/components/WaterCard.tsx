interface Props {
  nombre: string
  fecha: string
  ph: number
  ec: number
  ppm: number
  temperatura: number
  orp: number
}

export function WaterCard({ nombre, fecha, ph, ec, ppm, temperatura, orp }: Props) {
  return (
    <div className="bg-gray-900 border border-green-900 rounded-2xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
        <h2 className="text-lg font-bold text-green-400">{nombre}</h2>
        <span className="text-gray-500 text-xs">Armado: {fecha}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">pH</p>
          <p className="text-3xl font-bold text-green-400">{ph}</p>
          <p className="text-gray-500 text-xs mt-1">Óptimo: 5.8 – 6.5</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">EC</p>
          <p className="text-3xl font-bold text-blue-400">{ec}</p>
          <p className="text-gray-500 text-xs mt-1">mS/cm</p>
          <p className="text-blue-300 text-sm font-semibold mt-1">{ppm} <span className="text-gray-500 text-xs font-normal">ppm</span></p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">ORP</p>
          <p className="text-3xl font-bold text-purple-400">{orp}</p>
          <p className="text-gray-500 text-xs mt-1">mV · Potencial redox</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Temperatura</p>
          <p className="text-3xl font-bold text-orange-400">{temperatura}°C</p>
          <p className="text-gray-500 text-xs mt-1">Óptimo: 18 – 24°C</p>
        </div>

      </div>
    </div>
  )
}