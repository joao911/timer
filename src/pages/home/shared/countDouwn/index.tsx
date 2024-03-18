import React, { useContext, useEffect } from 'react'
import { CountDownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { toast } from 'react-toastify'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export const CountDown: React.FC = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    changeIdNull,
    amountSecondsPassed,
    setAmountSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (difference >= totalSeconds) {
          markCurrentCycleAsFinished()

          toast.success('Ciclo concluído com sucesso')
          changeIdNull()
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(difference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    changeIdNull,
    setAmountSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Timer'
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
