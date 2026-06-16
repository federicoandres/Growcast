import { render, screen } from '@testing-library/react'
import { WaterCard } from './WaterCard'

const mockData = {
  nombre: 'Tanque Principal',
  fecha: '2026-06-16',
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
  describe('WaterCard con etiqueta de tanque', () => {
  it('muestra el nombre del tanque', () => {
    render(<WaterCard ph={6.5} ec={1.8} ppm={900} temperatura={22} orp={350} nombre="Sala Madre" fecha="2026-06-01" />)
    expect(screen.getByText('Sala Madre')).toBeInTheDocument()
  })

  it('muestra la fecha de armado', () => {
    render(<WaterCard ph={6.5} ec={1.8} ppm={900} temperatura={22} orp={350} nombre="Sala Madre" fecha="2026-06-01" />)
    expect(screen.getByText(/2026-06-01/)).toBeInTheDocument()
  })
})
})