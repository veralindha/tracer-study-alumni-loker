export default function Card({ children, cardTitle = '', cardIcon = '', cardColor = '' }) {
  return (
    <div className={`card bg-gradient-${cardColor}`}>
      <div className="card-header border-0">
        <h3 className="card-title">
          <i className={`far ${cardIcon} mr-2`} />
          {cardTitle}
        </h3>
      </div>
      <div className="card-body pt-0">
        {children}
      </div>
    </div>

  )
}