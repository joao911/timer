export type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface IState {
  userAge: number
  cycles: Cycle[]
  activeCycleId: string | null
  amountSecondsPassed: number
  taskSelected: Cycle | null
  isEditing: boolean
}
