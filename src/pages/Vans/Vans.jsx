import { useState } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import { getVans } from "../../api"

export function loader(){
    return getVans()
}
const Vans = () => {
    const[searchParams, setSearchParams ] = useSearchParams()
    const [error, setError] = useState(null)
    
    const allVans = useLoaderData()
    const typeFilter = searchParams.get("type");


    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    const displayedVans = typeFilter 
        ? 
          allVans.filter(van => van.type === typeFilter)
        : allVans

    const vanElements = displayedVans?.map(van => (
        <div key={van.id} className="van-tile">
            <Link 
                to={van.id} 
                state={{ 
                    search: `?${searchParams.toString()}`, 
                    type: typeFilter 
                }}
            >
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }
    return (
        <div className="van-list-container">
            <h1>Explore our Van options.</h1>
            <div className="van-list-filter-buttons">
                <button
                    onClick={ () => handleFilterChange("type", "simple")}
                    to="?type=simple"
                    className={
                        `van-type simple ${typeFilter === "simple" ? "selected" : ""}`
                        }>
                        Simple
                </button>
                <button 
                    onClick={ () => handleFilterChange("type", "luxury")}
                    className={
                        `van-type simple ${typeFilter === "luxury" ? "selected" : ""}`
                        }>
                        Luxury
                    </button>
                <button 
                    onClick={ () => handleFilterChange("type", "rugged")}
                    className={
                        `van-type simple ${typeFilter === "rugged" ? "selected" : ""}`
                        }>
                        Rugged
                </button>
                {typeFilter &&
                    <button 
                        onClick={ () => handleFilterChange("type", null)}
                        className="van-type clear-filters">
                            Clear Filter
                    </button>
                }
            </div>
            <div className="van-list-container">
                <div className="van-list">
                    {vanElements}
                </div>
            </div>
        </div>
    )
}

export default Vans
