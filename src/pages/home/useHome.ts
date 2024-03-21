import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Cycle } from '../../store/modules/cycles/types'
import { useCycle } from '../../hooks'
import { map, noop } from 'lodash'
export const useHome = () => {
  const { cycles } = useSelector((state: RootState) => state.cycles)
  const { activeCycle, isEditing, taskSelected, dispatch } = useCycle()
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
  const initialValues = {
    task: '',
    minutesAmount: 0,
  }

  const defaultValuesTaskSelected = {
    task: taskSelected?.task ?? '',
    minutesAmount: taskSelected?.minutesAmount ?? 0,
  }

  const defaultValues: NewCycleFormData = isEditing
    ? defaultValuesTaskSelected
    : initialValues

  const cycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(schema),
    defaultValues,
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
    dispatch.cycles.setCycles([...cycles, newCycle])
    dispatch.cycles.setActiveCycleId(id)
    dispatch.cycles.setAmountSecondsPassed(0)
    reset()
  }

  function updateCycle(id: string, data: NewCycleFormData) {
    dispatch.cycles.setActiveCycleId(id)
    dispatch.cycles.setAmountSecondsPassed(0)
    dispatch.cycles.setCycles(
      map(cycles, (cycle) => {
        if (cycle.id === id) {
          return {
            ...cycle,
            ...data,
            interruptedDate: undefined,
            startDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
  }
  function handleUpdateCycle(data: NewCycleFormData) {
    if (taskSelected) {
      updateCycle(taskSelected.id, data)
    } else {
      noop()
    }
  }

  const onSubmit = (data: NewCycleFormData) => {
    if (isEditing) {
      handleUpdateCycle(data)
    } else {
      createNewCycle(data)
    }
  }

  function handleStopCycle() {
    if (activeCycle) {
      dispatch.cycles.setActiveCycleId(null)
      dispatch.cycles.setCycles(
        map(cycles, (cycle) => {
          if (cycle.id === activeCycle.id) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
      )
      reset(initialValues)
      toast.success('Ciclo interrompido com sucesso')
    }
  }

  return { onSubmit, cycleForm, handleSubmit, handleStopCycle }
}
