/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useAuth } from "../components/user/useAuth";
import { useEffect } from "react";

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const {isAuthenticated, isPending} = useAuth();
    useEffect(function(){
        if(!isAuthenticated && !isPending) navigate("/login")
    }, [isAuthenticated, isPending, navigate])
    if(isPending) return <div>Loading...</div>
    if(isAuthenticated) return children;

    return null;
}

export default ProtectedRoute
