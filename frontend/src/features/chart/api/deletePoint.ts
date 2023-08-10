import { axios } from "../../../lib/axios";

export const deletePoint = (planId: string, pointId: string) => {
  return axios.delete(`/plans/${planId}/points/${pointId}`);
};
