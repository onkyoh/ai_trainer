import Toast from "../Elements/Toast/Toast";

import PlansList from "../../features/plan/components/PlansList";
import usePlans from "../../features/plan/hooks/usePlans";
import { createContext } from "react";
import Plan from "../../features/plan/components/Plan";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Table from "../../features/chart/components/Table";
import Logout from "../../features/auth/components/Logout";
import useChart from "../../features/chart/hooks/useChart";
import useToastStore from "../../stores/useToastStore";

interface IProps {
  logout: () => void;
}

interface IContext {
  fetchPlans: () => Promise<void>;
}

export const ResContext = createContext<IContext | null>(null);

const Main = ({ logout }: IProps) => {
  const { toast } = useToastStore();
  const { planUtils, fetchPlans } = usePlans();

  const { points, setPoints, options, chartRef } = useChart(
    planUtils.currentPlan
  );

  return (
    <main>
      <ResContext.Provider value={{ fetchPlans }}>
        <PlansList {...planUtils}>
          <Logout logout={logout} />
        </PlansList>

        <Plan {...planUtils} />

        {planUtils.currentPlan && (
          <>
            <Table
              points={points}
              planId={planUtils.currentPlan._id}
              setPoints={setPoints}
              yAxis={planUtils.currentPlan?.tracker.yAxis}
            />
          </>
        )}

        <div id="chart">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
          />
        </div>

        {toast && <Toast {...toast} />}
      </ResContext.Provider>
    </main>
  );
};

export default Main;
