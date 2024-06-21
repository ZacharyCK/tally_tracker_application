import { useState, useEffect } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useNavigate } from 'react-router-dom'
import supabase from './utils/supabase'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import ProfileSetUp from './pages/ProfileSetUp'
import './App.css'


function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [session, setSession] = useState(null);
  const [redirectURL, setRedirectURL] = useState(`http://localhost:5173/profilesetup`)
  const [counterQuantity, setCounterQuantity] = useState(1);
  const user = session ? session.user : null;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    
    return () => subscription.unsubscribe()
  }, [])

  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  const changeCounterQuantity = (number) => {
    setCounterQuantity(number);
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout changeTheme={handleThemeChange} isSignedIn={session} resetCounterQuantity={changeCounterQuantity} />}>
          <Route index element={<HomePage currentUser={user} counterQuantity={counterQuantity} changeCounterQuantity={changeCounterQuantity} />} />
          <Route path='/signup' element={<SignUpPage isDarkTheme={isDarkTheme} />} />
          <Route path='/login' element={<LogInPage isDarkTheme={isDarkTheme} url={redirectURL} />} />
          <Route path='/profilesetup' element={<ProfileSetUp isDarkTheme={isDarkTheme} currentUser={user} />} />
      </Route>
    )
  );

  return <RouterProvider router={router}/>
}

export default App
