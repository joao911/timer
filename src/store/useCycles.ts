import { create } from 'zustand'
import { CyclesContextType, Cycle, NewCycleFormData } from './types'
import { filter, map } from 'lodash'

export const useCyclesStore = create<CyclesContextType>((set) => ({
  cycles: [] as Cycle[],
  activeCycleId: null,
  changeIdNull: () => set({ activeCycleId: null }),
  amountSecondsPassed: 0,
  handleStopCycle: () => {},
  taskSelected: {} as Cycle,
  isEditing: false,
  setIsEditing: (data: boolean) => set({ isEditing: data }),
  setTaskSelected: (data: Cycle) => set({ taskSelected: data }),
  markCurrentCycleAsFinished: () => {},
  addNewCycle: (cycle: Cycle) =>
    set((state) => ({ cycles: [...state.cycles, cycle] })),
  updateCycles: (cycle: Cycle) =>
    set((state) => ({
      cycles: map(state.cycles, (item) =>
        item.id === cycle.id ? cycle : item,
      ),
    })),
  deleteCycle: (id: string) =>
    set((state) => ({
      cycles: filter(state.cycles, (item) => item.id !== id),
    })),

  setAmountSecondsPassed: (seconds: number) =>
    set({ amountSecondsPassed: seconds }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  UpdateCycle: (id: string, data: NewCycleFormData) => {},

  setActiveCycleId: (id: string | null) => set({ activeCycleId: id }),
}))
