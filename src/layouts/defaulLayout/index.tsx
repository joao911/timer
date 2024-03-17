import React from 'react'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'
import { LayoutContainer } from './styles'

// import { Container } from './styles';

export const DefaultLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
