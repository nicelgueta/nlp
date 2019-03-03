//actions
export function setViewerContent(html){
  return {
    type: 'SET_VIEWER_CONTENT',
    payload: html
  }
}

export function toggleWindow(){
  return {
    type: 'TOGGLE_WINDOW'
  }
}
export function callGroupApi(){
  return {
    type: 'CALL_GROUP_API'
  }
}
export function setGroupResponse(response){
  return {
    type: 'SET_GROUP_RESPONSE',
    payload: response
  }
}

export function setGroupError(body){
  return {
    type: 'SET_GROUP_ERROR',
    payload: body
  }
}

export function setUseCaseTitle(title){
  return {
    type: 'SET_USE_CASE_TITLE',
    payload: title
  }
}
