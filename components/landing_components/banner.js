export default function Banner() {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1>Tracer Study Alumni</h1>
            <h2>
              Aplikasi Tracer Study alumni untuk memudahkan melacak aktivitas dan pekerjaan bagi alumni. login untuk mengisi data tracer.
            </h2>
            <div><a href="#about" className="btn-get-started scrollto">Get Started</a></div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img">
            <img src="assets/img/hero-img.png" className="img-fluid" alt='' />
          </div>
        </div>
      </div>
    </section>
  )
}