import { useEffect, useState } from 'react'
import { Link, NavLink,Outlet, useParams } from 'react-router-dom'

 const HostVanDetail = () => {
    const [currentVan, setCurrentVan] = useState();
    const params = useParams();

    useEffect(()=> {
        fetch(`/api/host/vans/${params.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCurrentVan(data.vans)
            })
    }, [params.id])

    const styles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    }

    if (!currentVan) {
        return <h1>Loading...</h1>
    }

    return (
        <section>
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
        </section>
    )
}

export default HostVanDetail
