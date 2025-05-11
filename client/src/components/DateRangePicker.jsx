
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'
import './styles.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import * as Action from '../redux/actions/actions'


export default function Dates(){
//     const events = useSelector(state => state.eventosDb)
    const [order, setOrder] = useState('')

     const dispatch = useDispatch();

//    useEffect(() => {
//        dispatch(Action.getAllEvent())
//    }, [dispatch])

   
  function handleDate() {
   
    dispatch(Action.timeFilter())
    

   
  }

  
    return (

        <div className='dates'>
            <DateRangePicker onChange={handleDate}/>
        </div>
    )
}