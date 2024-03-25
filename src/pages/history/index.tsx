import React from 'react'
import { map } from 'lodash'
import { useStory } from './useStory'
import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import { Pencil, Trash } from 'phosphor-react'
import { ContainerEdit, HistoryContainer, HistoryList, Status } from './styles'

export const History: React.FC = () => {
  const { cycles, updateMinutesAmount, deleteCycle } = useStory()

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
                    <ContainerEdit>
                      <Trash size={24} onClick={() => deleteCycle(cycle.id)} />
                    </ContainerEdit>
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
