import { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../../libs/supabase.lib";
import Card from "../utils/card";

export default function AddQuestioner() {
  const [questionerName, setQuestionerName] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('Questioners').insert({ questioner_name: questionerName }).select();
    if (error) {
      Swal.fire('Error', error.message, 'error');
      console.error(error);
    }
  }
  return (
    <section className="content">
      <Card cardTitle="Tambah Questioner Baru" cardIcon="fa-user">
        <form onSubmit={handleSubmit} className="container-fluid">
          <div className="form-group">
            <div className="row">
              <div className="col">
                <div>
                  <label htmlFor="qname">Questioner Name</label>
                  <input type="text" className="form-control form-control-sm text-left" id="qname" value={questionerName} onChange={(e) => setQuestionerName(e.target.value)} required />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-success float-right"><i className="fas fa-fw fa-save"></i> Save</button>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </section>
  )
}