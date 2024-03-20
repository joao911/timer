import { Models } from '@rematch/core'
import { cycles } from './modules/cycles'

export interface RootModel extends Models<RootModel> {
  cycles: typeof cycles
}

export const models: RootModel = {
  cycles,
}
