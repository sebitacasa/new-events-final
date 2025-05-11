import * as Action from "../actions/actions.jsx";
const InitialState = {
  eventosDb: [],

  eventosBack: [],

  detailEventos: {},

  allEventType: [],

  filterTime: [],

  allEventState: [],

  userLoged: {},

  users: [],

  cart: [],

  allCities: [],

  allGeneros: [],

  tickets: [],

  orderDetail: {},

  orderCreated: {},

  allDateEvents: [], //ME GUARDA UN ARRAY CON LOS FECHAS DE LOS EVENTOS EN STRING

  allOrders: [],

  reviews: [],

  eventClient: []
};

function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case Action.GET_ALL_EVENTS_DB:
      return {
        ...state,
        eventosBack: action.payload,
        eventosDb: action.payload,
        allEventType: action.payload,
        allEventState: action.payload,
        filterDate: action.payload,
      };
    // PARA EL CALENDARIO ------------------------------------------------------
    case Action.GET_ALL_DATE:
      return {
        ...state,
        allDateEvents: action.payload,
      };

    case Action.FILTER_CALENDER:
      const eventitos = state.allEventState;
      const FilterEventitos =
        action.payload === "All"
          ? eventitos
          : eventitos.filter((g) => g.date === action.payload);
      return {
        ...state,
        eventosDb: FilterEventitos,
      };

    case Action.FILTER_CALENDER_NUEVO: // para el calendario nuevo (filtra un rango de fechas)
      const eventitosNuevo = state.allEventState;

      let coleccion = [];

      for (let i = 0; i < eventitosNuevo.length; i++) {
        /* console.log(eventitosNuevo,"soy eventito nuevo") */
        for (let j = 0; j < action.payload.length; j++) {
          /* console.log(action.payload, "soy el action payload") */
          if (eventitosNuevo[i].date === action.payload[j]) {
            coleccion.push(eventitosNuevo[i]);
          }
        }
      }
      return {
        ...state,
        eventosDb: coleccion,
      };

    // --------------------------------------------------------------------------
    case Action.GET_ALL_CITIES:
      return {
        ...state,
        allCities: action.payload,
      };
    case Action.GET_ALL_GENEROS:
      return {
        ...state,
        allGeneros: action.payload,
      };
    case Action.CREATE_EVENT:
      return {
        ...state,
      };

    case Action.GET_DETAIL:
      return {
        ...state,
        detailEventos: action.payload,
      };
    case Action.GET_BY_TITLE:
      return {
        ...state,
        eventosDb: action.payload,
      };

    case Action.GET_STATES:
      const allState = state.allEventState;
      const stateFilter =
        action.payload === "All"
          ? allState
          : allState.filter((g) => g.city === action.payload);
      return {
        ...state,

        eventosDb: stateFilter,
      };

    case Action.BY_EVENT_TYPE:
      const allType = state.allEventType;
      const typeFilter =
        action.payload === "All"
          ? allType
          : allType.filter((g) => g.genero === action.payload);
      return {
        ...state,

        eventosBack: typeFilter,
        eventosDb: typeFilter,
      };

    case Action.GET_USER:
      return {
        ...state,
        userLoged: action.payload,
      };

    case Action.CREATE_USER:
      return {
        ...state,
        userLoged: action.payload,
      };

    case Action.UPDATE_USER:
      return {
        ...state,
      };

    case Action.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case Action.FILTER_DATE:
      const allDate = state.eventosBack;
      const dateFilter =
        action.payload === "All"
          ? allDate
          : allDate.filter((g) => g.month === action.payload);
      /* console.log("filtradoMeses", dateFilter); */
      return {
        ...state,

        eventosDb: dateFilter,
      };

    case Action.BAN_USER:
      return {
        ...state,
      };
    case Action.GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };
    case Action.GET_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: action.payload,
      };

    case Action.CREATE_ORDER:
      return {
        ...state,
        orderDetail: action.payload,
      };

    //PARA LAS METRICAS------------------------------------------------------------------

    case Action.GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };
    //-----------------------------------------------------------------------------------

    case Action.ADD_REVIEWS:
      return {
        ...state,
      };

    case Action.CLEAN_DETAIL:
      return {
        ...state,
        detailEventos: [],
      };

    case Action.GET_REVIEWS:
      
      return{
        ...state,
        reviews: action.payload
        
      }  

    case Action.GET_EVENTS_CLIENT:
      return{
        ...state,
        eventClient: action.payload
      }  

    default:
      return {
        state,
      };
  }
}
export default rootReducer;
