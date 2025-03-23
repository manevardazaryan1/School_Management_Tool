//  * index
//  *
//  * This file is the entry point of the React application. It renders the App component
//  * within a React StrictMode, wrapped in ApolloProvider, Provider (Redux), and ThemeProvider (Material-UI).
//  * It also initializes the Apollo Client, Redux store, and Material-UI theme.
//  *

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import client from "./apollo"
import store from "./redux/store"
import { ApolloProvider } from "@apollo/client"
import { Provider } from "react-redux"
import { ThemeProvider} from "@mui/material"
import { theme } from "./schema/theme"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
      <ThemeProvider theme={theme}> 
          <App />
        </ThemeProvider>
      </Provider> 
    </ApolloProvider>
  </React.StrictMode>
)

reportWebVitals()
