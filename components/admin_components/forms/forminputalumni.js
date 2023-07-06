import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Card from "../utils/card";
import { useRouter } from "next/router";

export default function TambahDataUsers() {

  const [alumnis, setDataAlumnis] = useState({
    nim: '',
    no_ktp: '',
    npwp: '',
    nama_mhs: '',
    kelamin: '',
    angkatan: '',
    thn_lulus: '',
    alamat: '',
    tlp_saya: '',
    email: '',
    password: ''
  });
  const router = useRouter();



  const handleSaveChange = ({ target: { name, value } }) => {
    setDataAlumnis({ ...alumnis, [name]: value })
  }

  const handleCreateAlumni = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/importalumnis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ alumnis: [alumnis] })
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire("Success", data.message, "info");
        router.back();

      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "An error occurred. Please try again.", "error");
    }
  };
  // const [nik, setNik] = useState('');
  // const [npwp, setNpwp] = useState('');
  // const []

  return (
    <Card cardTitle="User" cardIcon="fa-user">
      <div className="container-fluid">
        <form onSubmit={handleCreateAlumni}>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <div>
                  <label htmlFor="NIM">NIM</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-left"
                    onChange={handleSaveChange}
                    name="nim"
                    value={alumnis.nim}
                    id="NIM"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label htmlFor="NIK">NIK</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-left"
                    onChange={handleSaveChange}
                    name="no_ktp"
                    value={alumnis.no_ktp}
                    id="NIK"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label htmlFor="NPWP">NPWP</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-left"
                    onChange={handleSaveChange}
                    name="npwp"
                    value={alumnis.npwp}
                    id="NPWP"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div>
                  <label htmlFor="Nama">Nama</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-left"
                    onChange={handleSaveChange}
                    name="nama_mhs"
                    value={alumnis.nama_mhs}
                    id="Nama"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label htmlFor="exampleInputName3">Gender</label>
                  <select className="form-control form-control-sm" onChange={handleSaveChange} name="kelamin" value={alumnis.kelamin}>
                    <option value="-">Pilih Gender..</option>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div>
                  <label htmlFor="Angkatan">Angkatan</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-left"
                    onChange={handleSaveChange}
                    name="angkatan"
                    value={alumnis.angkatan}
                    id="Angkatan"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div>
                  <label htmlFor="Lulus">Lulus</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-left"
                    onChange={handleSaveChange}
                    name="thn_lulus"
                    value={alumnis.thn_lulus}
                    id="Lulus"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-sm text-left"
                    onChange={handleSaveChange}
                    name="email"
                    value={alumnis.email}
                    id="Email"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label htmlFor="Password">Password</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-left"
                    id="Password"
                    onChange={handleSaveChange}
                    name="password"
                    value={alumnis.password}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label htmlFor="Telepon">Telepon</label>
                  <input
                    type="text"
                    className="form-control form-control-sm text-left"
                    onChange={handleSaveChange}
                    name="tlp_saya"
                    value={alumnis.tlp_saya}
                    id="Telepon"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div>
                  <label htmlFor="Alamat">Alamat</label>
                  <textarea
                    className="form-control form-control-sm text-left"
                    onChange={handleSaveChange}
                    name="alamat"
                    value={alumnis.alamat}
                    id="Alamat"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row float-right">
            <button className="btn btn-success" type="submit">
              <i className="fas fa-plus fa-fw"></i> Tambah
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}
