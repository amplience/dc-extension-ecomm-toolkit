import '../styles/globals.css'
import dynamic from 'next/dynamic'

// import App from '../components/multi-select'

const App = dynamic(
  () => import('../components/multi-select'),
  { ssr: false }
)

function MyApp({ Component, pageProps }) {
  return <>
    <App {...pageProps}>
      <Component {...pageProps} />
    </App>
  </>
}

export default MyApp
