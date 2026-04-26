import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState={ 
  cartItems:[],
}
const cartSlice= createSlice({

  name: 'cart',
  initialState: initialState,
  reducers:{
    addToCart: (state,action)=>{
       {/*item in cart */}
      const existingItem=state.cartItems.find(item=> item._id===action.payload._id)

      if(!existingItem){
        state.cartItems.push(action.payload)
        Swal.fire({
          title: "Item added to cart!",
          text: "",
          icon: "success"
        });
      }  
      else(
        Swal.fire({
          title: "Item already in cart!",
          text: "Repeat item?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Okay"
        })
      )
    },
    removeFromCart:(state,action)=>{
      state.cartItems=state.cartItems.filter(item=>item._id!==action.payload._id)
    },
    clearCart:(state)=>{
      state.cartItems=[]
    }
  }

})

export const {addToCart}=cartSlice.actions;
export const {removeFromCart}=cartSlice.actions;
export const {clearCart}=cartSlice.actions;
export default cartSlice.reducer;