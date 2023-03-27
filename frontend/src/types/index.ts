import { IToast } from "../components/Elements/Toast/useToast"

interface ILoginRes {
    _id: string,
    username: string,
    token: string
}

export interface IUserRes {
    data: {
        success: boolean,
        message: string,
        data?: ILoginRes
    }
}

export interface IRes {
    success: boolean,
    message: string,
}

export interface ICurrentUser {
    id: string,
    username: string
}

export interface IPoint {
    _id: string,
    value: string,
    date: string
}

export interface IWorkout {
    label: string,
    exercises: [
        {
            name: string,
            amount: string
        }
    ]
}

export interface IPlan {
    _id: string,
    ownerId: string,
    name: string,
    plan: IWorkout[] | [],
    tracker: {
        yAxis: string,
        points: IPoint[] | []
    }
}