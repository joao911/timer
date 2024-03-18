import React, { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { CyclesContext } from '../../contexts/CyclesContext'
import { map } from 'lodash'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// import { Container } from './styles';

export const History: React.FC = () => {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <HistoryList>
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>

            <th>Inicio</th>

            <th>Status</th>
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
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
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
