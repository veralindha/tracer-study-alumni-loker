export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-6 d-flex justify-content-center video-box align-items-stretch position-relative">
            <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox play-btn mb-4" />
          </div>
          <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
            <h3>Tracer Study</h3>
            <p>Aplikasi ini bertujuan untuk mengidentifikasi profil alumni, mengetahui relevansi kurikulum yang diterapkan STIKOM PGRI Banyuwangi  dengan kebutuhan pasar kerja, dan mendapatkan gambaran kompetensi yang dibutuhkan pengguna Lulusan STIKOM PGRI Banyuwangi.</p>
            <div className="icon-box">
              <div className="icon"><i className="bx bx-fingerprint" /></div>
              <h4 className="title"><a href="">Data Alumni</a></h4>
              <p className="description">Real data alumni</p>
            </div>
            <div className="icon-box">
              <div className="icon"><i className="bx bx-paper-plane" /></div>
              <h4 className="title"><a href="">Data Tracer Alumni</a></h4>
              <p className="description">Real data tracer alumni lengkap</p>
            </div>
            <div className="icon-box">
              <div className="icon"><i className="bx bx-atom" /></div>
              <h4 className="title"><a href="">Cepat dan Akurat</a></h4>
              <p className="description">Cepat dan akurat sesuai dengan data alumni yang didapat</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}