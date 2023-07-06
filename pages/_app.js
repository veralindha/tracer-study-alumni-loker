import '../public/dist/css/glightbox.min.css'
import '../public/dist/css/style.css'
import '../public/dist/css/adminlte.min.css'
import '../public/dist/css/signin.css'
import '../public/plugins/fontawesome-free/css/all.min.css'
import '../public/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import '../public/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import '../public/dist/css/bootstrap-icons.css'
import '../public/dist/css/bootstrap.css'
import '../public/dist/css/main.css'
import '../public/dist/css/dropzone.css'
import '../public/dist/css/boxicons.min.css'
import { Source_Sans_Pro } from '@next/font/google'
import { CookiesProvider } from 'react-cookie'



const SourceSansPro = Source_Sans_Pro({
  weight: ['300', '400', '700']
});

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <main className={SourceSansPro.className}>
        <Component {...pageProps} />
      </main>
    </CookiesProvider>
  )
}

export default MyApp
