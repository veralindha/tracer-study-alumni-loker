import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getCookie, removeCookie } from "../../../libs/cookies.lib"
import useLoginStore from "../../../store/store"

export default function Sidebar({ isActiveNavItem = 0, activeUser = '' }) {
  const [user, setUser] = useState({})
  const router = useRouter()

  const handleLogout = () => {
    Swal.fire({
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Keluar',
      text: 'Yakin keluar?',
      icon: 'question'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        removeCookie('user')
        router.push('/')
      }
    })
  }

  useEffect(() => {
    setUser(getCookie('user'))
    user == {} ? router.push('/login_admin') : null
  }, [])
  return (
    <aside className="main-sidebar sidebar-light-success elevation-4">
      {/* Brand Logo */}
      <Link href="/admin-pages/admin" className="brand-link text-center">
        <div className="font-weight-bold">Tracer Study</div>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item" >
              <Link href={`/${user.role === 'alumni' ? 'alumni': 'admin-pages'}/profile`} className={`nav-link ${isActiveNavItem == 0 ? ' active' : ''}`}>
                <i className="nav-icon fas fa-user" />
                <p>
                  Profile
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={user.role === 'alumni' || user.role === 'mitra'? true : false}>
              <Link href="/admin-pages/admin" className={`nav-link ${isActiveNavItem == 1 ? ' active' : ''}`}>
                <i className="nav-icon fas fa-home" />
                <p>
                  Dashboard
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={user.role === 'admin' ? false : true}>
              <Link href="/admin-pages/tambah-user-admin" className={`nav-link ${isActiveNavItem == 2 ? ' active' : ''}`}>
                <i className="nav-icon fas fa-users-cog" />
                <p>
                  Tambah User Admin
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={user.role === 'admin'? false : true}>
              <Link href="/admin-pages/upload" className={`nav-link ${isActiveNavItem == 3 ? ' active' : ''}`}>
                <i className="nav-icon fas fa-upload" />
                <p>
                  Upload Data
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={user.role === 'alumni' || user.role === 'mitra'? true : false}>
              <Link href="/admin-pages/alumni" className={`nav-link ${isActiveNavItem == 4 ? ' active' : ''}`}>
                <i className="nav-icon fas fa-clock" />
                <p>
                  Data Tracer Alumni
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={user.role === 'alumni' ? false : true}>
              <Link href={`/alumni/questioner`} className={`nav-link ${isActiveNavItem == 5 ? ' active' : ''}`}>
                <i className="nav-icon fas fa-question" />
                <p>
                  Kuisioner
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={user.role === 'admin' || user.role === 'alumni' ? false : true}>
              <Link href={`/admin-pages/loker`} className={`nav-link ${isActiveNavItem == 6 ? ' active' : ''}`}>
                <i className="nav-icon fas fa-info" />
                <p>
                  Info Loker
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={user.role === 'mitra' ? false : true}>
              <Link href={`/admin-pages/berkas`} className={`nav-link ${isActiveNavItem == 7 ? ' active' : ''}`}>
                <i className="nav-icon fas fa-sticky-note" />
                <p>
                  Berkas Lamaran
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={user.role === 'admin' ? false : true}>
              <Link href={`/admin-pages/statistik`} className={`nav-link ${isActiveNavItem == 8 ? ' active' : ''}`}>
                <i className="nav-icon fas fa-sort-amount-up" />
                <p>
                  Statistik Loker
                </p>
              </Link>
            </li>
            <li className="nav-item" onClick={() => handleLogout()}>
              <Link href="#" className='nav-link text-danger'>
                <i className="nav-icon fas fa-sign-out-alt" />
                <p>
                  Keluar
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>

  )
}