import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const ButtonBase = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme['gray-100']};

  &:not(:disabled):disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme['green-500']};
  &:hover {
    background-color: ${({ theme }) => theme['green-700']};
  }
`

export const StopButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme['red-500']};
  &:hover {
    background-color: ${({ theme }) => theme['red-700']};
  }
`
