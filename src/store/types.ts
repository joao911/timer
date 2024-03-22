export type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export type NewCycleFormData = {
  task: string
  minutesAmount: number
}

export interface CyclesContextType {
  cycles: Cycle[]
  activeCycleId: string | null
  changeIdNull: () => void
  amountSecondsPassed: number
  handleStopCycle: () => void
  taskSelected: Cycle
  isEditing: boolean
  setIsEditing: (data: boolean) => void
  setTaskSelected: (data: Cycle) => void
  markCurrentCycleAsFinished: () => void
  // createNewCycle: (data: NewCycleFormData) => void
  setAmountSecondsPassed: (seconds: number) => void
  UpdateCycle: (id: string, data: NewCycleFormData) => void
  // deleteCycle: (id: string) => void
  setActiveCycleId: (id: string | null) => void
  addNewCycle: (cycle: Cycle) => void
  updateCycles: (cycle: Cycle) => void
  deleteCycle: (id: string) => void
}
