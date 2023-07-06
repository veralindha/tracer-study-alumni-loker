import { useState } from "react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

export default function UploadComponent() {
  const [parsedData, setParsedData] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [filename, setFilename] = useState("");

  const handleUpload = (event) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Pilih file untuk diunggah!");
      }
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      setFilename(file.name);
      console.log(fileExt);

      const reader = new FileReader();
      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 0) {
          const headers = jsonData[0];
          const parsedData = jsonData.slice(1).map((row) => {
            return headers.reduce((obj, header, index) => {
              obj[header] = String(row[index]);
              return obj;
            }, {});
          });

          setParsedData({ data: parsedData });
        } else {
          throw new Error("File yang diunggah tidak memiliki data yang valid.");
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
      console.error(error);
    }
  };

  const handleImport = () => {
    const data = { alumnis: parsedData.data };
    setIsUploading(true);
    fetch("/api/importalumnis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Success", "Data berhasil diunggah!", "success");
        console.log(data);
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div>
                <div className="m-2">
                  Silahkan upload file data alumni dengan ekstensi file xlxs / csv
                </div>
                <div className="container-fluid">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      accept=".xlsx, .csv"
                      onChange={handleUpload}
                    />
                    <label className="custom-file-label" htmlFor="exampleInputFile">
                      {filename}
                    </label>
                  </div>
                  <div className="timeline-footer">
                    <button onClick={handleImport} className="btn btn-success btn-sm mb-2 mt-2">
                      <i className="fas fa-fw fa-upload"></i> Upload File
                    </button>
                    <div
                      className="spinner-border text-success float-right mb-2 mt-2"
                      role="status"
                      hidden={!isUploading}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
