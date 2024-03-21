import { create } from 'zustand'
import { CyclesContextType, Cycle, NewCycleFormData } from './types'

export const useCyclesStore = create<CyclesContextType>((set) => ({
  cycles: [] as Cycle[],
  setCycles: (cycle) => set((state) => ({ cycles: [...state.cycles, cycle] })),
  activeCycleId: null,
  changeIdNull: () => set({ activeCycleId: null }),
  amountSecondsPassed: 0,
  handleStopCycle: () => {},
  taskSelected: {} as Cycle,
  isEditing: false,
  setIsEditing: (data: boolean) => set({ isEditing: data }),
  setTaskSelected: (data: Cycle) => set({ taskSelected: data }),
  markCurrentCycleAsFinished: () => {},

  // createNewCycle: (data: NewCycleFormData) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAmountSecondsPassed: (seconds: number) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  UpdateCycle: (id: string, data: NewCycleFormData) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteCycle: (id: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setActiveCycleId: (id: string | null) => {},
}))
