import { render, screen } from '@testing-library/react'
import { Dashboard } from './Dashboard'

const mockCultivos = [
  { id: '1', nombre: 'Sala Flor', etapa: 'floracion' },
  { id: '2', nombre: 'Sala Vege', etapa: 'vegetativo' },
]

describe('Dashboard', () => {
  it('muestra la fecha y hora actual', () => {
    render(<Dashboard cultivos={mockCultivos} onSelectCultivo={() => {}} onNuevoCultivo={() => {}} />)
    expect(screen.getByTestId('fecha-hora')).toBeInTheDocument()
  })

  it('muestra la lista de cultivos', () => {
    render(<Dashboard cultivos={mockCultivos} onSelectCultivo={() => {}} onNuevoCultivo={() => {}} />)
    expect(screen.getByText('Sala Flor')).toBeInTheDocument()
    expect(screen.getByText('Sala Vege')).toBeInTheDocument()
  })

  it('muestra el boton flotante de nuevo cultivo', () => {
    render(<Dashboard cultivos={mockCultivos} onSelectCultivo={() => {}} onNuevoCultivo={() => {}} />)
    expect(screen.getByTestId('boton-nuevo-cultivo')).toBeInTheDocument()
  })

  it('llama a onNuevoCultivo al hacer click en el boton +', () => {
    let llamado = false
    render(<Dashboard cultivos={mockCultivos} onSelectCultivo={() => {}} onNuevoCultivo={() => { llamado = true }} />)
    screen.getByTestId('boton-nuevo-cultivo').click()
    expect(llamado).toBe(true)
  })

  it('llama a onSelectCultivo al hacer click en un cultivo', () => {
    let seleccionado = null
    render(<Dashboard cultivos={mockCultivos} onSelectCultivo={(id) => { seleccionado = id }} onNuevoCultivo={() => {}} />)
    screen.getByText('Sala Flor').click()
    expect(seleccionado).toBe('1')
  })
})