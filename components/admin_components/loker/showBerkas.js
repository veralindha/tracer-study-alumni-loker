import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TableBerkas() {
  const [data, setData] = useState({});
  const [mitra, setMitra] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const handleDetail = async (id) => {
    try {
      const res = await fetch(`/api/loker/${id}`);
      const json = await res.json();
      const resMitra = await fetch(`/api/user/${json.data.mitraId}`);
      const jsonMitra = await resMitra.json();
      setData(json.data);
      setMitra(jsonMitra.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (id) handleDetail(id);
    }, 1000);
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-title">
            <h2>Upload Berkas</h2>
          </div>
        </div>
      </div>
      <div className="coontainer m-4">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="product-image">
              <Image
                src={data.image}
                className="h-auto w-auto"
                width={300}
                height={300}
                alt="#"
              />
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="product-info">
              <h4>{data.nama}</h4>
              <h5 className="text-primary">{mitra.name}</h5>
              <p className="text-dark text-bold">Persyaratan</p>
              <span className="category m-2">
                {data.persyaratan}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
