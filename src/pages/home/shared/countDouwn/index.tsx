import React from 'react'
import { CountDownContainer, Separator } from './styles'

type CountDownProps = {
  minutes: string
  seconds: string
}

export const CountDown: React.FC<CountDownProps> = ({ minutes, seconds }) => {
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
