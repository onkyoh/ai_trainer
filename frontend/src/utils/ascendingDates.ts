export const ascendingDates = (points: number[][]) => {
    return points.sort((a,b) => a[0] - b[0])
}