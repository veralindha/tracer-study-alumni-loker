import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getCookie } from "../../../libs/cookies.lib"

function QuestionCompleted() {
  return (
    <>
      <tr>
        <td colSpan={4}></td>
      </tr>
      <tr>
        <td className="text-center text-primary" colSpan={4}><h3>Anda telah mengisi kuisioner!</h3></td>
      </tr>
    </>
  )
}

function QuestionNotCompleted() {

}

export default function Question({ nim }) {
  const [alumni, setAlumni] = useState({})
  const [ans, setAns] = useState([])
  const [jawaban1, setJawaban1] = useState('')
  const [jawaban2, setJawaban2] = useState('')
  const [jawaban3, setJawaban3] = useState('')
  const [jawaban4, setJawaban4] = useState('')
  const [jawaban5, setJawaban5] = useState('')
  const [jawaban6, setJawaban6] = useState('')
  const [ansQ1, setAnsQ1] = useState(true)
  const [ansQ2, setAnsQ2] = useState(true)

  const handleGetAlumni = () => {
    fetch(`/api/alumni/${nim}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setAlumni(data.data)
      })
      .catch(err => {
        Swal.fire('Error', 'Gagal mengambil data dari server!', 'error')
        console.error(err)
      })
  }

  const handleGetAnswer = () => {
    fetch(`/api/answer/${alumni.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data)
        setAns(data.data.sort((a, b) => a.question_code.localeCompare(b.question_code)))
        setJawaban1(ans[0].answer)
        setJawaban2(ans[1].answer)
        setJawaban3(ans[2].answer)
        setJawaban4(ans[3].answer)
        setJawaban5(ans[4].answer)
        setJawaban6(ans[5].answer)
      })
      .catch(err => {
        Swal.fire('Gagal', 'Gagal memuat jawaban!', 'error');
        console.error(err)
      })
  }

  const handlePostAnswer = () => {
    if (jawaban1 === '' && jawaban2 === '' && jawaban3 === '' && jawaban4 === '' && jawaban5 === '' && jawaban6 === '') {
      Swal.fire('Gagal', 'Anda belum menjawab semua kuisioner yang tersedia!', 'error');
    } else {
      let answers = {
        answers: [
          {
            answer: jawaban1,
            alumniId: alumni.id,
            question_code: 'Q1'
          },
          {
            answer: jawaban2,
            alumniId: alumni.id,
            question_code: 'Q2'
          },
          {
            answer: jawaban3,
            alumniId: alumni.id,
            question_code: 'Q3'
          },
          {
            answer: jawaban4,
            alumniId: alumni.id,
            question_code: 'Q4'
          },
          {
            answer: jawaban5,
            alumniId: alumni.id,
            question_code: 'Q5'
          },
          {
            answer: jawaban6,
            alumniId: alumni.id,
            question_code: 'Q6'
          },
        ]
      }
      fetch(`/api/answer/${alumni.nim}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
      })
        .then(res => res.json())
        .then(data => {
          if (data.message == 'success') {
            Swal.fire('Berhasil', 'Kuisioner berhasil diisi!', 'success');
          } else {
            Swal.fire('Gagal', 'Kuisioner gagal diisi!', 'error');
          }
        })
        .catch(err => {
          Swal.fire('Gagal', 'Kuisioner gagal diisi!', 'error');
        })
    }
  }

  useEffect(() => {
    handleGetAlumni()
    if (alumni.tracered === "true") {
      handleGetAnswer()
    }
  }, [])

  return (
    <div className="content">
      <div className="card card-default">
        <div className="card-header">
          <h3 className="card-title text-primary text-bold">Form Kuisioner</h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse">
              <i className="fas fa-minus" />
            </button>
          </div>
        </div>
        {/* /.card-header */}
        <div className="card-body" style={{ display: 'block' }}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                {/* <div className="card-title text-bold">Kuisiner Wajib</div> */}
                <table className="table table-striped table-borderless">
                  <tbody>
                    <tr>
                      <td><div style={{ borderRadius: '5px', height: '8px', width: '30px', backgroundColor: '#007bff', display: "inline-block" }}></div></td>
                      <td colSpan={4} className="text-bold"> Profile Alumni</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">NIM</td>
                      <td className="">:</td>
                      <td className="w-50">
                        <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={alumni ? alumni.nim : '...'} />
                      </td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Nama Lengkap</td>
                      <td className="">:</td>
                      <td className="w-50">
                        <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={alumni ? alumni.nama : '...'} />
                      </td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Prodi</td>
                      <td className="">:</td>
                      <td className="w-50">
                        <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={alumni ? alumni.prodi == '01TI' ? 'Teknik Informatika' : 'Managemen Informasi' : '...'} />
                      </td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Tahun Lulus</td>
                      <td className="">:</td>
                      <td className="w-50">
                        <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={alumni ? alumni.lulus : '...'} />
                      </td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">No. Telepon/HP</td>
                      <td className="">:</td>
                      <td className="w-50">
                        <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={alumni ? alumni.telepon : '...'} />
                      </td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Email</td>
                      <td className="">:</td>
                      <td className="w-50">
                        <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={alumni ? alumni.email : '...'} />
                      </td>
                    </tr>
                    {alumni.tracered === "true" ? (<QuestionCompleted />) : (
                      <>
                        <tr>
                          <td><div style={{ borderRadius: '5px', height: '8px', width: '30px', backgroundColor: '#007bff', display: "inline-block" }}></div></td>
                          <td colSpan={4} className="text-bold"> Kuisioner Wajib</td>
                        </tr>
                        <tr>
                          <td className=""></td>
                          <td className="w-50">Berapa bulan waktu yang dihabiskan (sebelum dan sesudah kelulusan) untuk memperoleh pekerjaan pertama?</td>
                          <td className="">:</td>
                          <td className="w-50">
                            <div className="form-check form-check-inline mb-1">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" onChange={() => setAnsQ1(!ansQ1)} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio1">Kira-kira</label>
                            </div>
                            <input type="number" className="form-control form-control-sm col-4 d-inline mr-1" placeholder="bulan" value={jawaban1.split(';')[1] == 'sebelum' ? parseInt(jawaban1.split(';')[0]) : 0} onChange={(e) => setJawaban1(e.target.value + ';sebelum')} disabled={ansQ1} />
                            bulan sebelum lulus ujian
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio2" onChange={() => setAnsQ1(!ansQ1)} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio2">Kira-kira</label>
                            </div>
                            <input type="number" className="form-control form-control-sm col-4 d-inline mr-1" placeholder="bulan" value={jawaban1.split(';')[1] == 'sesudah' ? parseInt(jawaban1.split(';')[0]) : 0} onChange={(e) => setJawaban1(e.target.value + ';sesudah')} disabled={!ansQ1} />
                            bulan sesudah lulus ujian
                          </td>
                        </tr>
                        <tr>
                          <td className=""></td>
                          <td className="w-50">Sebutkan sumberdana dalam pembiayaan kuliah?</td>
                          <td className="">:</td>
                          <td className="w-50">
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio3" onChange={() => setJawaban2('MANDIRI')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio3">Biaya Sendiri / Keluarga</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio4" onChange={() => setJawaban2('ADIK')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio4">Beasiswa ADIK</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio5" onChange={() => setJawaban2('BIDIKMISI')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio5">Beasiswa BIDIKMISI</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio6" onChange={() => setJawaban2('PPA')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio6">Beasiswa PPA</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio7" onChange={() => setJawaban2('AFIRMASI')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio7">Beasiswa AFIRMASI</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio8" onChange={() => setJawaban2('SWASTA')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio8">Beasiswa Perusahaan/Swasta</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio9" onChange={() => setAnsQ2(!ansQ2)} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio9">Lainnya, tuliskan:</label>
                            </div>
                            <br />
                            <input type="text" className="form-control form-control-sm " placeholder="..." disabled={ansQ2} />
                          </td>
                        </tr>
                        <tr>
                          <td className=""></td>
                          <td className="w-50">Apakah anda bekerja saat ini (termasuk kerja sambilan dan wirausaha)?</td>
                          <td className="">:</td>
                          <td className="w-50">
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio10" onChange={() => setJawaban3('YA')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio10">Iya</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio11" />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio11">Tidak</label>
                            </div>
                            <br />
                            <input type="text" className="form-control form-control-sm " placeholder="Pekerjaan" onChange={(e) => setJawaban3(e.target.value)} />
                          </td>
                        </tr>
                        <tr>
                          <td className=""></td>
                          <td className="w-50">Seberapa erat hubungan antara bidang studi dengan pekerjaan anda?</td>
                          <td className="">:</td>
                          <td className="w-50">
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio12" onChange={() => setJawaban4('1')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio12">Sangat Erat</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio13" onChange={() => setJawaban4('2')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio13">Erat</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio14" onChange={() => setJawaban4('3')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio14">Cukup Erat</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio15" onChange={() => setJawaban4('4')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio15">Kurang Erat</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio16" onChange={() => setJawaban4('5')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio16">Tidak Sama Sekali</label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className=""></td>
                          <td className="w-50">Tingkat pendidikan apa yang paling tepat/sesuai untuk pekerjaan anda saat ini?</td>
                          <td className="">:</td>
                          <td className="w-50">
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio17" onChange={() => setJawaban5('1')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio17">Setingkat Lebih Tinggi</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio18" onChange={() => setJawaban5('2')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio18">Tingkat yang Sama</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio19" onChange={() => setJawaban5('3')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio19">Setingkat Lebih Rendah</label>
                            </div>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio20" onChange={() => setJawaban5('4')} />
                              <label className="form-check-label mr-1" htmlFor="inlineRadio20">Tidak Perlu Pendidikan Tinggi</label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className=""></td>
                          <td className="w-50">Kira-kira berapa pendapatan anda setiap bulannya?</td>
                          <td className="">:</td>
                          <td className="w-50">
                            Rp.
                            <input type="number" className="form-control col-8 form-control-sm d-inline" value={jawaban6} onChange={(e) => setJawaban6(e.target.value)} />
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* /.card-body */}
        <div className="card-footer d-flex justify-content-center" style={{ display: 'block' }} >
          <button onClick={handlePostAnswer} className="btn btn-success" hidden={alumni.tracered === "true" ? true : false}>Simpan <i className="fas fa-save"></i></button>
        </div>
      </div>

    </div>
  )
}