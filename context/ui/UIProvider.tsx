import React, { FC, ReactNode, useReducer } from 'react'
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';

export interface UIState{
    sidemenuOpen: boolean; 
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

interface Props{
children: ReactNode
}

export const UIProvider: FC<Props> = ({children}) => {

const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)
// const [isAddingEntry, setIsAddingEntry] = useState(false);

const openSideMenu = () => {
  dispatch({type: 'UI - Open Sidebar'});
}

const closeSideMenu = () => {
  dispatch({type: 'UI - Close Sidebar'});
}

const setIsAddingEntry = (value: boolean) => {
  dispatch({type: 'UI - set isAddingEntry', payload: value});
}

const startDrawing = () => {
  dispatch({type: 'UI - Start Dragging'})
}

const endDrawing = () => {
  dispatch({type: 'UI - End Dragging'})
}

return (
   <UIContext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,

      startDrawing,
      endDrawing
   }}>
      { children }
  </UIContext.Provider>
)
}

