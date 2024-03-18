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
  const { activeCycle, handleStopCycle, createNewCycle } =
    useContext(CyclesContext)

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

  const onSubmit = (data: NewCycleFormData) => {
    console.log('data', data)
    createNewCycle(data)
    reset()
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
          <StopButton type="submit" onClick={handleStopCycle}>
            <HandPalm size={24} />
            Interromper
          </StopButton>
        )}
      </form>
    </HomeContainer>
  )
}
