import { useEffect, useState } from "react";
import { IPlan } from "../../../types";
import { getPlans } from "../api/getPlans";

const usePlans = () => {
  const [plans, setPlans] = useState<IPlan[] | []>([]);
  const [currentPlan, setCurrentPlan] = useState<IPlan | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);

  const fetchPlans = async () => {
    const res = await getPlans();
    if (res.success) {
      setPlans(res.data);
      if (currentPlan) {
        const idx = res.data.findIndex(
          (plan: IPlan) => plan._id === currentPlan?._id
        );
        setCurrentPlan(res.data[idx]);
      }
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const selectPlan = (plan: IPlan | null) => {
    setCreatingNew(false);
    if (plan?._id === currentPlan?._id) {
      return setCurrentPlan(null);
    }
    setCurrentPlan(plan);
  };

  const toggleCreateNew = () => {
    setCurrentPlan(null);
    setCreatingNew(!creatingNew);
  };

  const planUtils = {
    plans,
    currentPlan,
    selectPlan,
    creatingNew,
    toggleCreateNew,
  };

  return {
    planUtils,
    fetchPlans,
  };
};

export default usePlans;
