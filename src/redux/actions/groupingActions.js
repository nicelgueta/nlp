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
