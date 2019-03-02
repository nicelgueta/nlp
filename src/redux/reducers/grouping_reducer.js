

export default function groupingReducer(state={
    windowOpen: false,
    windowContent:null
  }, action) {

    switch (action.type) {
      case "SET_VIEWER_CONTENT": {
        return {...state, windowContent: action.payload}
      }
      case "TOGGLE_WINDOW":{
        return {...state, windowOpen:!state.windowOpen}
      }
    }

    return state
}
