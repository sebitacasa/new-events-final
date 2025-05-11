import axios from "axios";
export const GET_ALL_EVENTS_DB = "GET_ALL_EVENTS_DB";
export const CREATE_EVENT = "CREATE_EVENT";
export const GET_BY_TITLE = "GET_BY_TITLE";
export const GET_DETAIL = "GET_DETAIL";
export const BY_EVENT_TYPE = "BY_EVENT_TYPE";
export const GET_STATES = "GET_STATES";
export const UPDATE_USER = "UPDATE_USER";
export const FILTER_DATE = "FILTER_DATE";
export const GET_USER = "GET_USER";
export const CREATE_USER = "CREATE_USER";
export const GET_ALL_CITIES = "GET_ALL_CITIES";
export const GET_ALL_GENEROS = "GET_ALL_GENEROS";
export const GET_USERS = "GET_USERS";
export const BAN_USER = "BAN_USER";
export const GET_TICKETS = "GET_TICKETS";
export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL";
export const GET_ALL_DATE = "GET_ALL_DATE";
export const FILTER_CALENDER = "FILTER_CALENDER";
export const CREATE_ORDER = "CREATE_ORDER";

export const GET_ALL_ORDERS = "GET_ALL_ORDERS"


export const FILTER_CALENDER_NUEVO = "FILTER_CALENDER_NUEVO"
export const ADD_REVIEWS = "ADD_REVIEWS"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const GET_REVIEWS = "GET_REVIEWS"
export const GET_EVENTS_CLIENT = "GET_EVENTS_CLIENT"



const API_URL = "http://localhost:3001";









export function getAllEvent() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/events/getAll`);
      console.log("✅ Data recibida del backend:", json.data)
      return dispatch({
        type: GET_ALL_EVENTS_DB,
        payload: json.data,
        
      });
    } catch (err) {
      console.log(err);
    }
  };
}
// PARA EL CALENDARIO ---------------------------------------------------------------------
export function getAllDate() {
  //ME TRAE UN ARRAY CON LAS FECHAS DE LOS EVENTOS
  return async function (dispatch) {
    try {
      const date = await axios.get("http://localhost:3001/events/getDates/");
      return dispatch({
        type: GET_ALL_DATE,
        payload: date.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function FilterCalender(payload) {
  //PARA FILTRAR LOS EVENTOS POR UNA FECHA EN PARTICULAR
  return {
    type: FILTER_CALENDER,
    payload,
  };
}

export function FilterCalenderNuevo(payload){ //PARA FILTRAR LOS EVENTOS POR UN RANGO DE FECHAS
  return{
    type: FILTER_CALENDER_NUEVO,
    payload,
  };
}
// --------------------------------------------------------------------------------------------
export function getAllCities() {
  return async function (dispatch) {
    try {
      const cities = await axios.get(`${API_URL}/events/solocitys`);
      return dispatch({
        type: GET_ALL_CITIES,
        payload: cities.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getAllGeneros() {
  return async function (dispatch) {
    try {
      const generos = await axios.get(`${API_URL}/events/sologeneros`);
      return dispatch({
        type: GET_ALL_GENEROS,
        payload: generos.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function createEvent(payload) {
  
  return async (dispatch) => {
    try {
      const json = await axios.post(`${API_URL}/events/createEvent/`, payload);
      return dispatch({
        type: CREATE_EVENT,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getByTitle(title) {
  return async (dispatch) => {
    let obtener = await axios.get(`${API_URL}/events/getTitle?title=${title}`);
    return dispatch({
      type: GET_BY_TITLE,
      payload: obtener.data,
    });
  };
}

export function getDetail(id) {
  return async (dispatch) => {
    let json = await axios.get(`${API_URL}/events/` + id);

    return dispatch({
      type: GET_DETAIL,
      payload: json.data,
    });
  };
}

//filtar por tipo de evento
export function byEventType(payload) {
  return {
    type: BY_EVENT_TYPE,
    payload,
  };
}

export function getState(payload) {
  return {
    type: GET_STATES,
    payload,
  };
}
export function createUser(payload, getAccessTokenSilently) {
  return async (dispatch) => {
    try {
      const token = await getAccessTokenSilently({
        audience: "https://underevents/api", // este debe coincidir con el backend
      });
     
      await fetch("http://localhost:3001/users/debug-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   
      const json = await axios.post(
        `${API_URL}/users/createUser`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     

      return dispatch({
        type: CREATE_USER,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserByExternalId(externalId) {
  return async (dispatch) => {
    let json = await axios.get(`${API_URL}/users/${externalId}`);
    return dispatch({
      type: GET_USER,
      payload: json.data,
    });
  };
}

export function updateUser(payload, externalId) {
  return async (dispatch) => {
    try {
      const json = await axios.put(`${API_URL}/users/${externalId}`, payload);
      return dispatch({
        type: UPDATE_USER,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUsers() {
  return async (dispatch) => {
    let json = await axios.get(`${API_URL}/users`);
    console.log(json.data);
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    });
  };
}

export function banUser(externalId, block) {
  return async (dispatch) => {
    try {
      const json = await axios.post(`${API_URL}/users/ban`, {
        externalId,
        block,
      });

      return dispatch({
        type: BAN_USER,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function byFilterDate(payload) {
  return {
    type: FILTER_DATE,
    payload,
  };
}

export function getTickets(id) {
  return async (dispatch) => {
    let json = await axios.get(`${API_URL}/events/getTiketsDisponibles/${id}`);

    return dispatch({
      type: GET_TICKETS,
      payload: json.data,
    });
  };
}
// RUTA PARA TRAERME EL ORDEL DETAIL DE UN EVENTO
export function getOrderDetail(id) {
  return async (dispatch) => {
    let json = await axios.get(`${API_URL}/users/getOrder${id}`);
    return dispatch({
      type: GET_ORDER_DETAIL,
      payload: json.data,
    });
  };
}

export function createOrder(payload) {
  return async (dispatch) => {
    try {
      const json = await axios.post(`${API_URL}/users/newOrder`, payload);
      return dispatch({
        type: CREATE_ORDER,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };


}




// RUTA QUE ME TRAE TODAS LAS ORDENES HECHAS (PARA METRICAS)






export function getAllOrders() {
  return async function (dispatch) {
    try {
      const orders = await axios.get(
        "http://localhost:3001/users/getAllOrders"
      );
      return dispatch({
        type: GET_ALL_ORDERS,
        payload: orders.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

}



export function addReviews(payload, id) {
  return async (dispatch) => {
    try {
      const json = await axios.post(
        `http://localhost:3001/users/createReview/${id}/`, 
        payload
      );
      return dispatch({
        type: ADD_REVIEWS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };


}

export function getReviews(id) {
  return async function (dispatch) {
    try {
      const orders = await axios.get(
        `http://localhost:3001/users/getReviews/${id}/`
      );
      return dispatch({
        type: GET_REVIEWS,
        payload: orders.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

}

export function detailClean (){
  return{
      type:CLEAN_DETAIL
  }
}



export function getEventClient(id) {
  return async function (dispatch) {
    try {
      const events = await axios.get(
        `http://localhost:3001/events/eventclient/${id}/`
      );
      return dispatch({
        type: GET_EVENTS_CLIENT,
        payload: events.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

}


export function putEventClient(id, payload) {
  return async function () {
    try {
       await axios.put( `http://localhost:3001/events/putEvent/${id}/`, payload);
     
    } catch (err) {
      console.log(err);
    }
  };

}