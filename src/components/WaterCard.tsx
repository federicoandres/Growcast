interface Props {
  ph: number
  ec: number
  temperatura: number
}

export function WaterCard({ ph, ec, temperatura }: Props) {
  return (
    <div>
      <h2>Agua de Riego</h2>
      <p>{ph}</p>
      <p>{ec}</p>
      <p>{temperatura}</p>
    </div>
  )
}