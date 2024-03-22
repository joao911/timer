import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCyclesStore } from '../../store/useCycles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Cycle } from '../../store/types'
import { useCycles } from '../hooks'

export const useHome = () => {
  const setActiveCycleId = useCyclesStore((state) => state.setActiveCycleId)
  const { activeCycle } = useCycles()

  const setAmountSecondsPassed = useCyclesStore(
    (state) => state.setAmountSecondsPassed,
  )
  const addNewCycle = useCyclesStore((state) => state.addNewCycle)
  const updateCycles = useCyclesStore((state) => state.updateCycles)

  const schema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser de no minimo 5 minutos')
      .max(60, 'O ciclo precisa ser de no maximo 60 minutos')
      .refine((val) => val !== undefined, {
        message: 'Preencha esse campo',
      }),
  })

  type NewCycleFormData = zod.infer<typeof schema>

  const cycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = cycleForm

  useEffect(() => {
    if (errors.task) {
      toast.error(errors.task.message)
    }

    if (errors.minutesAmount) {
      toast.error(errors.minutesAmount.message)
    }
  }, [errors])

  function createNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    addNewCycle(newCycle)
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleStopCycle() {
    if (activeCycle) {
      const updatedActiveCycle = {
        ...activeCycle,
        interruptedDate: new Date(),
      }
      updateCycles(updatedActiveCycle)

      toast.error('Ciclo interrompido com sucesso')
      setActiveCycleId(null)
      reset()
    }
  }

  const onSubmit = (data: NewCycleFormData) => {
    createNewCycle(data)
  }

  return { handleSubmit, onSubmit, cycleForm, handleStopCycle }
}
