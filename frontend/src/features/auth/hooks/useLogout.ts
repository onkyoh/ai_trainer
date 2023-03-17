import { useState } from 'react'

const useLogout = () => {

    const [isLoggingOut, setIsLoggingOut] = useState<Boolean>(false)

    const toggleLogout = () => {
        setIsLoggingOut(!isLoggingOut)
    }

  return {
    isLoggingOut,
    toggleLogout
  }
}

export default useLogout