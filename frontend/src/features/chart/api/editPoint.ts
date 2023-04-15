import axios from 'axios'
import { IPoint } from '../../../types'
import { authorize } from '../../../utils/authorize'
import { PLAN_URL } from '../../../utils/constants'
import { errorHandler } from '../../../utils/error'

export const editPoint = async (
    planId: string,
    point: IPoint, 
) => {
    
    try {
        const res = await axios.put(`${PLAN_URL}/${planId}/points/${point._id}`, point, authorize())
        return res.data
    } catch (err: any) {
        return errorHandler(err)
    }
}