import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import es from "date-fns/locale/es";
import { useDispatch, useSelector } from "react-redux";
import { getAllDate, FilterCalender } from "../redux/actions/actions"
import { UseDispatch } from "react-redux"

registerLocale("es", es);



function Calendario(/* { handleDate, detailsDates } */) {
	const [startDate, setStartDate] = useState();

    const dispatch = useDispatch()

    const date = useSelector(state => state.allDateEvents)
    /* console.log(date) */


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
	
		return [day,month,year].join('-');
	}

	
	 


    const handleClick = (date) => {
        dispatch(FilterCalender(formatDate(date)))
		console.log(formatDate(date), "soy el transformado");

    }
    

	
	return (
		<div>
			<DatePicker
				placeholderText={"Elegí fecha"}
				className="border-solid border-2 border-indigo-300"
				dateFormat={"dd/MM/yyyy"}
				selected={startDate}
				onChange={(date) => {setStartDate(date); handleClick(date)}}
				/* onClick={() => handleClick()} */
				locale="es"
				/* filterDate={isWeekday} */
				/* minDate={new Date()}
				maxDate={new Date().setMonth(
					new Date().getMonth() + 2
				)} */
				
			/>
		</div>
	);
}

export default Calendario;