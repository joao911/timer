import { differenceInMinutes } from 'date-fns'
import { Cycle } from '../../store/types'
import { useCyclesStore } from '../../store/useCycles'
import { useCycles } from '../hooks'
import { useNavigate } from 'react-router-dom'

export const useStory = () => {
  const navigate = useNavigate()
  const { activeCycle } = useCycles()
  const { cycleSelected } = useCyclesStore()
  const updateCycles = useCyclesStore((state) => state.updateCycles)
  const setIsEditing = useCyclesStore((state) => state.setIsEditing)
  const setCycleSelected = useCyclesStore((state) => state.setCycleSelected)
  const setActiveCycleId = useCyclesStore((state) => state.setActiveCycleId)

  function diferenceInMinutesFromStartTaskAndInterruptedTask(
    startDate: Date,
    endDate: Date,
  ) {
    return differenceInMinutes(new Date(endDate), new Date(startDate))
  }

  function updatedMinutesAmount(task: Cycle) {
    if (task && task.interruptedDate) {
      const differenceMinutes =
        diferenceInMinutesFromStartTaskAndInterruptedTask(
          task.startDate,
          task.interruptedDate,
        )
      setCycleSelected({
        ...cycleSelected,
        minutesAmount: cycleSelected.minutesAmount - differenceMinutes,
        startDate: new Date(),
      })
      setActiveCycleId(null)
      if (activeCycle) {
        const updatedActiveCycle = {
          ...activeCycle,
          interruptedDate: new Date(),
        }
        updateCycles(updatedActiveCycle)
      }
      setIsEditing(false)
      navigate('/')
    }
  }
  return { updatedMinutesAmount }
}
