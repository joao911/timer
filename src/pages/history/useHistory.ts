import { differenceInMinutes } from 'date-fns'
import { Cycle } from '../../store/modules/cycles/types'
import { useCycle } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { filter, map } from 'lodash'

export const useHistory = () => {
  const { dispatch, cycles, activeCycle } = useCycle()
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
      dispatch.cycles.setTaskSelected(
        taskSelected && {
          ...taskSelected,
          minutesAmount: taskSelected.minutesAmount - differenceMinutes,
          startDate: new Date(),
        },
      )
      dispatch.cycles.setActiveCycleId(null)
      if (activeCycle) {
        dispatch.cycles.setCycles(
          map(cycles, (cycle) => {
            if (cycle.id === activeCycle.id) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
        )
      }

      dispatch.cycles.setIsEditing(true)
      navigate('/')
    }
  }

  function deleteCycle(id: string) {
    dispatch.cycles.setCycles(filter(cycles, (cycle) => cycle.id !== id))
    dispatch.cycles.setIsEditing(false)
  }
  return { updateMinutesAmount, deleteCycle }
}
