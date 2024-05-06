import { Link, useRouteError } from 'react-router-dom'

const VanError = () => {
    const error = useRouteError()
    return (
        <section className="error-container">
            <h1>Error: {error.message}</h1>
            <pre>{error.status} - {error.statusText}</pre>
            <Link 
                to="/"
                className="link-button"
            >
                Return to Vans
            </Link>
        </section>
    )
};

export default VanError
