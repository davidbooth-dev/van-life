import { Suspense } from 'react'
import { 
    Await, 
    defer,
    Link, 
    useLoaderData 
} from 'react-router-dom'

import { requireAuth } from "../../utils"
import { getHostVans } from "../../api"

export async function loader({request}){
    const hostId = "123"
    await requireAuth(request)
    return defer({ vans: getHostVans(hostId) })
}

const HostVan = () => {
    const loaderData = useLoaderData()

    function renderVanElements(allVans){
        const vanElements = allVans.map(van => (
            <Link
                to={van.id}
                key={van.id}
                className="host-van-link-wrapper"
            >
                <div className="host-van-single" key={van.id}>
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                </div>
            </Link>
        ))
    
        return(
            <div className="host-vans-list">
                <section>
                    {vanElements}
                 </section>
            </div>
        )
    }
    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <Suspense fallback={<h3>Loading Your Listed Vans...</h3>}>
                <Await resolve={loaderData.vans}>
                    {renderVanElements}
                </Await>
            </Suspense>            
        </section>
    )
}

export default HostVan