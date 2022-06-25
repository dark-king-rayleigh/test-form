import { createSlice } from "@reduxjs/toolkit";
import { CompanyDetails } from "../../typing";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyDetails: [] as any,
  },
  reducers: {
    addCompanyDetails: (state, action: any) => {
      state.companyDetails = [...state.companyDetails, action.payload];
    },
    removeCompany: (state, action: any) => {
      state.companyDetails = state.companyDetails.filter(
        (company: any) => company.id !== action.payload
      );
    },
  },
});

export const companyActions = companySlice.actions;
export default companySlice;
