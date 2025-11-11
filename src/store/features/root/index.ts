import { Product, User } from '@/payload-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RootInitialState {
  user: User | null
  openMenu: boolean
  isLoading: boolean
  sectionName: string | null
  heroAppearAnimationDone: boolean | 'pending'
  heroAnimationDone: boolean
  openSearch: boolean
  extraComments: { name: string; comment: string }[]
  mainProduct: Product | null
}

const rootInitialState: RootInitialState = {
  user: null,
  openMenu: false,
  isLoading: false,
  sectionName: null,
  heroAppearAnimationDone: 'pending',
  heroAnimationDone: false,
  openSearch: false,
  extraComments: [],
  mainProduct: null,
}

export const rootSlice = createSlice({
  name: 'root',
  initialState: rootInitialState,
  reducers: {
    setOpenMenu: (state, { payload }: PayloadAction<boolean>) => {
      state.openMenu = payload
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setSectionName: (state, { payload }: PayloadAction<string | null>) => {
      state.sectionName = payload
    },
    setHeroAnimationDone: (state) => {
      state.heroAnimationDone = true
    },
    setHeroAppearAnimationDone: (state, action: PayloadAction<boolean | 'pending'>) => {
      state.heroAppearAnimationDone = action.payload
    },
    setOpenSearch: (state, { payload }: PayloadAction<boolean>) => {
      state.openSearch = payload
    },
    setUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload
    },
    setExtraComments: (state, { payload }: PayloadAction<{ name: string; comment: string }[]>) => {
      state.extraComments = payload
    },
    setMainProduct: (state, { payload }: PayloadAction<Product | null>) => {
      state.mainProduct = payload
    },
  },
})

export const {
  setOpenMenu,
  setIsLoading,
  setSectionName,
  setHeroAnimationDone,
  setHeroAppearAnimationDone,
  setOpenSearch,
  setUser,
  setExtraComments,
  setMainProduct,
} = rootSlice.actions

export default rootSlice.reducer
