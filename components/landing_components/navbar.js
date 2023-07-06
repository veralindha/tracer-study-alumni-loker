import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
export default function Navbar({ ...props }) {

  return (
    <>
      <div className={`${props.className}`} style={{ background: "#ffffff" }}>
        <div className="row p-2" style={{ background: "#49b5e7" }} >
          <div className="col">
            <div className="container text-light">
              <div className="row">
                <div className="col-9"><i className="bi bi-geo-alt"></i> Jl. Jendral A. Yani 80 Banyuwangi, 68450  <Link className="text-light" href={'mailto:pusatkarier@stikombanyuwangi.ac.id'}><i className="bi bi-envelope"></i> pusatkarier@stikombanyuwangi.ac.id</Link> </div>
                <div className="col-3">
                  <div className="d-flex justify-content-end">

                <Link className="col" href="/login_alumni"><button  className="btn btn-light">Login Alumni</button></Link>
                <Link className="col" href="/login_mitra"><button  className="btn btn-light">Login Mitra</button></Link>
                <Link className="col" href="/login_admin"><button  className="btn btn-light">Login Admin</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo"><Image src="/dist/img/logo-stikom.png" width={50} height={50} alt='' /></a>
          <nav id="navbar" className="navbar">
            <ul>
              <li><Link className="nav-link scrollto active" href="#hero" >Beranda</Link></li>
              <li><Link className="nav-link scrollto" href="#about" >Tentang</Link></li>
              <li><Link className="nav-link scrollto" href="#services" >Alur Pengisian</Link></li>
              <li><Link className="nav-link scrollto" href="#footer" >Kontak</Link></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" />
          </nav>
        </div>
      </div>
    </>

  )
}