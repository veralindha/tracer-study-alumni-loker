import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className='hold-transition sidebar-mini layout-fixed' style={{scrollBehavior: 'smooth'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}