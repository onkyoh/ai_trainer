import { useState } from 'react'

export interface IToast {
    success: boolean,
    message: string
}

const useToast = () => {

    const [toast, setToast] = useState<null | IToast>(null)

    const notify = (toastObject: IToast) => {
        setToast({...toastObject})
        setTimeout(() => {
            setToast(null)
        }, 3000)
    }

  return {
    toast, notify
  }
}

export default useToast