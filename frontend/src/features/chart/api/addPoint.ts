import { axios } from "../../../lib/axios";

export const addPoint = (
  planId: string,
  data: {
    value: string;
    date: string;
  }
) => {
  return axios.put(`/plans/${planId}`, data);
};
