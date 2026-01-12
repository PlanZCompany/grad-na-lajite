import { Product } from '@/payload-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ExtendedProduct = Product & { orderQuantity: number }

export type CourierOption = {
  id: string
  courier_name: string
  courier_code: 'econt' | 'speedy' | 'boxnow'
  method: 'office' | 'address' | 'locker'
  base_fee: number
  free_shipping: boolean
  free_over_amount: number
  is_active: boolean
}

export interface CheckoutInitialState {
  shoppingCardOpen: boolean
  products: ExtendedProduct[]
  stageCompleted: number
  checkoutFormData: {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    shipping: 'econt' | 'boxnow' | 'speedy' | null
    city: string | undefined
    innerShipping:
      | 'econt-office'
      | 'econt-address'
      | 'speedy-office'
      | 'speedy-address'
      | 'box-now'
      | undefined
    office: string | undefined
    address: string | undefined
    payment: 'card' | 'cash_on_delivery' | 'google_pay' | 'apple_pay'
    discountCode: null | {
      discountCodeId: string
      code: string
      discountType: 'percent' | 'fixed'
      discountValue: number
    }
    orderNumber: string | null
  }
  userWantSubscription: boolean
  shippingOptions: CourierOption[]
}

const checkoutInitialState: CheckoutInitialState = {
  shoppingCardOpen: false,
  products: [],
  stageCompleted: 0,
  checkoutFormData: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    shipping: null,
    city: undefined,
    innerShipping: undefined,
    office: undefined,
    address: undefined,
    payment: 'cash_on_delivery',
    discountCode: null,
    orderNumber: null,
  },
  userWantSubscription: false,
  shippingOptions: [],
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
    setCompletedStage: (state, { payload }: PayloadAction<number>) => {
      state.stageCompleted = payload
    },
    setCheckoutFormData: (
      state,
      { payload }: PayloadAction<Partial<CheckoutInitialState['checkoutFormData']>>,
    ) => {
      state.checkoutFormData = { ...state.checkoutFormData, ...payload }
    },
    setUserWantSubscription: (state, { payload }: PayloadAction<boolean>) => {
      state.userWantSubscription = payload
    },
    setCourierOptions: (state, { payload }: PayloadAction<CourierOption[]>) => {
      state.shippingOptions = payload
    },
    resetToInitialState: () => {
      return checkoutInitialState
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
  setCompletedStage,
  setCheckoutFormData,
  resetToInitialState,
  setUserWantSubscription,
  setCourierOptions,
} = checkoutSlice.actions

export default checkoutSlice.reducer
