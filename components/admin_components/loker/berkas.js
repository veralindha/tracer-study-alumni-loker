import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from '../../../libs/cookies.lib';
import Link from "next/link";
import Swal from "sweetalert2";

function Conditional({ condition, children }) {
  return condition ? children : <></>;
}

export default function Berkas() {
  const [data, setData] = useState([]);
  const [lamaran, setLamaran] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [session, setSession] = useState({});
  const [idLoker, setIdLoker] = useState([])
  // console.log(session)
  // console.log(data)
  const router = useRouter();
  const { id } = router.query;
  const handleDetail = async (id) => {
    try {
      const res = await fetch(`/api/loker/${id}`);
      const json = await res.json();
      setData(json.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetLoker = (id) => {
    setLoading(true);
    if (id !== null) {
      fetch(`/api/loker/all?mitraId=${id}`, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message == "available") {
            console.log(res)
            setData(res.data);
            setLoading(false);
          } else {
            setData([]);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      fetch(`/api/loker/all`, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message == "available") {
            setData(res.data);
            setLoading(false);
          } else {
            setData([]);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }

  const handleUpdateButton = (id) => {
    // e.preventDefault
    fetch(`/api/loker/tombol?id=${id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          // setLoading(false);
          window.location.reload();
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Status gagal diperbaharui",
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Status gagal diperbaharui",
        });
      });
  };
  const handleGetTable = (id) => {
    setLoading(true);
    if (id !== null) {
      fetch(`/api/lamaran/all?lokerId=${id}`, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message == "available") {
            setLamaran(res.data);
            setLoading(false);
          } else {
            setData([]);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      fetch(`api/lamaran/all`, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message == "available") {
            setLamaran(res.data);
            setLoading(false);
          } else {
            setLamaran([]);
            setLoading(false);
          }
        })
    }
  }

  useEffect(() => {
    if (id) {
      handleDetail(id);
    }
    setTimeout(() => {
      setLoading(true);
      const session = getCookie('user');
      console.log(session)
      if (session) {
        const { role, id } = session;
        setRole(role);
        setSession(session);
        if (session.role === 'admin') { handleGetLoker(null) } else { handleGetLoker(id) };
      }
    }, 5000);
  }, []);

  useEffect(() => {
    setIdLoker(data.id);
    if (idLoker === null) {
      handleGetTable(null);
    } else {
      handleGetTable(idLoker)
    }

  }, [])
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-title">
            <h2>Berkas</h2>
          </div>
        </div>
      </div>
      <Conditional condition={role === "admin"}>
        {data.length > 0 ? data.map((loker, index) => {
          const filteredLamaran = lamaran.filter(item => item.lokerId === loker.id);
          return (
            <div key={index} className="card p-2">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="product-image">
                    <Image
                      src={loker.image}
                      className="h-auto w-auto"
                      width={300}
                      height={300}
                      alt="#"
                    />
                  </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12">
                  <div className="product-info" >
                    <button hidden={session.role !== 'mitra' ? true : false} type="button" disabled={loker.tombol === 'enable' ? true : false} className="btn btn-success mr-1">
                      <i className="fas fa-fw fa-check"></i> Enable
                    </button>
                    <button hidden={session.role !== 'mitra' ? true : false} type="button" disabled={loker.tombol === 'enable' ? false : true} className="btn btn-secondary">
                      <i className="fas fa-fw fa-times"></i> Disable
                    </button>
                    <h4>{loker.nama}</h4>
                    <h5 className="text-primary">{session.username}</h5>
                    <Link href={`/admin-pages/loker/editloker?id=${loker.id}`}>[edit]</Link>
                    <p className="text-dark text-bold">Persyaratan</p>
                    <span className="category m-2">
                      {loker.persyaratan}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Tabel Berkas</h3>
                      <div className="card-tools">
                        <div
                          className="input-group input-group-sm"
                          style={{ width: 150 }}
                        >
                          <input
                            type="text"
                            name="table_search"
                            className="form-control float-right"
                            placeholder="Search"
                          />
                          <div className="input-group-append">
                            <button type="submit" className="btn btn-default">
                              <i className="fas fa-search" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body table-responsive p-0">
                      <table className="table table-hover text-nowrap">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama File</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLamaran.length > 0 ? filteredLamaran.map((item, idx) => (
                            <tr key={idx}>
                              <td style={{ width: "20px" }}>{idx + 1}</td>
                              <td>
                                {item.berkas} [<a href={item.berkas}>download</a>]
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan="2">No data found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                </div>
              </div>
            </div>
          )
        }) : <></>}
      </Conditional>
      <Conditional condition={role === "mitra"}>
        {data.length > 0 ? data.map((loker, index) => {
          // Filter lamaran array based on loker ID
          const filteredLamaran = lamaran.filter(item => item.lokerId === loker.id);

          return (
            <div key={index} className="card p-2">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="product-image">
                    <Image
                      src={loker.image}
                      className="h-auto w-auto"
                      width={200}
                      height={200}
                      alt="#"
                    />
                  </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12">
                  <div className="product-info">
                    <button type="button" onClick={() => handleUpdateButton(loker.id)} disabled={loker.tombol === 'enable' ? true : false} className="btn btn-success mr-1">
                      <i className="fas fa-fw fa-check"></i> Enable
                    </button>
                    <button type="button" onClick={() => handleUpdateButton(loker.id)} disabled={loker.tombol === 'enable' ? false : true} className="btn btn-secondary">
                      <i className="fas fa-fw fa-times"></i> Disable
                    </button>
                    <h4>{loker.nama}</h4>
                    <h5 className="text-primary">{session.username}</h5>
                    <Link href={`/admin-pages/loker/editloker?id=${loker.id}`}>[edit]</Link>
                    <p className="text-dark text-bold">Persyaratan</p>
                    <span className="category m-2">
                      {loker.persyaratan}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Tabel Berkas</h3>
                      <div className="card-tools">
                        <div
                          className="input-group input-group-sm"
                          style={{ width: 150 }}
                        >
                          <input
                            type="text"
                            name="table_search"
                            className="form-control float-right"
                            placeholder="Search"
                          />
                          <div className="input-group-append">
                            <button type="submit" className="btn btn-default">
                              <i className="fas fa-search" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body table-responsive p-0">
                      <table className="table table-hover text-nowrap">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama File</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLamaran.length > 0 ? filteredLamaran.map((item, idx) => (
                            <tr key={idx}>
                              <td style={{ width: "20px" }}>{idx + 1}</td>
                              <td>
                                {item.berkas} [<a href={item.berkas}>download</a>]
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan="2">No data found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                </div>
              </div>
            </div>
          );
        }) : <></>}
      </Conditional>

      <Conditional condition={role === "alumni"}>

      </Conditional>
    </div>
  );
}
