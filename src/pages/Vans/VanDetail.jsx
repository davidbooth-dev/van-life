import { Suspense } from 'react'
import { 
    Await, 
    defer,
    Link, 
    useLoaderData, 
    useLocation 
} from 'react-router-dom'

import { getVan } from "../../api"

export function loader({ params }){
    return defer({ van: getVan(params.id) })
}

const VanDetail = () => {
    const dataPromise = useLoaderData()
    const location = useLocation()
  
    const search = location.state?.search || ""
    const backText = location.state?.type || "all"

    function renderVanDetail(van){
        return (
            <div className="van-detail-container">
                <Link 
                    to={`..${search}`}
                    relative="path"
                    className="back-button"
                >&larr; <span>Back to {backText} vans</span></Link>
                
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            </div>
        )
    }

    return(
        <>
            <Suspense fallback={<h3>Loading Van Details...</h3>}>
                <Await resolve={dataPromise.van}>
                    {renderVanDetail}
                </Await>
            </Suspense>
        </>
    )
}

export default VanDetail