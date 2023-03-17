import { IForm } from "../hooks/useLogin"
import axios from "axios"
import { setToken } from "../../../utils/storage"
import { IUserRes } from "../../../types"
import { errorHandler } from "../../../utils/error"
import { LOGIN_URL } from "../../../utils/constants"

export const loginUser = async (data: IForm) => {
    try {
        const res: IUserRes = await axios.post(`${LOGIN_URL}/login`, data)
        if (res?.data?.data?.token) {
            setToken(res.data.data.token)
            return res.data
        }
        
        return {
            success: false,
            message: 'An unknown error occured'
        }
    } catch (err: any) {
        return errorHandler(err)
    }
}