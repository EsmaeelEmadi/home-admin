import { IDate } from "./general";

export interface IResidential {
  id: number;
  address: string;
  hasBalcony: boolean;
  hasParking: boolean;
  numberOfRoom: number;
  rentPrice: number;
  dateOfCreation: string;
  createdBy: string;
  createdOn: IDate;
  updatedBy: string;
  updateOn: IDate;
}

export interface IResidentialPost
  extends Omit<
    IResidential,
    "id" | "createdOn" | "createdBy" | "updateOn" | "updatedBy"
  > {}
