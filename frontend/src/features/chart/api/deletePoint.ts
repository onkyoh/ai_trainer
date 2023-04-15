import axios from 'axios'
import { authorize } from '../../../utils/authorize'
import { errorHandler } from '../../../utils/error'
import { PLAN_URL } from '../../../utils/constants'

export const deletePoint = async (
    planId: string, 
    pointId: string
) => {
    
    try {
        const res = await axios.delete(`${PLAN_URL}/${planId}/points/${pointId}`, authorize())
        return res.data
    } catch (err: any) {
        return errorHandler(err)
    }
}