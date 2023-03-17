import axios from 'axios'

export const errorHandler = (err: any) => {
    if (axios.isAxiosError(err))  {
        if (err.response) {
            return err.response.data
        }
        return {
            success: false,
            message: 'An unknown error occured.'
        }
    }
    return err
}