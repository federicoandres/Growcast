import { render, screen } from '@testing-library/react'
import { GeneticaCard } from './GeneticaCard'

const mockIntervenciones = [
  { tipo: 'trasplante', fecha: '2026-06-01', detalle: 'Maceta 11L' },
  { tipo: 'poda', fecha: '2026-06-10', detalle: 'Apical' },
  { tipo: 'producto', fecha: '2026-06-12', detalle: 'Trichoderma 5ml/L' },
] as const

const mockData = {
  descripcion: 'Tropical Runtz - Carlson Pheno A',
  cantidadPlantas: 6,
  fechaInicio: '2026-05-01',
  intervenciones: mockIntervenciones,
}

describe('GeneticaCard', () => {
  it('muestra la descripcion de la genetica', () => {
    render(<GeneticaCard {...mockData} />)
    expect(screen.getByText('Tropical Runtz - Carlson Pheno A')).toBeInTheDocument()
  })

  it('muestra la cantidad de plantas', () => {
    render(<GeneticaCard {...mockData} />)
    expect(screen.getByText('6 plantas')).toBeInTheDocument()
  })

  it('calcula y muestra semana y dia desde el inicio', () => {
    render(<GeneticaCard {...mockData} />)
    expect(screen.getByTestId('semana-dia')).toBeInTheDocument()
  })

  it('muestra la ultima intervencion de cada tipo', () => {
    render(<GeneticaCard {...mockData} />)
    expect(screen.getByText('Maceta 11L')).toBeInTheDocument()
    expect(screen.getByText('Apical')).toBeInTheDocument()
    expect(screen.getByText('Trichoderma 5ml/L')).toBeInTheDocument()
  })

  it('muestra boton para agregar nueva intervencion', () => {
    render(<GeneticaCard {...mockData} />)
    expect(screen.getByTestId('boton-nueva-intervencion')).toBeInTheDocument()
  })
})