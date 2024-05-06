import { Suspense } from 'react'
import { 
    Await, 
    defer, 
    Link, 
    NavLink, 
    Outlet, 
    useLoaderData 
} from 'react-router-dom'

import { getHostVan } from '../../api'
import { requireAuth } from "../../utils"

export async function loader({ request, params }){
    const hostId = "123"
    await requireAuth(request)
    return defer({ van: getHostVan(params.id, hostId) })
}

const HostVanDetail = () => {
    const dataPromise = useLoaderData()

    const styles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    }
    
    function renderVanDetail(currentVan){
        return(
            <>
                <Link 
                    to=".." 
                    relative="path"
                    className="back-button"
                    >&larr; <span>Back to all vans</span>
                </Link>
                <div className="host-van-detail-container">
                    <div className="host-van-detail">
                        <img src={currentVan.imageUrl} />
                        <div className="host-van-detail-info">
                            <i className={`van-type ${currentVan.type} selected`}>{currentVan.type}</i>
                            <h2>{currentVan.name}</h2>
                            <p className="van-price"><span>${currentVan.price}</span>/day</p>
                        
                        </div>
                    </div>
                    <nav className="host-nav">
                        <NavLink 
                            to="."
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
                    <Outlet context={{currentVan}} />
                </div>                
            </>
        )
    }


    return(
        <section>
            <Suspense fallback={<h3>Loading Van Details...</h3>}>
                <Await resolve={dataPromise.van}>
                    {renderVanDetail}
                </Await>
            </Suspense>
        </section>
    )
}

export default HostVanDetail
