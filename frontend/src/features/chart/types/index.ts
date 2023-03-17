import { IPoint } from "../../../types";

export interface ITablePoint extends IPoint {
    className?: string,
    children: React.ReactNode,
}

export interface IOnEdit {
    pointId: string,
    e: React.ChangeEvent<HTMLInputElement>
}