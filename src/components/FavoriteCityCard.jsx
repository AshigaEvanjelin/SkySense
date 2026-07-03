function FavoriteCityCard({ city, country, temp, condition, icon, onSelect, onRemove }) {
  return (
    <article
      className="favorite-card"
      tabIndex="0"
      role="button"
      onClick={onSelect}
      onKeyDown={(event) => event.key === 'Enter' && onSelect()}
      aria-label={`Load weather for ${city}, ${country}`}>
      <div className="favorite-card-top">
        <div>
          <p className="favorite-city">{city}</p>
          <p className="favorite-country">{country}</p>
        </div>
        <div className="favorite-temp">{temp}</div>
      </div>
      <div className="favorite-card-bottom">
        {icon ? (
          <img src={icon} alt={`${condition} icon`} width="24" height="24" />
        ) : null}
        <span>{condition}</span>
        <button
          className="favorite-remove-button"
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onRemove()
          }}
          aria-label={`Remove ${city} from favorites`}>
          Remove
        </button>
      </div>
    </article>
  )
}

export default FavoriteCityCard
