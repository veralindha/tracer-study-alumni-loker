export default function ContentHeader({ title, listBreadcrumb }) {
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}