import { useDispatch, useSelector } from 'react-redux'
import { RootState, Dispatch } from '../store'
import { find } from 'lodash'

export const useCycle = () => {
  const dispatch = useDispatch<Dispatch>()

  const {
    cycles,
    activeCycleId,
    amountSecondsPassed,
    taskSelected,
    isEditing,
  } = useSelector((state: RootState) => state.cycles)

  const activeCycle = find(cycles, (cycle) => cycle.id === activeCycleId)

  return {
    activeCycle,
    dispatch,
    cycles,
    activeCycleId,
    amountSecondsPassed,
    taskSelected,
    isEditing,
  }
}
