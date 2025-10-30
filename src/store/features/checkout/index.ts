import { Product } from '@/payload-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ExtendedProduct = Product & { orderQuantity: number }

export interface CheckoutInitialState {
  shoppingCardOpen: boolean
  products: ExtendedProduct[]
}

const checkoutInitialState: CheckoutInitialState = {
  shoppingCardOpen: false,
  products: [],
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: checkoutInitialState,
  reducers: {
    setShoppingCardOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.shoppingCardOpen = payload
    },
    setProducts: (state, { payload }: PayloadAction<ExtendedProduct[]>) => {
      state.products = payload
    },
    clearProducts: (state) => {
      state.products = []
    },
    addProductToShoppingCart: (state, { payload }: PayloadAction<ExtendedProduct>) => {
      if (state.products.find((product) => product.id === payload.id)) {
        state.products = state.products.map((product) => {
          if (product.id === payload.id) product.orderQuantity += payload.orderQuantity
          return product
        })
        return
      }
      state.products.push(payload)
    },
    removeProductFromShoppingCart: (state, { payload }: PayloadAction<Product>) => {
      if (!state.products.find((product) => product.id === payload.id)) return
      state.products = state.products.filter((product) => product.id !== payload.id)
    },
    addOrderQuantity: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.products = state.products.map((product) => {
        if (product.id === payload.id) product.orderQuantity += 1
        return product
      })
    },
    removeOrderQuantity: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.products = state.products.map((product) => {
        if (product.id === payload.id) product.orderQuantity -= 1
        return product
      })
    },
  },
})

export const {
  setShoppingCardOpen,
  setProducts,
  clearProducts,
  addProductToShoppingCart,
  removeProductFromShoppingCart,
  addOrderQuantity,
  removeOrderQuantity,
} = checkoutSlice.actions

export default checkoutSlice.reducer
