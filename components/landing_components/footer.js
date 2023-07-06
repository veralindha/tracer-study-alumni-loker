export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>Tracer Study</h3>
              <p>
              Stikom Banyuwangi Jl. Jendral A. Yani 80 Banyuwangi, 68450 <br /><br />
                <strong>Phone:</strong> +62 813-3625-0997<br />
                <strong>Email:</strong> pusatkarier@stikombanyuwangi.ac.id<br />
              </p>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Layanan Kami</h4>
              <ul>
                <li><i className="bx bx-chevron-right" /> <a href="#">Web Design</a></li>
                <li><i className="bx bx-chevron-right" /> <a href="#">Web Development</a></li>
                <li><i className="bx bx-chevron-right" /> <a href="#">Product Management</a></li>
                <li><i className="bx bx-chevron-right" /> <a href="#">Marketing</a></li>
                <li><i className="bx bx-chevron-right" /> <a href="#">Graphic Design</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Social Networks</h4>
              <p>Kungjungi sosial media kami</p>
              <div className="social-links mt-3">
                <a href="#" className="twitter"><i className="bx bxl-twitter" /></a>
                <a href="#" className="facebook"><i className="bx bxl-facebook" /></a>
                <a href="#" className="instagram"><i className="bx bxl-instagram" /></a>
                <a href="#" className="google-plus"><i className="bx bxl-skype" /></a>
                <a href="#" className="linkedin"><i className="bx bxl-linkedin" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}