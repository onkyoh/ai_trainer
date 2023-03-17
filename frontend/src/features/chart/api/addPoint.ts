import axios from 'axios'
import { authorize } from '../../../utils/authorize'
import { PLAN_URL } from '../../../utils/constants'
import { errorHandler } from '../../../utils/error'

export const addPoint = async (
    planId: string,
    data: {
        value: string,
        date: string
    }
) => {

    try {
        const res = await axios.put(`${PLAN_URL}/${planId}/add`, data, authorize())
        return res.data
    } catch (err: any) {
        return errorHandler(err)
    }
}