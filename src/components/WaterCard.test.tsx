import { render, screen } from '@testing-library/react'
import { WaterCard } from './WaterCard'

describe('WaterCard', () => {
  it('muestra el pH correctamente', () => {
    render(<WaterCard ph={6.5} ec={1.8} temperatura={22} />)
    expect(screen.getByText('6.5')).toBeInTheDocument()
  })

  it('muestra el EC correctamente', () => {
    render(<WaterCard ph={6.5} ec={1.8} temperatura={22} />)
    expect(screen.getByText('1.8')).toBeInTheDocument()
  })
})