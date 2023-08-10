import { axios } from "../../../lib/axios";
import { IPlan, IRes } from "../../../types";

interface IPlanRes extends IRes {
  data: IPlan[];
}

export const getPlans = (): Promise<IPlanRes> => {
  return axios.get("/plans");
};
