import Card from "./card";
import SmallCard from "./card-small";

export default function ContentBody() {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6">
            <SmallCard title={'150'} caption={'New Orders'} icon={'ion-bag'} background={'bg-primary'} />
          </div>
        </div>
        <div className="row">
          <section className="col-lg-7 connectedSortable ui-sortable">
            <Card />
          </section>
          <section className="col-lg-5 connectedSortable ui-sortable">
            <Card />
          </section>
        </div>
      </div>
    </section>
  )
}