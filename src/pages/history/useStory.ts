import { useContext } from 'react'
import { Cycle, CyclesContext } from '../../contexts/CyclesContext'
import { useNavigate } from 'react-router-dom'
import { differenceInMinutes } from 'date-fns'

export const useStory = () => {
  const {
    cycles,
    setTaskSelected,
    setIsEditing,
    deleteCycle,
    setActiveCycleId,
    setCycles,
    activeCycleId,
  } = useContext(CyclesContext)
  const navigate = useNavigate()
  function differenceInMinutesFromStartTaskToInterruptedTasks(
    startDate: Date,
    endDate: Date,
  ) {
    return differenceInMinutes(new Date(endDate), new Date(startDate))
  }

  function updateMinutesAmount(taskSelected: Cycle) {
    if (taskSelected.startDate && taskSelected.interruptedDate) {
      const differenceMinutes =
        differenceInMinutesFromStartTaskToInterruptedTasks(
          taskSelected.startDate,
          taskSelected.interruptedDate,
        )
      setTaskSelected(
        taskSelected && {
          ...taskSelected,
          minutesAmount: taskSelected.minutesAmount - differenceMinutes,
          startDate: new Date(),
        },
      )
      setActiveCycleId(null)
      setCycles((state: Cycle[]) =>
        state.map((cycle) => {
          if (cycle.id === activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
      )
      setIsEditing(true)
      navigate('/')
    }
  }

  return { cycles, updateMinutesAmount, deleteCycle }
}
