import Script from 'next/script'

export default function Scripts() {
  return (
    <>
      <Script defer src="/dist/js/bootstrap.bundle.min.js"></Script>
      {/* <Script defer src="/dist/js/main.js"/> */}
      <Script defer src="/dist/js/purecounter_vanilla.js"/>
      <Script defer src="/dist/js/isotope.pkgd.min.js"/>
      <Script defer src="/dist/js/glightbox.min.js"/>
    </>
  )
}