import Image from "next/image"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import useLoginStore from '../../../store/store'

export default function Navbar() {
  const setLogout = useLoginStore((state) => state.setLogout)
  const router = useRouter()
  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Apakah Anda yakin?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        setLogout()
        router.push('/login')
      }
    })
  }
  return (
    <nav className="main-header navbar navbar-expand navbar-dark bg-success">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
        </li>
      </ul>
    </nav>

  )
}