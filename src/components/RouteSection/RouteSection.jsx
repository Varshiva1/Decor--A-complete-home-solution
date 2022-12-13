import React from 'react'
import "./routesection.css";
import { useNavigate } from 'react-router-dom';
export const RouteSection = ({path}) => {
    const navigate=useNavigate();
  return (
    <article className="route-section">
                <h2><span onClick={()=> navigate("/")}>Home/</span>{path}</h2>
            </article>
  )
}
