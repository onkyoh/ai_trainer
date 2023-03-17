import { getToken } from "./storage"

export const authorize = () => {
    const token: null | string = getToken()
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
}