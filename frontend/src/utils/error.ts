import axios from 'axios'

export const errorHandler = (err: any) => {
    if (axios.isAxiosError(err))  {
        if (err.response?.data?.message) {
            return {
                success: false,
                message: err.response.data.message
            }
        }
        return {
            success: false,
            message: 'An unknown error occured.'
        }
    }
    return err
}