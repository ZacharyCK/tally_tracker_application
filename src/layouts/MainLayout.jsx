import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


const MainLayout = ({changeTheme, isSignedIn, resetCounterQuantity}) => {
  return (
    <>
        <Navbar changeTheme={changeTheme} isSignedIn={isSignedIn} resetCounterQuantity={resetCounterQuantity} />
        <Outlet />
    </>
  )
}

export default MainLayout