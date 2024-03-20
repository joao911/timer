import { createModel } from '@rematch/core'
import { RootModel } from '../../models'

import { IState, Cycle } from './types'

export const cycles = createModel<RootModel>()({
  state: {
    userAge: 0,
    cycles: [],
    activeCycleId: null,
    amountSecondsPassed: 0,
    taskSelected: null,
    isEditing: false,
  } as IState,
  reducers: {
    setUserAge(state, payload: number) {
      return { ...state, userAge: payload }
    },
    setCycles(state, payload: Cycle[]) {
      return { ...state, cycles: payload }
    },
    setActiveCycleId(state, payload: string | null) {
      return { ...state, activeCycleId: payload }
    },
    setAmountSecondsPassed(state, payload: number) {
      return { ...state, amountSecondsPassed: payload }
    },
    setTaskSelected(state, payload: Cycle | null) {
      return { ...state, taskSelected: payload }
    },
    setIsEditing(state, payload: boolean) {
      return { ...state, isEditing: payload }
    },
  },
  effects: (dispatch) => ({
    async upAge(payload: string, state) {
      console.log('payload', payload)
      const { userAge } = state.users
      dispatch.users.setUserAge(userAge + 1)
    },
    async downAge(payload: string, state) {
      console.log('payload', payload)
      const { userAge } = state.users
      if (userAge >= 1) {
        dispatch.users.setUserAge(userAge - 1)
      }
    },
  }),
})
