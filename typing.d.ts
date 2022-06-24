export interface CompanyDetails {
  id: string;
  companyManager: CompanyMaster;
  companyAddress: Address[];
}

interface CompanyMaster {
  name: string;
  website: string;
  phone: string;
  email: string;
}

export interface Address {
  officeBranch: string;
  country: string;
  address1: string;
  address2: string;
  addressCode: string;
  city: string;
  state: string;
}
