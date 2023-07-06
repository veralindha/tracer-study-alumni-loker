import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { supabase } from "../../../libs/supabase.lib"
import Card from "../utils/card"

export default function TambahDataUsers() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const clearInput = () => {
    setUsername('')
    setPassword('')
    setRole('-')
  }
  const handleCreateUser = async (e) => {
    e.preventDefault()
    const createdata = {
      name: username, 
      username: username,
      password: password,
      role: role
    }
    fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createdata)
    })
      .then(response => response.json())
      .then(data => {
        Swal.fire('Success', data.message, 'info')
        clearInput()
      })
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <Card cardTitle="User" cardIcon="fa-user">
      <div className="container-fluid">
        <form onSubmit={handleCreateUser}>
          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <div>
                  <label htmlFor="exampleInputName1">Username</label>
                  <input type="text" className="form-control form-control-sm text-left" id="exampleInputName1" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <label htmlFor="exampleInputName2">Password</label>
                  <input type="password" className="form-control form-control-sm text-left" id="exampleInputName2" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <label htmlFor="exampleInputName3">Role</label>
                  <select className="form-control form-control-sm" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="-">Pilih...</option>
                    <option value="admin">Admin</option>
                    <option value="kabag">Kabag</option>
                    <option value="mitra">Mitra</option>
                    <option value="alumni">Alumni</option>
                    <option value="ketua_alumni">Ketua Alumni</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row float-right">
            <button className="btn btn-success"><i className="fas fa-plus fa-fw"></i> Tambah</button>
          </div>
        </form>
      </div>
    </Card>
  )
}