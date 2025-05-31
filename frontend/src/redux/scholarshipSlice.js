import { createSlice } from "@reduxjs/toolkit";

const scholarshipSlice = createSlice({
       name:"scholarship",
       initialState:{
             allscholarships:[],
             allAdminscholarships:[],
             singlescholarship:null,
             searchscholarshipByText:"",
             allAppliedscholarships:[],
             searchQuery:"",
       },
       reducers:{
          setAllscholarships:(state,action)=>{
            state.allscholarships=action.payload;
          },
          setSinglescholarships:(state,action)=>{
            state.singlescholarship=action.payload;
          },
          setallAdminscholarships:(state,action)=>{
            state.allAdminscholarships=action.payload;
          },
          setsearchscholarshipByText:(state,action)=>{
            state.searchscholarshipByText=action.payload;
          },
          setallAppliedscholarships:(state,action)=>{
            state.allAppliedscholarships=action.payload;
          },
          setsearchQuery:(state,action)=>{
            state.searchQuery=action.payload;
          },
       }
});
export const {setAllscholarships}= scholarshipSlice.actions;
export const {setSinglescholarships,setallAdminscholarships,setsearchscholarshipByText,setallAppliedscholarships,setsearchQuery}= scholarshipSlice.actions;
export default scholarshipSlice.reducer;