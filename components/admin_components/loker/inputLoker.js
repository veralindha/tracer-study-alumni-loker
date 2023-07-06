import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function InputLoker() {
  const [nama, setNama] = useState("");
  const [persyaratan, setPersyaratan] = useState("");
  const [previmage, setPrevImage] = useState("/dist/img/LogoIndomaret.png");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mitra, setMitra] = useState([]);
  const [selectedMitra, setSelectedMitra] = useState("-");
  const handleGetMitra = () => {
    fetch("/api/user/all?role=mitra", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((res) => {
        setMitra(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleClear = (e) => {
    e.preventDefault();
    setNama("");
    setPersyaratan("");
    setSelectedMitra("-");
    setImage(null);
    setPrevImage("/dist/img/LogoIndomaret.png");
  };
  const handleCreateLoker = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("persyaratan", persyaratan);
    formData.append("mitraId", selectedMitra);
    formData.append("image", image);
    fetch("/api/loker/create", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Sukses",
            text: "Loker berhasil ditambahkan",
          });
          handleClear(e);
        } else {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Loker gagal ditambahkan",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Loker gagal ditambahkan",
        });
      });

  };
  const handleImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    setPrevImage(URL.createObjectURL(file));
  };
  useEffect(() => {
    handleGetMitra();
  }, [])
  return (
    <>
      <section className="trending-product section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Input Loker</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* Start Single Product */}
              <div className="single-product">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="product-image">
                      <Image
                        src={previmage}
                        className="h-auto w-auto"
                        width={300}
                        height={300}
                        alt="#"
                        id="loker-image-preview"
                      />
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="source"
                        name="source"
                        onChange={(e) => handleImage(e)}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose file
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="product-info">
                      <div className="author-box-name">
                        <div className="form-group">
                          <div className="form-row">
                            <div className="form-group col-12">
                              <label>Nama Loker</label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Masukan nama loker bagian misal : admin kantor"
                                value={nama}
                                onChange={(e) =>
                                  setNama(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-12">
                              <label>Nama Mitra</label>
                              <select
                                className="form-control form-control-sm"
                                value={selectedMitra}
                                onChange={(e) => setSelectedMitra(e.target.value)}
                              >
                                <option value="-">
                                  Pilih...
                                </option>
                                {mitra.length > 0 ? mitra.map((item, index) => (
                                  <option key={index} value={item.id}>{item.name}</option>
                                )) : null}
                              </select>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-sm-12">
                              <label>Persyaratan</label>
                              <textarea
                                className="form-control"
                                value={persyaratan}
                                onChange={(e) => setPersyaratan(e.target.value.replace(/\n/g, ';'))}
                                placeholder="Masukan Persyaratan Loker"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 mt-3">
                        <div className="row float-right">
                          <button
                            className="btn btn-success"
                            onClick={handleCreateLoker}
                          >
                            <i className="fas fa-plus fa-fw"></i> Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Product */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
