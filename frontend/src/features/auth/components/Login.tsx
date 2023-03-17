import Button from '../../../components/Elements/Button/Button'
import useLogin from '../hooks/useLogin'

import Form from '../../../components/Form/Form/Form'
import Spinner from '../../../components/Elements/Spinner/Spinner'

import { ICurrentUser } from '../../../types'

interface IProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>
}

const Login = ({setCurrentUser}: IProps) => {

  const {
    formState, 
    error, 
    onChange, 
    handleSubmit, 
    isLoading, 
    toggleLogin, 
    newAccount
  } = useLogin(setCurrentUser)

  return (
    <div id="login">

        {isLoading && <Spinner/>}

        <Form onSubmit={handleSubmit}>

          <h2>{newAccount ? 'Create an Account' : 'Sign in to existing Account'}</h2>

          {error && <p>{error}</p>}

          <input
          name='username'
          value={formState.username}
          placeholder='Username'
          onChange={onChange}
          />
          
          <input
          type='password'
          name='password'
          placeholder='Password'
          value={formState.password}
          onChange={onChange}
          />

          <Button type='submit' isDisabled={isLoading}>
            Submit
          </Button>

          {newAccount ? 
            <span onClick={toggleLogin}>Have an account?</span>
            :
            <span onClick={toggleLogin}>Need an account?</span>
          }
          
        </Form>
    </div>
  )
}

export default Login