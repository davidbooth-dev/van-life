import { NavLink, Link } from 'react-router-dom'
import avatarUrl from "../assets/avatar-icon.png"

const Header = () => {
    function fakeLogOut() {
        localStorage.removeItem("loggedin")
    }

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink 
                    to="/about"
                    className={({isActive}) => isActive ? "active-link" : null }
                    >
                    About
                </NavLink>
                <NavLink 
                    to="/host"
                    className={({isActive}) => isActive ? "active-link" : null }
                    >
                    Host
                </NavLink>
                <NavLink 
                    to="/vans"
                    className={({isActive}) => isActive ? "active-link" : null }
                    >
                    Vans
                </NavLink>
                <Link to="login" className="login-link">
                    <img 
                        src={avatarUrl} 
                        className="login-icon"
                    />
                </Link>
                <button onClick={ fakeLogOut }>X

                </button>
            </nav>
        </header>
    )
}

export default Header
