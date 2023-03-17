import React, {useState} from 'react'

import { loginUser } from '../api/loginUser'
import { registerUser } from '../api/registerUser'

import { ICurrentUser, IUserRes } from '../../../types'

export interface IForm {
    username: string | undefined,
    password: string | undefined
  }

const useLogin = (
    setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>,
) => {

    const defaultForm: IForm = {
        username: '',
        password: '',
      }
    
    const [formState, setFormState] = useState(defaultForm)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [newAccount, setNewAccount] = useState(false)

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.target as HTMLInputElement
        setFormState({...formState, [name]: value})
    }

    const toggleLogin = () => {
        setNewAccount(!newAccount)
        setError('')
        setFormState(defaultForm)
    }

    const validate = () => {
        let error = ''
        if (!formState.username) error = 'username is required'
        if (!formState.password) error = 'password is required'
        return error
    }  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errorMessage: string = validate()
        if (errorMessage) {
            setError(errorMessage)
            return
        }
        setIsLoading(true)
        let res: IUserRes["data"];
            if (newAccount) {
                res = await registerUser(formState)
            } else {
                res = await loginUser(formState)
            }
        if (!res.success) {
            setError(res.message)
        } else {
            if (res.data) {
                setCurrentUser({
                    id: res.data._id,
                    username: res.data.username
                })
            }
        }
        setIsLoading(false)
      }

  return {
    formState,
    error,
    onChange,
    handleSubmit,
    isLoading,
    toggleLogin,
    newAccount
  }
}

export default useLogin