import { useCyclesStore } from '../../store/useCycles'

export const useCycles = () => {
  const { cycles, amountSecondsPassed, activeCycleId } = useCyclesStore()
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  return { cycles, activeCycle, amountSecondsPassed }
}
