import { createSlice } from "@reduxjs/toolkit";
import { CompanyDetails } from "../../typing";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyDetails: [],
  },
  reducers: {
    // @ts-ignore
    addCompanyDetails: (state, action: CompanyDetails) => {
      state.companyDetails = [...state.companyDetails, action.payload];
    },
  },
});

export const companyActions = companySlice.actions;
export default companySlice;
