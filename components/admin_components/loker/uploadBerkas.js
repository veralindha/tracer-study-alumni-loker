import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { getCookie } from '../../../libs/cookies.lib';
import Swal from "sweetalert2";

export default function UploadBerkas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [berkas, setBerkas] = useState(null);
  const [session, setSession] = useState({});
  console.log(session)
  const router = useRouter();
  const { id } = router.query;
  const handleDetail = async (id) => {
    try {
      const res = await fetch(`/api/loker/${id}`);
      const json = await res.json();
      setData(json.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
  const handleUploadBerkas = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBerkas(file);
  }
  const handleCreateUploadBerkas = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append('berkas', berkas);
      formData.append('lokerId', data.id);
      formData.append('alumnisId', session.id);
      const res = await fetch('/api/lamaran/create', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Berkas berhasil diunggah!",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const session = getCookie('user');
    if (session) {
      setSession(session);
    }
    setTimeout(() => {
      if (id) handleDetail(id);
    }, 1000);
  }, [id]);

  return (
    <>
      {session.role === 'mitra' ?
        "" : 
        <div className="container">
          <div className="row">
            <div className="card-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div>
                        <div className="m-2">
                          Silahkan upload file Lamaran / CV dengan format nama file [namalengkap_mitra]
                        </div>
                        <div className="container-fluid">
                          <div className="custom-file">
                            <input type="file" className="custom-file-input" accept="csv/*"
                              onChange={(e) => handleUploadBerkas(e)}
                            />
                            <label className="custom-file-label" htmlFor="exampleInputFile">Choose File</label>
                          </div>
                          <div className="timeline-footer">
                            <button className="btn btn-success btn-sm mb-2 mt-2" onClick={handleCreateUploadBerkas}>
                              <i className="fas fa-fw fa-upload"></i> Upload File Lamaran
                            </button>
                            {loading ? (
                              <div className="spinner-border text-success float-right mb-2 mt-2" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : <></>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
