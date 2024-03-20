import React from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HomeContainer, StartButton, StopButton } from './styles'
import { HandPalm, Play } from 'phosphor-react'
import { CycleForm } from './shared/cycleForm'
import { CountDown } from './shared/countDouwn'
import { useCycle } from '../../hooks'
import { useHome } from './useHome'
import { FormProvider } from 'react-hook-form'

export const Home: React.FC = () => {
  const { handleSubmit, cycleForm, onSubmit, handleStopCycle } = useHome()
  const { activeCycle } = useCycle()

  return (
    <HomeContainer>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...cycleForm}>
          <CycleForm />
        </FormProvider>
        <CountDown />
        {!activeCycle ? (
          <StartButton type="submit">
            <Play size={24} />
            Começar
          </StartButton>
        ) : (
          <StopButton type="submit" onClick={handleStopCycle}>
            <HandPalm size={24} />
            Interromper
          </StopButton>
        )}
      </form>
    </HomeContainer>
  )
}
