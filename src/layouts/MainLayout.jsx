import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


const MainLayout = ({changeTheme, isSignedIn}) => {
  return (
    <>
        <Navbar changeTheme={changeTheme} isSignedIn={isSignedIn} />
        <Outlet />
    </>
  )
}

export default MainLayout