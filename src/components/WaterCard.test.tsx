import { render, screen } from '@testing-library/react'
import { WaterCard } from './WaterCard'

const mockData = {
  ph: 6.5,
  ec: 1.8,
  ppm: 900,
  temperatura: 22,
  orp: 350,
}

describe('WaterCard', () => {
  it('muestra el pH con su etiqueta y unidad', () => {
    render(<WaterCard {...mockData} />)
    expect(screen.getByText('6.5')).toBeInTheDocument()
    expect(screen.getByText('pH')).toBeInTheDocument()
  })

  it('muestra EC y PPM', () => {
    render(<WaterCard {...mockData} />)
    expect(screen.getByText('1.8')).toBeInTheDocument()
    expect(screen.getByText('900')).toBeInTheDocument()
    expect(screen.getByText(/mS\/cm/)).toBeInTheDocument()
    expect(screen.getByText('ppm')).toBeInTheDocument()
  })

  it('muestra ORP con su unidad', () => {
    render(<WaterCard {...mockData} />)
    expect(screen.getByText('350')).toBeInTheDocument()
    expect(screen.getByText(/mV/)).toBeInTheDocument()
  })

  it('muestra la temperatura en °C', () => {
    render(<WaterCard {...mockData} />)
    expect(screen.getByText('22°C')).toBeInTheDocument()
  })
})