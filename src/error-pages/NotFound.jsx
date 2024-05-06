import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="error-container">
        <h1>Sorry, the page you were looking for was not found.</h1>
        <Link 
            to="/"
            className="link-button"
        >
            Return to Home
        </Link>
    </section>
  )
};

export default NotFound
