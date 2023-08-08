import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HostVan = () => {
    const [ allVans, setAllVans ] = useState([])

    useEffect(() => {
        fetch('/api/host/vans')
            .then(response => response.json())
            .then(data => setAllVans(data.vans))
    }, [])

    const vanElements = allVans.map(van => (
        <Link
            to={`/host/vans/${van.id}`}
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
    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    allVans.length > 0 ? (
                        <section>
                            {vanElements}
                        </section>

                    ) : (
                            <h2>Loading...</h2>
                        )
                }
            </div>
        </section>
    )
}

export default HostVan