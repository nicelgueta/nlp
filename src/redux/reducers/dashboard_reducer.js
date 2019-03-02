

export default function dashboardReducer(state={
    activePage: 'Dashboard',
  }, action) {

    switch (action.type) {
      case "SET_PAGE": {
        return {...state, activePage: action.payload}
      }
      default:{
        return state
      }
    }
}
