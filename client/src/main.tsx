import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { QueryClient, QueryClientProvider,  } from 'react-query'

import { AuthContextProvider } from './Services/Context/AuthContextProvider.tsx'
import { AppContextProvider } from './Services/Context/AppContextPrivder.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <QueryClientProvider client={new QueryClient}>
    <AuthContextProvider>
    <AppContextProvider>
      <App  />
      <ToastContainer />

    </AppContextProvider>    
    </AuthContextProvider>
    </QueryClientProvider>
    </PersistGate>
  </Provider>
  </BrowserRouter>
  </React.StrictMode>,
)
