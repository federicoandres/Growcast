import { render, screen } from '@testing-library/react'
import { AmbienteCard } from './AmbienteCard'

const mockData = {
  nombre: 'Sala Flor',
  etapa: 'floracion' as const,
  temperatura: 26,
  humedad: 55,
  co2: null,
}

describe('AmbienteCard', () => {
  it('muestra el nombre de la sala', () => {
    render(<AmbienteCard {...mockData} />)
    expect(screen.getByText('Sala Flor')).toBeInTheDocument()
  })

  it('muestra temperatura y humedad', () => {
    render(<AmbienteCard {...mockData} />)
    expect(screen.getByText(/26/)).toBeInTheDocument()
    expect(screen.getByText(/55/)).toBeInTheDocument()
  })

  it('calcula y muestra el VPD en kPa', () => {
    render(<AmbienteCard {...mockData} />)
    expect(screen.getByText(/VPD/)).toBeInTheDocument()
    expect(screen.getByText(/kPa/)).toBeInTheDocument()
  })

  it('no muestra CO2 cuando es null', () => {
    render(<AmbienteCard {...mockData} />)
    expect(screen.queryByText(/CO2/)).not.toBeInTheDocument()
  })

  it('muestra CO2 cuando tiene valor', () => {
    render(<AmbienteCard {...mockData} co2={1200} />)
    expect(screen.getByText(/CO2/)).toBeInTheDocument()
    expect(screen.getByText(/1200/)).toBeInTheDocument()
  })

  it('muestra alerta cuando VPD está fuera de rango', () => {
    render(<AmbienteCard {...mockData} humedad={90} />)
    expect(screen.getByText(/alerta/i)).toBeInTheDocument()
  })
})