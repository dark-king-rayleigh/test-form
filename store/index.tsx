import { configureStore } from "@reduxjs/toolkit";
import companySlice from "./company/company-slice";

const store = configureStore({
  reducer: {
    company: companySlice.reducer,
  },
});

export default store;
