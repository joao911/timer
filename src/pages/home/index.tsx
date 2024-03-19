import React, { useEffect, useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HomeContainer, StartButton, StopButton } from './styles'
import { HandPalm, Play } from 'phosphor-react'
import { CycleForm } from './shared/cycleForm'
import { CountDown } from './shared/countDouwn'
import { CyclesContext } from '../../contexts/CyclesContext'

export const Home: React.FC = () => {
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

  return (
    <HomeContainer>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...cycleForm}>
          <CycleForm />
        </FormProvider>
        <CountDown />

        {!activeCycle ? (
          <StartButton type="submit">
            <Play size={24} />
            Começar
          </StartButton>
        ) : (
          <StopButton
            type="submit"
            onClick={() => {
              handleStopCycle()
              setIsEditing(false)
              reset(initialValues)
            }}
          >
            <HandPalm size={24} />
            Pausar
          </StopButton>
        )}
      </form>
    </HomeContainer>
  )
}
