import { filter } from 'lodash'
import { createContext, useState, ReactNode } from 'react'
import { toast } from 'react-toastify'

export type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

type NewCycleFormData = {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  cycles: Cycle[]
  changeIdNull: () => void
  amountSecondsPassed: number
  handleStopCycle: () => void
  taskSelected: Cycle
  isEditing: boolean
  setIsEditing: (data: boolean) => void
  setTaskSelected: (data: Cycle) => void
  markCurrentCycleAsFinished: () => void
  createNewCycle: (data: NewCycleFormData) => void
  setAmountSecondsPassed: (seconds: number) => void
  UpdateCycle: (id: string, data: NewCycleFormData) => void
  deleteCycle: (id: string) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [taskSelected, setTaskSelected] = useState<Cycle>({
    id: '',
    task: '',
    minutesAmount: 0,
    startDate: new Date(),
  })
  const [isEditing, setIsEditing] = useState(false)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function changeIdNull() {
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }
  function handleStopCycle() {
    if (activeCycle) {
      setActiveCycleId(null)
      setCycles((state) =>
        state.map((cycle) => {
          if (cycle.id === activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
      )
      toast.success('Ciclo interrompido com sucesso')
    }
  }

  function createNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function UpdateCycle(id: string, data: NewCycleFormData) {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === id) {
          return {
            ...cycle,
            ...data,
            startDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }
  function deleteCycle(id: string) {
    setCycles((state) => filter(state, (cycle) => cycle.id !== id))
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        changeIdNull,
        amountSecondsPassed,
        setAmountSecondsPassed,
        createNewCycle,
        handleStopCycle,
        UpdateCycle,
        taskSelected,
        setTaskSelected,
        isEditing,
        setIsEditing,
        deleteCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
