export interface Results {
  results?: (DataInterface)[] | null;
}

export interface DataInterface {
  Region_Name: string;
  Region_Id: string;
}

export type GetAllCountries = (DataInterface)[] | null;

