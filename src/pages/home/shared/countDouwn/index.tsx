import React from 'react'
import { CountDownContainer, Separator } from './styles'
import { useCountDown } from './useCountDouwn'

export const CountDown: React.FC = () => {
  const { minutes, seconds } = useCountDown()
  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
