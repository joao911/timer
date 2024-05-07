import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, test, expect, it, vi } from 'vitest'
import { Home } from '../../index'
import { Provider } from 'react-redux'
import { store } from '../../../../store'

describe('Home', () => {
  test('should render correctly', () => {
    const { debug, getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    debug()

    expect(getByText('Vou trabalhar em')).toBeInTheDocument()
  })
  it('Verificar se o botão com o texto Começar existe', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    const button = getByText('Começar')
    expect(button).toHaveTextContent('Começar')
  })

  it('Verificar se o click do botão está funcionando', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    const button = getByText('Começar')
    fireEvent.click(button)
  })
  it('Verificar se posso escrever estudar angular no input', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    const input = getByPlaceholderText(
      'De um nome para o seu projeto',
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'estudar angular' } })
    expect(input.value).toBe('estudar angular')
  })

  it('Verificar se o posso escrever 50 no input  de números', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    const input = getByPlaceholderText('00') as HTMLInputElement
    fireEvent.change(input, { target: { value: '50' } })
    expect(input.value).toBe('50')
  })

  it('Verificar se o posso escrever ABC no input  de minutos', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    const input = getByPlaceholderText('00') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'ABC' } })
    expect(input.value).toBe('')
  })
  it('Verificar se ao clicar no botão começar sem preencher nenhum campo o clico inicia', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    const button = getByText('Começar')
    fireEvent.click(button)
    expect(getByText('Começar')).toBeInTheDocument()
  })

  it('Verificar se ao preencher todos os campos e clicar no botão começar o clico inicia', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    const input = getByPlaceholderText(
      'De um nome para o seu projeto',
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'estudar angular' } })
    expect(input.value).toBe('estudar angular')

    const inputNumber = getByPlaceholderText('00') as HTMLInputElement
    fireEvent.change(inputNumber, { target: { value: '50' } })
    expect(inputNumber.value).toBe('50')

    const form = getByRole('form') as HTMLFormElement
    fireEvent.submit(form)

    expect(getByText('Interromper')).toBeInTheDocument()
  })
})
