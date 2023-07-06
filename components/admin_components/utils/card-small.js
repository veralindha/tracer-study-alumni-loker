export default function SmallCard({ title, caption, icon, background }) {
  return (
    <div className={"small-box " + background}>
      <div className="inner">
        <h3>{title}</h3>
        <p>{caption}</p>
      </div>
    </div>
  )
}