import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Vans = () => {
    const [allVans, setAllVans] = useState([])

    useEffect(() => {
        fetch("/api/vans")
            .then(response => response.json())
            .then(data => setAllVans(data.vans));        
    }, [])

    const vanElements = allVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    return (
        <>
            <h1>Explore our Van options.</h1>
            <nav className="van-nav">
                <NavLink>Simple</NavLink>
                <NavLink>Luxury</NavLink>
                <NavLink>Rugged</NavLink>
                <NavLink>Clear Filters</NavLink>
            </nav>
            <div className="van-list-container">
                <div className="van-list">
                    {vanElements}
                </div>
            </div>
        </>
    )
}

export default Vans
