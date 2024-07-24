import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCity } from "../contexts/CityContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";

export default function Map() {
  const { cities } = useCity();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    error,
    getPosition: geoLocationPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();
  const [position, setPosition] = useState([40, 0]);

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
    // 클린업이 없기 때문에, lat, lng이 없어져도 position은 변화하지 않는다
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition)
      setPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  if (!cities.length) return <Message message="Add your first city" />;

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={geoLocationPosition}>
          {isLoadingPosition ? "Loading" : "Use position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <OnMapClick />
      </MapContainer>
    </div>
  );
}

// LeafLet에서 제공하는 컴포넌트가 아님
// map.setView를 사용하는데, 컴포넌트를 children으로 넣어줘야해서 null을 리턴하는 것 뿐
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// LeafLet에서 제공하는 컴포넌트가 아님
function OnMapClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
