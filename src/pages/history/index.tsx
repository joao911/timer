import React from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'

export const History: React.FC = () => {
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de dois meses</td>
              <td>
                <Status statusColor="green">Em em andamento</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
