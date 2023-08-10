import { axios } from "../../../lib/axios";
import { ICreateForm } from "../types";

export const createPlan = (formValues: ICreateForm) => {
  return axios.post("/plans", formValues);
};
