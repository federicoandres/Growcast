import { render, screen } from '@testing-library/react'
import { SustratoCard } from './SustratoCard'

const mockData = {
  nombre: 'Tropical Runtz - Tanda 2',
  etapa: 'floracion' as const,
  cantidadPlantas: 6,
  temperatura: 21,
  humedad: 45,
  ph: 6.1,
  ec: 1.6,
  runoffPh: 6.3,
  runoffEc: 1.9,
}

describe('SustratoCard', () => {
  it('muestra el nombre del grupo y cantidad de plantas', () => {
    render(<SustratoCard {...mockData} />)
    expect(screen.getByText('Tropical Runtz - Tanda 2')).toBeInTheDocument()
    expect(screen.getByText('6 plantas')).toBeInTheDocument()
  })

  it('muestra temperatura y humedad de sustrato', () => {
    render(<SustratoCard {...mockData} />)
    expect(screen.getByText(/21/)).toBeInTheDocument()
    expect(screen.getByText(/45/)).toBeInTheDocument()
  })

  it('muestra pH y EC de sustrato', () => {
    render(<SustratoCard {...mockData} />)
    expect(screen.getByText('6.1')).toBeInTheDocument()
    expect(screen.getByText('1.6')).toBeInTheDocument()
  })

  it('muestra pH y EC de runoff', () => {
    render(<SustratoCard {...mockData} />)
    expect(screen.getByText('6.3')).toBeInTheDocument()
    expect(screen.getByText('1.9')).toBeInTheDocument()
  })

  it('calcula y muestra el delta de EC entre sustrato y runoff', () => {
    render(<SustratoCard {...mockData} />)
    expect(screen.getByText(/Delta EC/i)).toBeInTheDocument()
  })

  it('muestra alerta cuando el delta de EC es muy alto', () => {
    render(<SustratoCard {...mockData} ec={1.0} runoffEc={2.5} />)
    expect(screen.getByText(/alerta/i)).toBeInTheDocument()
  })
})