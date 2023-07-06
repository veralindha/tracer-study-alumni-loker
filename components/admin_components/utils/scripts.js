import Script from 'next/script'

export default function Scripts() {
  return (
    <>
      <Script defer src="/dist/js/jquery.min.js"></Script>
      {/* <!-- jQuery UI 1.11.4 --> */}
      {/* <Script defer src="/dist/js/jquery-ui.min.js"></Script> */}
      {/* <!-- Bootstrap 4 --> */}
      <Script defer src="/dist/js/bootstrap.bundle.js"></Script>
      {/* <!-- AdminLTE App --> */}
      <Script defer src="/dist/js/adminlte.js"/>
      {/* <!-- Sparkline --> */}
      <Script defer src="/dist/js/sparkline.js"/>
      {/* <Script defer src="/dist/js/dropzone.js"/> */}
      {/* <Script defer src="/dist/js/multiple-upload.js"/> */}
    </>
  )
}