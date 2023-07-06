import Link from "next/link";
import Card from "../utils/card";

export default function ListQuestioners() {
  return (
    <section className="content">
      <Card cardTitle="List Questioner" cardIcon="fa-user">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Questioner</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Haho Question</td>
                      <td className="text-center"><span className="badge badge-pill badge-success">Active</span></td>
                      <td className="text-center">
                        <Link href="/admin-pages/questioner/1" className="btn btn-sm btn-primary ml-1"><i className="fa fa-fw fa-eye"></i></Link>
                        <Link href="#" className="btn btn-sm btn-warning ml-1"><i className="fa fa-fw fa-info"></i></Link>
                        <Link href="#delete" className="btn btn-sm btn-danger ml-1"><i className="fa fa-fw fa-trash"></i></Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}