import { axios } from "../../../lib/axios";

export const deletePlan = (planId: string) => {
  return axios.delete(`/plans/${planId}`);
};
