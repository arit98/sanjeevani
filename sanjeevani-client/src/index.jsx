import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { StateProvider } from './context/StateProvider'
import { initialState } from './context/initialState'
import reducer from './context/reducer'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

const root = createRoot(document.querySelector('#root'))
root.render(
    <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </Router>
)

reportWebVitals();