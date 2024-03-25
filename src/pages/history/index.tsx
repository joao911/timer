import React from 'react'
import { map } from 'lodash'
import { useStory } from './useStory'
import { ptBR } from 'date-fns/locale'
import { Pencil, Trash } from 'phosphor-react'
import { formatDistanceToNow } from 'date-fns'
import { useCyclesStore } from '../../store/useCycles'
import { HistoryContainer, HistoryList, Status, ContainerEdit } from './styles'

export const History: React.FC = () => {
  const { cycles } = useCyclesStore()
  const { updatedMinutesAmount, handleDeleteCycle } = useStory()
  return (
    <HistoryContainer>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {map(cycles, (item) => {
              return (
                <tr key={item.id}>
                  <td>{item.task}</td>
                  <td>{item.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(item.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {item.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {item.interruptedDate && (
                      <ContainerEdit onClick={() => updatedMinutesAmount(item)}>
                        <Status statusColor="red">Interrompido</Status>
                        <Pencil size={24} />
                      </ContainerEdit>
                    )}
                    {!item.finishedDate && !item.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                  <td onClick={() => handleDeleteCycle(item.id)}>
                    <ContainerEdit>
                      <Trash size={24} />
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
