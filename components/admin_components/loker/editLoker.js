import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditLoker() {
  const [loker, setLoker] = useState({});
  const [nama, setNama] = useState("");
  const [persyaratan, setPersyaratan] = useState("");
  const [previmage, setPrevImage] = useState();
  const [image, setImage] = useState(previmage);
  const [loading, setLoading] = useState(false);
  const [mitra, setMitra] = useState([]);
  const [selectedMitra, setSelectedMitra] = useState("-");
  const router = useRouter();
  console.log(loker.nama)
  console.log(previmage)
  const handleGetLoker = () => {
    setLoading(true);
    const { id } = router.query;
    fetch('/api/loker/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        setLoker(res.data);
        setNama(res.data.nama);
        setPersyaratan(res.data.persyaratan);
        setSelectedMitra(res.data.mitraId);
        setPrevImage(res.data.image);
        setLoading(false);
        setImage(res.data.image)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleClear = (e) => {
    e.preventDefault();
    setNama("");
    setPersyaratan("");
    setSelectedMitra("-");
    setImage(null);
    setPrevImage("");
  };
  const handleUpdateLoker = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", parseInt(router.query.id));
    formData.append("nama", nama);
    formData.append("persyaratan", persyaratan);
    formData.append("mitraId", selectedMitra);
    formData.append("image", image);
    fetch(`/api/loker/update`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Sukses",
            text: "Loker berhasil diperbarui!",
          });
          handleClear(e);
          router.back();
        } else {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Loker gagal diperbarui!",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Loker gagal diperbarui!",
        });
      });
  };
  const handleImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    // console.log(file)
    setImage(file);
    setPrevImage(URL.createObjectURL(file));
  };
  useEffect(() => {
    setTimeout(() => {
      handleGetLoker();
    }, 1000);
  }, [])
  return (
    <>
      <section className="trending-product section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Edit Loker</h2>
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
                        name="image"
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
                                disabled
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
                                onChange={(e) => setPersyaratan(e.target.value)}
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
                            onClick={handleUpdateLoker}
                          >
                            <i className="fas fa-edit"></i> Edit
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
