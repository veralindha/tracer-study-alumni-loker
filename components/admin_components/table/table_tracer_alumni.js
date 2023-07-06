import { useEffect, useState } from "react";
import { supabase } from "../../../libs/supabase.lib";
import Question from "../questioner/question";
import QuestionNew from "../questioner/question_new";

export default function TableTracerAlumni() {
  const [dataAlumni, setDataAlumni] = useState([]);
  const [alumni, setAlumni] = useState("");
  const [search, setSearch] = useState("");
  const searcedData = dataAlumni.filter((alumnni) =>
    alumnni.nama.toLowerCase().includes(search.toLowerCase())
  );
  const fetchAlumnis = async () => {
    fetch("/api/getalumnis", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataAlumni(data.data);
      });
  };
  const handleShowDataAlumni = (id) => {};
  useEffect(() => {
    // fetchAlumnis();
    setTimeout(() => {
      fetchAlumnis();
      // setSession(getCookie("user"));
    }, 1000);
  }, []);
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tabel Tracer Alumni</h3>
                <a
                  type="button"
                  href="/admin-pages/alumni/tambahalumni"
                  className="btn btn-success ml-3"
                >
                  Tambah Alumni
                </a>
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
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
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
                      <th>No.</th>
                      <th>Nama</th>
                      <th className="text-center">NIM</th>
                      <th className="text-center">Angkatan</th>
                      <th className="text-center">Lulus</th>
                      <th className="text-center">Status Pengisian</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searcedData.length == 0 ? (
                      <tr className="text-center">
                        <td colSpan={7}>Data Alumni Kosong!</td>
                      </tr>
                    ) : (
                      searcedData.map((alumni, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{alumni.nama}</td>
                          <td className="text-center">{alumni.nim}</td>
                          <td className="text-center">{alumni.angkatan}</td>
                          <td className="text-center">{alumni.lulus}</td>
                          <td className="text-center">
                            <span
                              className={`badge badge-pill badge-${
                                alumni.tracered == "true"
                                  ? "success"
                                  : "warning"
                              }`}
                            >
                              {alumni.tracered == "true"
                                ? "Terisi"
                                : "Belum Mengisi"}
                            </span>
                          </td>
                          <td className="text-center">
                            <div>
                              {/* Button trigger modal */}
                              <button
                                id={`${alumni.nim}`}
                                onClick={() => setAlumni(`${alumni.nim}`)}
                                type="button"
                                className="btn btn-sm btn-success"
                                data-toggle="modal"
                                data-target="#detailData"
                              >
                                <i className="fas fa-info"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {/* Modal */}
                <div
                  className="modal fade"
                  id="detailData"
                  tabIndex={-1}
                  aria-labelledby="detailData"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Detail Data</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <QuestionNew idAlumni={alumni} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
        </div>
      </div>
    </div>
  );
}
