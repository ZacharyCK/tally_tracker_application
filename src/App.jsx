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
  const [session, setSession] = useState(null)

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout changeTheme={handleThemeChange} isSignedIn={session} />}>
          <Route index element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage isDarkTheme={isDarkTheme} />} />
          <Route path='/login' element={<LogInPage isDarkTheme={isDarkTheme} />} />
          <Route path='/profilesetup' element={<ProfileSetUp isDarkTheme={isDarkTheme} />} />
      </Route>
    )
  );

  return <RouterProvider router={router}/>
}

export default App
