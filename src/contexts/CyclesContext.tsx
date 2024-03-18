import { createContext, useState, ReactNode } from 'react'
import { toast } from 'react-toastify'

type Cycle = {
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
  markCurrentCycleAsFinished: () => void
  changeIdNull: () => void
  amountSecondsPassed: number
  setAmountSecondsPassed: (seconds: number) => void
  cycles: Cycle[]
  createNewCycle: (data: NewCycleFormData) => void
  handleStopCycle: () => void
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
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
