import { useState, useContext, SetStateAction, Dispatch } from "react";
import { ResContext } from "../../../components/Layout/Main";
import { IPoint } from "../../../types";

interface INewPoint {
  date: string;
  value: string;
}

interface IProps {
  points: IPoint[];
  setPoints: Dispatch<SetStateAction<[] | IPoint[]>>;
  planId: string;
}

const useTable = ({ setPoints, points, planId }: IProps) => {
  const context = useContext(ResContext);

  const [isLoading, setIsLoading] = useState(false);

  const defaultNew = {
    date: "",
    value: "",
  };

  const [newPoint, setNewPoint] = useState<INewPoint>({ ...defaultNew });

  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  const handleNewPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPoint({ ...newPoint, [name]: value });
  };

  const toggleEditMode = (pointId: string) => {
    if (editingId) {
      setEditingId(undefined);
      return;
    }
    setEditingId(pointId);
  };

  const sendHandler = async (
    request: Function,
    point: string | IPoint | INewPoint
  ) => {
    setIsLoading(true);
    try {
      const res = await request(planId, point);

      if (res.success) {
        await context?.fetchPlans();
        setEditingId(undefined);
        setNewPoint({ ...defaultNew });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    pointId: string
  ) => {
    const idx = points.findIndex((point) => point._id === pointId);
    if (idx < 0) return;
    const { value, name } = e.target;
    let currentPoint: IPoint = { ...points[idx] };
    currentPoint = { ...currentPoint, [name]: value };
    const tempPoints = [...points];
    tempPoints[idx] = currentPoint;
    setPoints([...tempPoints]);
  };

  return {
    isLoading,
    newPoint,
    editingId,
    handleNewPoint,
    toggleEditMode,
    sendHandler,
    handleChangeInput,
  };
};

export default useTable;
