import axios from "axios"
import { authorize } from "../../../utils/authorize"
import { PLAN_URL } from "../../../utils/constants"
import { errorHandler } from "../../../utils/error"

export const deletePlan = async (planId: string) => {

    try {
        const res = await axios.delete(`${PLAN_URL}/${planId}`, authorize())
        return res.data
    } catch (err) {
        errorHandler(err)
    }
}