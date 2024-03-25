import { toast } from 'react-toastify'
import { map } from 'lodash'
import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { useCycle } from '../../../../hooks'

export const useCount = () => {
  const { activeCycle, dispatch, cycles, activeCycleId, amountSecondsPassed } =
    useCycle()

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
          dispatch.cycles.setCycles(
            map(cycles, (cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )

          toast.success('Ciclo concluído com sucesso')
          dispatch.cycles.setActiveCycleId(null)
          clearInterval(interval)
        } else {
          dispatch.cycles.setAmountSecondsPassed(difference)
        }
      }, 1000) as unknown as number
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, totalSeconds, cycles, dispatch])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeCycle])

  return { minutes, seconds }
}
