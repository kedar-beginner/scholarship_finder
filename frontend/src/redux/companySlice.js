import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: 'company',
    initialState: {
        company:null,
        companies:[],
        searchCompanyByText:""
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.company = action.payload;
        },
         setCompanies: (state, action) => {
            state.companies = action.payload; 
        },
        setSearchCompanyByText:(state,action)=>{
            state.searchCompanyByText = action.payload;
        },
    }
});

export const { setSingleCompany , setCompanies,setSearchCompanyByText} = companySlice.actions; 
export default companySlice.reducer;