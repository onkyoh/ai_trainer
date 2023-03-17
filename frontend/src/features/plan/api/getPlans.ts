import axios from "axios"
import { authorize } from "../../../utils/authorize"
import { PLAN_URL } from "../../../utils/constants"
import { errorHandler } from "../../../utils/error"

export const getPlans = async () => {

    try {
        const res = await axios.get(PLAN_URL, authorize())
        if (res.data.success) {
            return res.data
        }
        return {
            success: false,
            message: 'Retrieval error'
        }
    } catch (err) {
        return errorHandler(err)
    }
}