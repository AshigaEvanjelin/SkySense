function FavoriteCityCard({ city, country, temp, condition, icon: Icon }) {
  return (
    <article className="favorite-card" tabIndex="0">
      <div className="favorite-card-top">
        <div>
          <p className="favorite-city">{city}</p>
          <p className="favorite-country">{country}</p>
        </div>
        <div className="favorite-temp">{temp}</div>
      </div>
      <div className="favorite-card-bottom">
        <Icon size={22} />
        <span>{condition}</span>
      </div>
    </article>
  )
}

export default FavoriteCityCard
