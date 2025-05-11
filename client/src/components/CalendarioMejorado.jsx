import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import es from "date-fns/locale/es";
import { useDispatch, useSelector } from "react-redux";
import { getAllDate, FilterCalenderNuevo } from "../redux/actions/actions"
import "./CalendarioMejodaro.css"



function CalendarioMejorado() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDate())
    },[dispatch])


    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);


        var fechaInicio = new Date(formatDate(start));
        var fechaFin = new Date(formatDate(end));

        console.log(fechaInicio, "fecha inicio")
        console.log(fechaFin, "fecha final")

        var coleccion = []

        while (fechaFin.getTime() >= fechaInicio.getTime()) {
            fechaInicio.setDate(fechaInicio.getDate() + 1);
    
            coleccion.push(('0' + fechaInicio.getDate()).slice(-2) + '-' + ('0' + (fechaInicio.getMonth() + 1)).slice(-2) + '-' + fechaInicio.getFullYear())
        }



        /* console.log(coleccion) */

        dispatch(FilterCalenderNuevo(coleccion))

        /* console.log(coleccion, "soy lo que sale de calendario mejorado") */

        
    };

    // funcion que me trae las cosas entre dos fechas--------------------------------------------
    /* var fechaInicio = new Date('2017-12-20');
    var fechaFin = new Date('2018-01-28');

    while (fechaFin.getTime() >= fechaInicio.getTime()) {
        fechaInicio.setDate(fechaInicio.getDate() + 1);

        console.log(fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getDate());
    } */
    // ------------------------------------------------------------------------------------------


    return (
        <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            /* excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]} */
            selectsRange
            selectsDisabledDaysInRange
            inline
        />
    );
};

export default CalendarioMejorado;