import Button from "../../../components/Elements/Button/Button"
import useLogout from "../hooks/useLogout"

interface IProps {
    logout: () => void
}

const Logout = ({logout}: IProps) => {

    const {isLoggingOut, toggleLogout} = useLogout()

  return (
    <div id="logout">
       {
        !isLoggingOut ?
        <Button onClick={toggleLogout}>
            Logout
        </Button>
        :
        <div>
            <Button onClick={logout}>
                Confirm

            </Button>
            <Button onClick={toggleLogout}>
                Cancel
            </Button>
        </div>
       }
    </div>
  )
}

export default Logout