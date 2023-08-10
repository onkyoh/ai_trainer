import { IPoint } from "../../../types";
import { axios } from "../../../lib/axios";

export const editPoint = (planId: string, point: IPoint) => {
  return axios.put(`/plans/${planId}/points/${point._id}`, point);
};
