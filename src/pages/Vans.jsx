import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
            <ul>
                <li>Simple</li>
                <li>Luxury</li>
                <li>Rugged</li>
                <li>Clear Filters</li>
            </ul>
            <div className="van-list-container">
                <div className="van-list">
                    {vanElements}
                </div>
            </div>
        </>
    )
}

export default Vans
