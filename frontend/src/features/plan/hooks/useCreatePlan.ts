import {useState, useContext} from 'react'
import { ResContext } from '../../../components/Layout/Main'
import { IPlan } from '../../../types'
import { createPlan } from '../api/createPlan'
import { ICreateForm } from '../types'

const useCreatePlan = (selectPlan: ((plan: IPlan | null) => void)) => {

    const context = useContext(ResContext)

    const [formValues, setFormValues] = useState<ICreateForm>({
        name: '',
        goal: '',
        days: '',
        equipment: '',
        yAxis: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleFormValues = (e: React.FormEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {value, name} = e.target as HTMLSelectElement | HTMLInputElement
        setFormValues({...formValues, [name]: value})
    }
    
    const sendCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const res = await createPlan(formValues)
        context?.notify(res)
        if (res.data) {
          await context?.fetchPlans()
          selectPlan(res.data)
        }
        setIsLoading(false)
    }


  return {
    formValues,
    handleFormValues,
    sendCreate,
    isLoading
  }
}

export default useCreatePlan