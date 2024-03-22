import { useEffect } from 'react'
import { useCycles } from '../../../hooks'
import { differenceInSeconds } from 'date-fns'
import { toast } from 'react-toastify'
import { useCyclesStore } from '../../../../store/useCycles'

export const useCountDown = () => {
  const { activeCycle } = useCycles()

  const { activeCycleId, amountSecondsPassed } = useCyclesStore()

  const setCycles = useCyclesStore((state) => state.setCycles)
  const setActiveCycleId = useCyclesStore((state) => state.setActiveCycleId)
  const setAmountSecondsPassed = useCyclesStore(
    (state) => state.setAmountSecondsPassed,
  )

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // useEffect(() => {
  //   let interval: number
  //   if (activeCycle) {
  //     interval = setInterval(() => {
  //       const difference = differenceInSeconds(
  //         new Date(),
  //         new Date(activeCycle.startDate),
  //       )

  //       if (difference >= totalSeconds) {
  //         setCycles((state) =>
  //           state.map((cycle) => {
  //             if (cycle.id === activeCycleId) {
  //               return { ...cycle, finishedDate: new Date() }
  //             } else {
  //               return cycle
  //             }
  //           }),
  //         )

  //         toast.success('Ciclo concluído com sucesso')
  //         setActiveCycleId(null)
  //         clearInterval(interval)
  //       } else {
  //         setAmountSecondsPassed(difference)
  //       }
  //     }, 1000) as unknown as number
  //   }

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [
  //   activeCycle,
  //   activeCycleId,
  //   totalSeconds,
  //   setAmountSecondsPassed,
  //   setCycles,
  //   setActiveCycleId,
  // ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeCycle])

  console.log('activeCycle', activeCycle)

  return { minutes, seconds }
}
