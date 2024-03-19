import React, { useContext } from 'react'
import { ContainerEdit, HistoryContainer, HistoryList, Status } from './styles'
import { Cycle, CyclesContext } from '../../contexts/CyclesContext'
import { map } from 'lodash'
import { formatDistanceToNow, differenceInMinutes } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pencil, Trash } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

export const History: React.FC = () => {
  const { cycles, setTaskSelected, setIsEditing, deleteCycle } =
    useContext(CyclesContext)
  const navigate = useNavigate()

  function differenceInMinutesFromStartTaskToInterruptedTasks(
    startDate: Date,
    endDate: Date,
  ) {
    return differenceInMinutes(new Date(endDate), new Date(startDate))
  }

  function updateMinutesAmount(taskSelected: Cycle) {
    if (taskSelected.startDate && taskSelected.interruptedDate) {
      const differenceMinutes =
        differenceInMinutesFromStartTaskToInterruptedTasks(
          taskSelected.startDate,
          taskSelected.interruptedDate,
        )
      setTaskSelected(
        taskSelected && {
          ...taskSelected,
          minutesAmount: taskSelected.minutesAmount - differenceMinutes,
          startDate: new Date(),
        },
      )
      setIsEditing(true)
      navigate('/')
    }
  }

  return (
    <HistoryContainer>
      <HistoryList>
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>

            <th>Inicio</th>

            <th>Status</th>
            <th></th>
          </thead>
          <tbody>
            {map(cycles, (cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td
                    onClick={() => {
                      updateMinutesAmount(cycle)
                    }}
                  >
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {cycle.interruptedDate && (
                      <ContainerEdit>
                        <Status statusColor="red">Interrompido</Status>
                        <Pencil size={24} />
                      </ContainerEdit>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                  <td>
                    <Trash size={24} onClick={() => deleteCycle(cycle.id)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
