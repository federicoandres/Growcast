import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { NuevoCultivoForm } from './NuevoCultivoForm'

const mockGeneticas = [
  { id: 'g1', nombre: 'Tropical Runtz' },
  { id: 'g2', nombre: 'Carlson Phenotype A' },
] as const

describe('NuevoCultivoForm', () => {
  it('muestra los campos basicos del formulario', () => {
    render(
      <NuevoCultivoForm
        geneticasDisponibles={mockGeneticas}
        onGuardar={vi.fn()}
        onCargarGenetica={vi.fn()}
      />
    )
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/etapa/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/fecha de inicio/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cantidad de plantas/i)).toBeInTheDocument()
  })

  it('muestra el selector de genetica con las opciones disponibles', () => {
    render(
      <NuevoCultivoForm
        geneticasDisponibles={mockGeneticas}
        onGuardar={vi.fn()}
        onCargarGenetica={vi.fn()}
      />
    )
    expect(screen.getByLabelText(/genetica/i)).toBeInTheDocument()
    expect(screen.getByText('Tropical Runtz')).toBeInTheDocument()
    expect(screen.getByText('Carlson Phenotype A')).toBeInTheDocument()
  })

  it('muestra aviso para cargar genetica si la lista esta vacia', () => {
    render(
      <NuevoCultivoForm
        geneticasDisponibles={[]}
        onGuardar={vi.fn()}
        onCargarGenetica={vi.fn()}
      />
    )
    expect(screen.getByText(/tenes que cargar una genetica primero/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/genetica/i)).not.toBeInTheDocument()
  })

  it('llama a onCargarGenetica al tocar el boton cuando no hay geneticas', () => {
    const onCargarGenetica = vi.fn()
    render(
      <NuevoCultivoForm
        geneticasDisponibles={[]}
        onGuardar={vi.fn()}
        onCargarGenetica={onCargarGenetica}
      />
    )
    fireEvent.click(screen.getByTestId('boton-cargar-genetica'))
    expect(onCargarGenetica).toHaveBeenCalledTimes(1)
  })

  it('llama a onGuardar con los datos completos al enviar el formulario', () => {
    const onGuardar = vi.fn()
    render(
      <NuevoCultivoForm
        geneticasDisponibles={mockGeneticas}
        onGuardar={onGuardar}
        onCargarGenetica={vi.fn()}
      />
    )
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Sala Nueva' } })
    fireEvent.change(screen.getByLabelText(/etapa/i), { target: { value: 'vegetativo' } })
    fireEvent.change(screen.getByLabelText(/fecha de inicio/i), { target: { value: '2026-06-18' } })
    fireEvent.change(screen.getByLabelText(/cantidad de plantas/i), { target: { value: '8' } })
    fireEvent.change(screen.getByLabelText(/genetica/i), { target: { value: 'g2' } })
    fireEvent.click(screen.getByTestId('boton-guardar-cultivo'))
    expect(onGuardar).toHaveBeenCalledTimes(1)
    expect(onGuardar).toHaveBeenCalledWith({
      nombre: 'Sala Nueva',
      etapa: 'vegetativo',
      fechaInicio: '2026-06-18',
      cantidadPlantas: 8,
      geneticaId: 'g2',
    })
  })
})