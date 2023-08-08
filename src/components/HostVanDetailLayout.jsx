import { Outlet, NavLink } from "react-router-dom"
import HostVanDetail from "../pages/Host/HostVanDetail"

const HostVanDetailLayout = () => {
    const styles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    }
  return (
    <>
        <Outlet />
        <nav className="host-nav">
            <NavLink 
                to="/host/vans/:id"
                end
                style={({isActive}) => isActive ? styles : null }
            >
                Details
            </NavLink>           
            <NavLink 
                to="pricing"
                style={({isActive}) => isActive ? styles : null }
            >
                Pricing
            </NavLink>           
            <NavLink 
                to="photos"
                style={({isActive}) => isActive ? styles : null }
            >
                Photos
            </NavLink>
        </nav>
    </>
  )
}

export default HostVanDetailLayout
