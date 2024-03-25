import { useContext, useEffect } from 'react'
import zod from 'zod'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CyclesContext } from '../../../contexts/CyclesContext'
export const useHome = () => {
  const {
    activeCycle,
    handleStopCycle,
    createNewCycle,
    isEditing,
    taskSelected,
    UpdateCycle,
    setIsEditing,
  } = useContext(CyclesContext)

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
  const defaultValues: NewCycleFormData = isEditing
    ? {
        task: taskSelected.task,
        minutesAmount: taskSelected.minutesAmount,
      }
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

  const onSubmit = (data: NewCycleFormData) => {
    isEditing ? UpdateCycle(taskSelected.id, data) : createNewCycle(data)
    reset(initialValues)
  }
  return {
    activeCycle,
    handleStopCycle,
    setIsEditing,
    handleSubmit,
    onSubmit,
    cycleForm,
    initialValues,
    reset,
  }
}
