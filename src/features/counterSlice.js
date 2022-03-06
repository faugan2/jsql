import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  app:null,
};



export const counterSlice = createSlice({
  name: 'counter',
  initialState,
 
  reducers: {
   
    
    setApp: (state, action) => {
      state.app = action.payload;
    },
  },
  
});

export const {  setApp } = counterSlice.actions;

export const selectApp = (state) => state.counter.app;



export default counterSlice.reducer;
