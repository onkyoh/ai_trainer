import { useState, useEffect } from 'react'
import axios from 'axios'
import { ICurrentUser} from '../../../types'
import { clearToken, getToken } from '../../../utils/storage'
import { LOGIN_URL } from '../../../utils/constants'

interface IExistingUserRes {
  data: {
    success: Boolean
    message: string,
    data: ICurrentUser
  }
}

const useCurrentUser = () => {

  const url = LOGIN_URL

  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const retrieveUser = async (token: string) => {
    setIsLoading(true)
    try {
        const res: IExistingUserRes = await axios.get(url, 
            {
              headers: {
                  Authorization: `Bearer ${token}`
              }
            })
        if (res.data && res.data.data) {
          setCurrentUser({...res.data.data})
        }
      } catch (err) {}
      setIsLoading(false)
  }

  useEffect(() => {
    const token: string | null = getToken()
    if (!token) return
    retrieveUser(token)
  }, [])

  const logout = () => {
    setCurrentUser(null)
    clearToken()
  }

  return {
    currentUser,
    setCurrentUser,
    logout,
    isLoading
  }
}

export default useCurrentUser