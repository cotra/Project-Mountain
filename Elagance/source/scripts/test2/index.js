import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './app'

render(
    <App />,
    document.getElementById('spa')
)


