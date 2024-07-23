import React, { createContext, useContext, useReducer,useState } from 'react'

export const StateContext = createContext()



// const loginStatusData = {
//     loginStatus: loginStatus,
//     SetLoginStatus:SetLoginStatus
//   }

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)