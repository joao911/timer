import React from 'react'
import { ContainerEdit, HistoryContainer, HistoryList, Status } from './styles'
import { useCycle } from '../../hooks'
import { map } from 'lodash'
import { Pencil, Trash } from 'phosphor-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useHistory } from './useHistory'

export const History: React.FC = () => {
  const { cycles } = useCycle()
  const { deleteCycle, updateMinutesAmount } = useHistory()
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
                <tr>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {cycle.interruptedDate && (
                      <ContainerEdit onClick={() => updateMinutesAmount(cycle)}>
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
