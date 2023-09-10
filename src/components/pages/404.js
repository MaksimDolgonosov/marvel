import ErrorMessage from "../error/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate(); 
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Error:404. Page not found.</p>
            <Link 
            style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} 
            to={"/"}
            onClick={() => navigate(-1)}
            >Back to previous page</Link>
        </div>
    )
}

export default Page404;