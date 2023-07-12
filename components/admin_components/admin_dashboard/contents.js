import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SmallCard from "../utils/card-small";

export default function AdminDashboardContent() {
  const [counter, setCounter] = useState({alumnis: 0, tracered: 0, untracered: 0, alumnis19: 0, alumnis20: 0, alumnis21: 0, alumnis22: 0})
  const handleCount = () => {
    fetch('/api/countalumnis', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCounter(data.data)
      })
      .catch(err => {
       console.log('Error: ', err.message)
      })
  }
  const handleCountTahun = () => {
    fetch('/api/countalumnistahun', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCounter(data.data)
      })
      .catch(err => {
       console.log('Error: ', err.message)
      })
  }

  useEffect(() => {
    handleCount()
    handleCountTahun()
  }, [])
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-6">
            <SmallCard title={counter.alumnis} caption={'Total Alumni'} icon={'ion-android-people'} background={'bg-success'} />
          </div>
          <div className="col-lg-4 col-6">
            <SmallCard title={counter.untracered} caption={'Belum Mengisi'} icon={'ion-android-people'} background={'bg-info'} />
          </div>
          <div className="col-lg-4 col-6">
            <SmallCard title={counter.tracered} caption={'Telah Mengisi'} icon={'ion-android-people'} background={'bg-primary'} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-3">
            <SmallCard title={counter.alumnis19} caption={'Total Alumni 2019'} icon={'ion-android-people'} background={'bg-danger'} />
          </div>
          <div className="col-lg-3 col-3">
            <SmallCard title={counter.alumnis20} caption={'Total Alumni 2020'} icon={'ion-android-people'} background={'bg-warning'} />
          </div>
          <div className="col-lg-3 col-3">
            <SmallCard title={counter.alumnis21} caption={'Total Alumni 2021'} icon={'ion-android-people'} background={'bg-success'} />
          </div>
          <div className="col-lg-3 col-3">
            <SmallCard title={counter.alumnis22} caption={'Total Alumni 2022'} icon={'ion-android-people'} background={'bg-primary'} />
          </div>
        </div>
      </div>
    </section>
  )
}