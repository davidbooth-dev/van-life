import { Link, useRouteError } from 'react-router-dom'

const VanError = () => {
    const error = useRouteError()
    return (
        <section className="error-container">
        <h1>Error: {error.message}</h1>
        <pre>{error.status} - {error.statusText}</pre>
        <Link to="/">Return to Home</Link>
        </section>
    )
};

export default VanError
