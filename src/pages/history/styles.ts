import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  red: 'red-500',
  green: 'green-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 30%;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
export const ContainerEdit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

export const HistoryList = styled.div`
  overflow-y: auto;
  height: 30rem;
  margin-top: 2rem;
  thead th {
    position: sticky;
    top: 0px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th {
    background-color: ${({ theme }) => theme['gray-600']};
    padding: 1rem;
    text-align: left;
    color: ${({ theme }) => theme['gray-100']};
    font-size: 0.875rem;
    line-height: 1.6;

    &:first-child {
      border-top-left-radius: 8px;
      padding-left: 1.5rem;
    }
    &:last-child {
      border-top-right-radius: 8px;
      padding-right: 1.5rem;
    }
  }

  td {
    background-color: ${({ theme }) => theme['gray-700']};
    border-top: 4px solid ${({ theme }) => theme['gray-800']};
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.6;
    &:first-child {
      width: 40%;
      padding: 1.5rem;
    }
    &:last-child {
      padding-right: 1.5rem;
    }
  }
`
