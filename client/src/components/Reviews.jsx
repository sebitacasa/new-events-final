import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../redux/actions/actions";


export default function Reviews () {
    let id = JSON.parse(window.localStorage.getItem('id'))
    console.log(id, "id de reseñas")
    
        useEffect(()=>{
            dispatch(getReviews(id))
        }, [dispatch])
    
    const detalles = useSelector(state => state.detailReviews)
    const detallitos = detalles.map(e => e)
    console.log(detallitos)
    const dispatch = useDispatch()
    console.log(detalles)

    return (
        <div>{ <h1>error</h1>}</div>
    )
}