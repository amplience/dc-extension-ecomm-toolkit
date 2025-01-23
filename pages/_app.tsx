import '../styles/globals.css'
import dynamic from 'next/dynamic'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
   "fontFamily": `"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,   
  },
  palette:{
    primary:{
      main: '#0374dd',
      light: '#ecf1fc',
      dark: '#b4bef2'
    },
    secondary:{
      main: '#ecf1fc',
      light: '#ecf1fc',
      dark: '#b4bef2'
    }
  }
});

// import App from '../components/multi-select'

const App = dynamic(
  () => import('../components/multi-select'),
  { ssr: false }
)

function MyApp({ Component, pageProps }) {
  return <>
  <ThemeProvider theme={theme}>
    <App {...pageProps}>
      <Component {...pageProps} />
    </App>
  </ThemeProvider>
  </>
}

export default MyApp
