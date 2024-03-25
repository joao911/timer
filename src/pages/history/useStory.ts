import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { differenceInMinutes } from 'date-fns'

import { useCycles } from '../hooks'
import { Cycle } from '../../store/types'
import { useCyclesStore } from '../../store/useCycles'

export const useStory = () => {
  const navigate = useNavigate()
  const { activeCycle } = useCycles()
  const updateCycles = useCyclesStore((state) => state.updateCycles)
  const setIsEditing = useCyclesStore((state) => state.setIsEditing)
  const setCycleSelected = useCyclesStore((state) => state.setCycleSelected)
  const setActiveCycleId = useCyclesStore((state) => state.setActiveCycleId)
  const deleteCycle = useCyclesStore((state) => state.deleteCycle)

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
        ...task,
        minutesAmount: task.minutesAmount - differenceMinutes,
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
      setIsEditing(true)
      navigate('/')
    }
  }

  function handleDeleteCycle(id: string) {
    deleteCycle(id)
    setIsEditing(false)
    toast.done('Ciclo excluído com sucesso')
  }
  return { updatedMinutesAmount, handleDeleteCycle }
}
