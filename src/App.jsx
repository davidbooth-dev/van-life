import { 
    RouterProvider, 
    createBrowserRouter, 
    createRoutesFromElements,
    Route
} from "react-router-dom"

import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"

/* Login */
import Login, { 
    loader as LoginLoader, 
    action as LoginAction 
} from "./pages/Auth/Login"

/* Van Components */
import Vans, { loader as vansLoader } from "./pages/Vans/Vans"
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail"

/* Host Components */
import HostLayout from "./components/HostLayout"
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans"
import HostVanDetail, { loader as hostVanDetailLoader } from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import HostVanPricing from "./pages/Host/HostVanPricing"

/* Error Pages */
import NotFound from "./error-pages/NotFound"
import VanError from "./error-pages/VanError"
import ErrorBoundary from "./error-pages/ErrorBoundary"

import { requireAuth } from './utils'
import "./server"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout /> } >
        <Route 
            index 
            element={ <Home /> } 
        />
        <Route 
            path="about" 
            element={ <About /> }
        />
        <Route 
            path="login" 
            element={ <Login /> } 
            loader={LoginLoader}
            action={LoginAction}
        />
        <Route 
            path="vans" 
            element={ <Vans /> } 
            errorElement={ <VanError />}
            loader={vansLoader}
        />
        <Route 
            path="/vans/:id" 
            element={ <VanDetail /> }  
            errorElement={ <VanError />}
            loader={vanDetailLoader} 
        />  
        <Route 
            path="host" 
            element={ <HostLayout /> }
            errorElement={ <ErrorBoundary /> }
            >
            <Route 
                index 
                element={ <Dashboard /> } 
                loader={dashboardLoader} 
            /> 
            <Route 
                path="income" 
                element={ <Income /> } 
                loader={async ({request}) => await requireAuth(request)}
            />                        
            <Route 
                path="reviews" 
                element={ <Reviews /> } 
                loader={async ({request}) => await requireAuth(request)} 
            />                        
            <Route 
                path="vans" 
                element={ <HostVans /> } 
                errorElement={ <VanError />}
                loader={hostVansLoader} />                        
            <Route 
                path="vans/:id" 
                element={ <HostVanDetail /> } 
                errorElement={ <VanError />}
                loader={hostVanDetailLoader} >
                <Route 
                    index 
                    element={ <HostVanInfo /> } 
                    loader={async ({request}) => await requireAuth(request)}
                />                        
                <Route 
                    path="pricing" 
                    element={ <HostVanPricing /> } 
                    loader={async ({request}) => await requireAuth(request)} 
                />
                <Route 
                    path="photos" 
                    element={ <HostVanPhotos /> } 
                    loader={async ({request}) => await requireAuth(request)} 
                />  
            </Route>
        </Route>       
        <Route 
            path="*" 
            element={ <NotFound /> } 
        />
    </Route>    
))

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App