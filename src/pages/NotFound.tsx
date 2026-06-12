import { Helmet } from 'react-helmet-async';
import './NotFound.css'; 

const NotFoundPage = () => {
  return (
    <>
    <Helmet>
      <title>NOT FOUND</title>
    </Helmet>
    <div className="panelcontenido">
      <h1>404</h1>
    </div>
    <h2>Not Found</h2>
    </>
  )
}

export default NotFoundPage