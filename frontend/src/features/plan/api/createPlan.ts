import axios from "axios"
import { authorize } from "../../../utils/authorize"
import { PLAN_URL } from "../../../utils/constants"
import { errorHandler } from "../../../utils/error"
import { ICreateForm } from "../types"

export const createPlan = async (formValues: ICreateForm) => {
     
    try {
        const res = await axios.post(PLAN_URL, formValues, authorize())
        return res.data
    } catch (err) {
        return errorHandler(err)
    }
}