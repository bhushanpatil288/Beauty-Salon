import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/layout/ThemeProvider.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="app-ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
