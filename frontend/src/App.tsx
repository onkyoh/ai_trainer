import './styles/App.css';
import Login from './features/auth/components/Login';
import Main from './components/Layout/Main';
import useCurrentUser from './features/auth/hooks/useCurrentUser';
import Spinner from './components/Elements/Spinner/Spinner';

function App() {

    const { 
      currentUser,
      setCurrentUser,
      logout,
      isLoading
    } = useCurrentUser()

  return (
    <>
    {isLoading ?
      <Spinner/>
      :
      <div>
          {!currentUser ? 
            <Login setCurrentUser={setCurrentUser}/>
            :
            <Main logout={logout}/>
          }
      </div>
    }
    </>
  );
}

export default App;
