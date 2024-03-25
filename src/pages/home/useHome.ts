import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCyclesStore } from '../../store/useCycles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Cycle } from '../../store/types'
import { useCycles } from '../hooks'

export const useHome = () => {
  const { activeCycle } = useCycles()
  const { cycleSelected, isEditing } = useCyclesStore()

  const setAmountSecondsPassed = useCyclesStore(
    (state) => state.setAmountSecondsPassed,
  )
  const addNewCycle = useCyclesStore((state) => state.addNewCycle)
  const updateCycles = useCyclesStore((state) => state.updateCycles)
  const setActiveCycleId = useCyclesStore((state) => state.setActiveCycleId)
  const setIsEditing = useCyclesStore((state) => state.setIsEditing)

  const schema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
      .refine((val) => val !== undefined, {
        message: 'Preencha esse campo',
      }),
  })

  type NewCycleFormData = zod.infer<typeof schema>

  const defaultValuesDefault = {
    task: '',
    minutesAmount: 0,
  }

  const defaultValuesWithCycleSelected = {
    task: cycleSelected?.task,
    minutesAmount: cycleSelected?.minutesAmount,
  }

  const cycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(schema),
    defaultValues: isEditing
      ? defaultValuesWithCycleSelected
      : defaultValuesDefault,
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
  }

  function editCycle(data: NewCycleFormData) {
    if (cycleSelected) {
      const updatedActiveCycle = {
        ...cycleSelected,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date(),
      }
      updateCycles(updatedActiveCycle)
      setActiveCycleId(cycleSelected.id)

      toast.success('Ciclo atualizado com sucesso')
    }
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
      setIsEditing(false)
      reset(defaultValuesDefault)
    }
  }

  const onSubmit = (data: NewCycleFormData) => {
    isEditing ? editCycle(data) : createNewCycle(data)
    setIsEditing(false)
    reset(defaultValuesDefault)
  }

  return { handleSubmit, onSubmit, cycleForm, handleStopCycle }
}
