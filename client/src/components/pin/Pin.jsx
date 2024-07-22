import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
  // Check if item has valid images array
  const imageUrl = item.images && item.images.length > 0 ? item.images[0] : 'default-image-url'; // Replace with a valid default image URL if necessary

  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={imageUrl} alt={`${item.title} image`} />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom{item.bedroom > 1 ? 's' : ''}</span>
            <b>${item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
