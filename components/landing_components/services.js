export default function Services() {
  return (
    <section id="services" className="services section-bg">
      <div className="container">
        <div className="section-title">
          <h2>Alur Pengisian</h2>
          <p>Lakukan pengisian data sesuai dengan alur dibawah.</p>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="icon-box">
              <div className="icon"><i className="bi bi-cash-stack" style={{ color: '#ff689b' }} /></div>
              <h4 className="title"><a href='#'>Login</a></h4>
              <p className="description">Login pada tombol login diatas sesuai dengan user password yang diberikan.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="icon-box">
              <div className="icon"><i className="bi bi-calendar4-week" style={{ color: '#e9bf06' }} /></div>
              <h4 className="title"><a href='#'>Isi Data</a></h4>
              <p className="description">Isikan data jawaban yang tepat sesuai pertanyaan pada aplikasi.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-wow-delay="0.1s">
            <div className="icon-box">
              <div className="icon"><i className="bi bi-chat-text" style={{ color: '#3fcdc7' }} /></div>
              <h4 className="title"><a href='#'>Logout</a></h4>
              <p className="description">Logout aplikasi untuk mengamankan data anda. </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}