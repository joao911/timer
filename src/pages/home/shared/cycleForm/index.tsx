import React from 'react'
import { FormContainer, TaskInput, MinutesInput } from './styles'

type CycleFormProps = {
  activeCycle: boolean
  register: any
}

export const CycleForm: React.FC<CycleFormProps> = ({
  activeCycle,
  register,
}) => {
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em </label>
      <TaskInput
        type="text"
        id="task"
        placeholder="De um nome para o seu projeto"
        list="task-suggestions"
        {...register('task')}
        disabled={!!activeCycle}
      />
      <datalist id="task-suggestions">
        <option value="Estudar inglês" />
        <option value="Estudar react" />
        <option value="Estudar angular" />
        <option value="Trabalhar na recupera" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <MinutesInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />
      <span>minutos</span>
    </FormContainer>
  )
}
