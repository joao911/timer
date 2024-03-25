import React from 'react'

import { HomeContainer, StartButton, StopButton } from './styles'
import { HandPalm, Play } from 'phosphor-react'
import { CycleForm } from './shared/cycleForm'
import { CountDown } from './shared/countDouwn'
import { useCycles } from '../hooks'
import { FormProvider } from 'react-hook-form'
import { useHome } from './useHome'

export const Home: React.FC = () => {
  const { handleSubmit, onSubmit, cycleForm, handleStopCycle } = useHome()
  const { activeCycle } = useCycles()

  return (
    <HomeContainer>
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
          <StopButton type="button" onClick={() => handleStopCycle()}>
            <HandPalm size={24} />
            Interromper
          </StopButton>
        )}
      </form>
    </HomeContainer>
  )
}
