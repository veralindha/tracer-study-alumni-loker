import React, { Component } from 'react'
import Swal from 'sweetalert2'

export class QuestionNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jawaban1: '',
      jawaban2: '',
      jawaban3: '',
      jawaban4: '',
      jawaban5: '',
      jawaban6: 0,
      ansQ1: true,
      ansQ2: true,
      alumni: {},
      idAlumni: ''
    }
  }
  componentDidMount() {

  }
  componentDidUpdate(prevProp) {
    if (prevProp.idAlumni !== this.props.idAlumni) {
      this.setState({ idAlumni: this.props.idAlumni })
      this.handleGetAlumni().then((data) => {
        this.setState({ alumni: data })
        this.handleGetAnswer(data.id)
        console.log(data)
      })
      console.log(prevProp.idAlumni, this.props.idAlumni)
    }
  }
  async handleGetAlumni() {
    const res = await fetch(`/api/alumni/${this.props.idAlumni}`)
    const data = await res.json()
    return data.data
  }
  handleGetAnswer(id) {
    this.setState({ jawaban1: '' })
    this.setState({ jawaban2: '' })
    this.setState({ jawaban3: '' })
    this.setState({ jawaban4: '' })
    this.setState({ jawaban5: '' })
    this.setState({ jawaban6: '' })
    fetch(`/api/answer/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.data && res.data.length > 0) {
          console.log(res.data)
          res.data.forEach(jwb => {
            switch (jwb.question_code) {
              case 'Q1':
                this.setState({ jawaban1: jwb.answer })
                break;

              case 'Q2':
                this.setState({ jawaban2: jwb.answer })
                break;

              case 'Q3':
                this.setState({ jawaban3: jwb.answer })
                break;

              case 'Q4':
                this.setState({ jawaban4: jwb.answer })
                break;

              case 'Q5':
                this.setState({ jawaban5: jwb.answer })
                break;

              case 'Q6':
                this.setState({ jawaban6: jwb.answer })
                break;

              default:
                break;
            }
          });
        }
      })
  }
  handlePostAnswer() {
    if (this.state.jawaban1 === '' && this.state.jawaban2 === '' && this.state.jawaban3 === '' && this.state.jawaban4 === '' && this.state.jawaban5 === '' && this.state.jawaban6 === '') {
      Swal.fire('Gagal', 'Anda belum menjawab semua kuisioner yang tersedia!', 'error');
    } else {
      let answers = [
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
      fetch(`/api/answer/${idAlumni}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 200) {
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
  render() {
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
                          <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={this.state.alumni ? this.state.alumni.nim : '...'} />
                        </td>
                      </tr>
                      <tr>
                        <td className=""></td>
                        <td className="w-50">Nama Lengkap</td>
                        <td className="">:</td>
                        <td className="w-50">
                          <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={this.state.alumni ? this.state.alumni.nama : '...'} />
                        </td>
                      </tr>
                      <tr>
                        <td className=""></td>
                        <td className="w-50">Prodi</td>
                        <td className="">:</td>
                        <td className="w-50">
                          <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={this.state.alumni ? this.state.alumni.prodi == '01TI' ? 'Teknik Informatika' : 'Managemen Informasi' : '...'} />
                        </td>
                      </tr>
                      <tr>
                        <td className=""></td>
                        <td className="w-50">Tahun Lulus</td>
                        <td className="">:</td>
                        <td className="w-50">
                          <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={this.state.alumni ? this.state.alumni.lulus : '...'} />
                        </td>
                      </tr>
                      <tr>
                        <td className=""></td>
                        <td className="w-50">No. Telepon/HP</td>
                        <td className="">:</td>
                        <td className="w-50">
                          <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={this.state.alumni ? this.state.alumni.telepon : '...'} />  
                        </td>
                      </tr>
                      <tr>
                        <td className=""></td>
                        <td className="w-50">Email</td>
                        <td className="">:</td>
                        <td className="w-50">
                          <input type="text" className="form-control form-control-sm " placeholder="..." disabled value={this.state.alumni ? this.state.alumni.email : '...'} />
                        </td>
                      </tr>
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
                            <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" checked={this.state.ansQ1} onChange={(e) => this.setState({ ansQ1: e.target.checked })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio1">Kira-kira</label>
                          </div>
                          <input type="number" className="form-control form-control-sm col-4 d-inline mr-1" value={this.state.jawaban1.split(';')[1] == 'sebelum' ? this.state.jawaban1.split(';')[0] : ''} placeholder="bulan" onChange={(e) => this.setState({ jawaban1: e.target.value })} disabled />
                          bulan sebelum lulus ujian
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio2" checked={this.state.ansQ2} onChange={(e) => this.setState({ ansQ2: e.target.checked })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio2">Kira-kira</label>
                          </div>
                          <input type="number" className="form-control form-control-sm col-4 d-inline mr-1" value={this.state.jawaban1.split(';')[1] == 'sesudah' ? this.state.jawaban1.split(';')[0] : ''} placeholder="bulan" onChange={(e) => this.setState({ jawaban1: e.target.value })} disabled />
                          bulan sesudah lulus ujian
                        </td>
                      </tr>
                      <tr>
                        <td className=""></td>
                        <td className="w-50">Sebutkan sumberdana dalam pembiayaan kuliah?</td>
                        <td className="">:</td>
                        <td className="w-50">
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio3" checked={this.state.jawaban2 == 'MANDIRI' ? true : false} onChange={() => this.setState({ jawaban2: 'MANDIRI' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio3">Biaya Sendiri / Keluarga</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio4" checked={this.state.jawaban2 == 'ADIK' ? true : false} onChange={() => this.setState({ jawaban2: 'ADIK' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio4">Beasiswa ADIK</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio5" checked={this.state.jawaban2 == 'BIDIKMISI' ? true : false} onChange={() => this.setState({ jawaban2: 'BIDIKMISI' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio5">Beasiswa BIDIKMISI</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio6" checked={this.state.jawaban2 == 'PPA' ? true : false} onChange={() => this.setState({ jawaban2: 'PPA' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio6">Beasiswa PPA</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio7" checked={this.state.jawaban2 == 'AFIRMASI' ? true : false} onChange={() => this.setState({ jawaban2: 'AFIRMASI' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio7">Beasiswa AFIRMASI</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio8" checked={this.state.jawaban2 == 'SWASTA' ? true : false} onChange={() => this.setState({ jawaban2: 'SWASTA' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio8">Beasiswa Perusahaan/Swasta</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio9" onChange={() => this.setState({ ansQ2: !this.state.ansQ2 })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio9">Lainnya, tuliskan:</label>
                          </div>
                          <br />
                          <input type="text" className="form-control form-control-sm " placeholder="..." disabled={this.state.ansQ2} />
                        </td>
                      </tr>
                      <tr>
                        <td className=""></td>
                        <td className="w-50">Apakah anda bekerja saat ini (termasuk kerja sambilan dan wirausaha)?</td>
                        <td className="">:</td>
                        <td className="w-50">
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio10" checked={this.state.jawaban3 == 'YA' ? true : false} onChange={() => this.setState({ jawaban3: 'YA' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio10">Iya</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio11" checked={this.state.jawaban3 != 'YA' && this.state.jawaban3 == '' ? true : false} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio11">Tidak</label>
                          </div>
                          <br />
                          <input type="text" className="form-control form-control-sm " placeholder="Pekerjaan" value={this.state.jawaban3 !== 'YA' ? this.state.jawaban2 : ''} onChange={(e) => this.setState({ jawaban3: e.target.value })} />
                        </td>
                      </tr>
                      <tr>
                        <td className=""></td>
                        <td className="w-50">Seberapa erat hubungan antara bidang studi dengan pekerjaan anda?</td>
                        <td className="">:</td>
                        <td className="w-50">
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio12" checked={this.state.jawaban4 == '1' ? true : false} onChange={() => this.setState({ jawaban4: '1' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio12">Sangat Erat</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio13" checked={this.state.jawaban4 == '2' ? true : false} onChange={() => this.setState({ jawaban4: '2' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio13">Erat</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio14" checked={this.state.jawaban4 == '3' ? true : false} onChange={() => this.setState({ jawaban4: '3' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio14">Cukup Erat</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio15" checked={this.state.jawaban4 == '4' ? true : false} onChange={() => this.setState({ jawaban4: '4' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio15">Kurang Erat</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio16" checked={this.state.jawaban4 == '5' ? true : false} onChange={() => this.setState({ jawaban4: '5' })} disabled />
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
                            <input className="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio17" checked={this.state.jawaban5 == '1' ? true : false} onChange={() => this.setState({ jawaban5: '1' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio17">Setingkat Lebih Tinggi</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio18" checked={this.state.jawaban5 == '2' ? true : false} onChange={() => this.setState({ jawaban5: '2' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio18">Tingkat yang Sama</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio19" checked={this.state.jawaban5 == '3' ? true : false} onChange={() => this.setState({ jawaban5: '3' })} disabled />
                            <label className="form-check-label mr-1" htmlFor="inlineRadio19">Setingkat Lebih Rendah</label>
                          </div>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio20" checked={this.state.jawaban5 == '4' ? true : false} onChange={() => this.setState({ jawaban5: '4' })} disabled />
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
                          <input type="number" className="form-control col-8 form-control-sm d-inline" value={this.state.jawaban6} onChange={(e) => this.setState({ jawaban6: e.target.value })} disabled/>
                        </td>
                      </tr>
                      {/* <tr>
                      <td><div style={{ borderRadius: '5px', height: '8px', width: '30px', backgroundColor: '#007bff', display: "inline-block" }}></div></td>
                      <td colSpan={4} className="text-bold">Kuisioner Opsional</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Menurut anda seberapa besar penekanan pada metode pembelajaran di bawah ini dilaksanakan di program studi anda?</td>
                      <td className="">:</td>
                      <td className="w-50">jawaban</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Kapan anda mulai mencari pekerjaan? Mohon pekerjaan sambilan tidak dimasukkan</td>
                      <td className="">:</td>
                      <td className="w-50">jawaban</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Bagaimana anda mencari pekerjaan tersebut? Jawaban bisa lebih dari satu</td>
                      <td className="">:</td>
                      <td className="w-50">jawaban</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Berapa perusahaan/instansi/institusi yang sudah anda lamar (lewat surat atau e-mail) sebelum anda memeroleh pekerjaan pertama?</td>
                      <td className="">:</td>
                      <td className="w-50">jawaban</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Berapa banyak perusahaan/instansi/institusi yang merespons lamaran anda?</td>
                      <td className="">:</td>
                      <td className="w-50">jawaban</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Berapa banyak perusahaan/instansi/institusi yang mengundang anda untuk wawancara?</td>
                      <td className="">:</td>
                      <td className="w-50">jawaban</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Bagaimana anda menggambarkan situasi anda saat ini? Jawaban bisa lebih dari satu</td>
                      <td className="">:</td>
                      <td className="w-50">jawaban</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Apakah anda aktif mencari pekerjaan dalam 4 minggu terakhir?</td>
                      <td className="">:</td>
                      <td className="w-50">jawaban</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Apa jenis perusahaan/instansi/institusi tempat anda bekerja sekarang?</td>
                      <td className="">:</td>
                      <td className="w-50">jawaban</td>
                    </tr>
                    <tr>
                      <td className=""></td>
                      <td className="w-50">Jika menurut anda pekerjaan anda saat ini tidak sesuai dengan pendidikan anda, mengapa anda mengambilnya? Jawaban bisa lebih dari satu</td>
                      <td className="">:</td>
                      <td className="w-50">jawaban</td>
                    </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer d-flex justify-content-center" style={{ display: 'block' }}>
            {/* <button onClick={this.handlePostAnswer} className="btn btn-success">Simpan <i className="fas fa-save"></i></button> */}
          </div>
        </div>

      </div>
    )
  }
}

export default QuestionNew
