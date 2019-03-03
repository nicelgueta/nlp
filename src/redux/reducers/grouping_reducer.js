

export default function groupingReducer(state={
    windowOpen: false,
    windowContent:null,
    groupApiCalling:false,
    groupApiResponse:null,
    groupApiError:false,
    useCaseTitle:''
  }, action) {

    switch (action.type) {
      case "SET_VIEWER_CONTENT": {
        return {...state, windowContent: action.payload}
      }
      case "TOGGLE_WINDOW":{
        return {...state, windowOpen:!state.windowOpen}
      }
      case "CALL_GROUP_API":{
        return {...state, groupApiCalling:true,groupApiError:false,groupApiResponse:null}
      }
      case "SET_GROUP_RESPONSE":{
        return {...state, groupApiResponse:action.payload,groupApiCalling:false}
      }
      case "SET_GROUP_ERROR":{
        return {...state, groupApiError:true,groupApiCalling:false}
      }
      case "SET_USE_CASE_TITLE":{
        return {...state,useCaseTitle:action.payload}
      }
      default:{
        return state
      }
    }
}
