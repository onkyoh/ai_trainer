import { IPoint } from "../types"

export const formatPoint = (point: IPoint) => {
    const newDate = point.date.split('-')
    const formatted = newDate.map((date: string) => parseInt(date))
    return [Date.UTC(formatted[0], formatted[1] - 1, formatted[2]), parseInt(point.value)]
}