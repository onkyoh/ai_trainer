import { useState, useContext, useEffect } from "react";
import { IPlan } from "../../../types";
import { deletePlan } from "../api/deletePlan";
import { ResContext } from "../../../components/Layout/Main";

const useDeletePlan = (
  selectPlan: (plan: IPlan | null) => void,
  _id: string | undefined
) => {
  const context = useContext(ResContext);

  const [deletingId, setDeletingId] = useState<string | undefined>(undefined);

  const sendDelete = async (planId: string) => {
    await deletePlan(planId);
    await context?.fetchPlans();
    selectPlan(null);
    setDeletingId(undefined);
  };

  const toggleDeleteMode = (planId: string) => {
    setDeletingId(planId);
  };

  useEffect(() => {
    if (_id) {
      setDeletingId(undefined);
    }
  }, [_id]);

  return {
    deletingId,
    toggleDeleteMode,
    sendDelete,
  };
};

export default useDeletePlan;
