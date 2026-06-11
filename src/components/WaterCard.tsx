interface Props {
  ph: number
  ec: number
  ppm: number
  temperatura: number
  orp: number
}

export function WaterCard({ ph, ec, ppm, temperatura, orp }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-gray-400 text-sm mb-1">pH</p>
        <p className="text-4xl font-bold text-green-400">{ph}</p>
        <p className="text-gray-500 text-xs mt-2">Potencial de hidrógeno · Óptimo: 5.8 – 6.5</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-gray-400 text-sm mb-1">EC</p>
        <p className="text-4xl font-bold text-blue-400">{ec}</p>
        <p className="text-gray-500 text-xs mt-1">mS/cm · Conductividad eléctrica</p>
        <p className="text-blue-300 text-sm mt-2">{ppm} <span className="text-gray-500 text-xs">ppm</span></p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
  <p className="text-gray-400 text-sm mb-1">ORP</p>
  <p className="text-4xl font-bold text-purple-400">{orp}</p>
  <p className="text-gray-500 text-xs mt-2">mV · Potencial redox</p>
</div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-gray-400 text-sm mb-1">Temperatura</p>
        <p className="text-4xl font-bold text-orange-400">{temperatura}°C</p>
        <p className="text-gray-500 text-xs mt-2">Óptimo: 18 – 24°C</p>
      </div>

    </div>
  )
}