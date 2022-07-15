import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Button, Drawer, Form, Input } from "antd";
import _get from "lodash/get";
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import LocationService from "../../services/location.service";
import { MAP_API_KEY } from "../../utils/constants";
import "./MapDrawer.scss";
import SearchBox from "./SearchBox";

const mapOptions = () => ({
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
});

const MapDrawer = ({ defaultCenter, visible, center, zoom, location, onCancel, onSave, showSearchBox, title }) => {
  const [mapApi, setApiLoaded] = useState({
    mapsApiLoaded: false,
    mapInstance: null,
  });
  const [_center, setCenter] = useState(defaultCenter);
  const [_location, setLocation] = useState(location || {});
  useEffect(() => setLocation(location || {}), [location]);

  const _apiLoaded = map => {
    map.setOptions(mapOptions());
    setApiLoaded({
      mapsApiLoaded: true,
      mapInstance: map,
    });
  };
  const onClickSave = () => {
    onSave(_location);
  };

  const _showSearchBox = showSearchBox && mapApi.mapsApiLoaded;

  const _setCenter = _l => {
    const { latitude: lat, longitude: lng } = _l;
    setLocation(_l);
    setCenter({ lat, lng });
  };

  const _onDrag = async e => {
    if (onSave) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const { data } = await LocationService.getPlaceFromLatLng({ lat, lng });

      const name = _get(data, "results[0].formatted_address");
      _setCenter({ latitude: lat, longitude: lng, name });
    }
  };

  const _renderMarkers = () => {
    if (!_isEmpty(_location) && _isArray(_location)) {
      return _map(_location, ({ latitude: lat, longitude: lng }) => (
        <Marker
          draggable
          onDragEnd={e => {
            console.log(e);
          }}
          position={{ lat, lng }}
        />
      ));
    }
    if (!_isEmpty(_location)) {
      const { latitude: lat, longitude: lng } = _location;
      return <Marker position={{ lat, lng }} draggable onDragEnd={_onDrag} />;
    }
    return null;
  };

  return (
    <Drawer
      title={title}
      className="map-drawer"
      width={720}
      onClose={onCancel}
      visible={visible}
      bodyStyle={{ display: "flex", flexDirection: "column" }}
      footer={
        <div className="text-right">
          <Button className="action-btn mg-right-8" onClick={onCancel}>
            Cancel
          </Button>
          {onSave && (
            <Button className="action-btn" onClick={onClickSave} type="primary">
              Save
            </Button>
          )}
        </div>
      }
    >
      {_showSearchBox && (
        <Form.Item label="Location">
          <Input readOnly value={_location.name} />
        </Form.Item>
      )}
      <div className="map-container">
        <LoadScript id="script-loader" googleMapsApiKey={MAP_API_KEY} libraries={["places"]}>
          <GoogleMap
            id="map"
            center={_center}
            zoom={10}
            extraMapTypes={[]}
            onLoad={map => {
              _apiLoaded(map);
            }}
          >
            {_showSearchBox && <SearchBox onPlacesChanged={_setCenter} placeholder="Search by Place Name" />}
            {_renderMarkers()}
          </GoogleMap>
        </LoadScript>
      </div>
    </Drawer>
  );
};
MapDrawer.defaultProps = {
  defaultCenter: { lat: 24.8790401, lng: 67.0555692 },
  showSearchBox: false,
  location: null,
};
MapDrawer.propTypes = {
  defaultCenter: PropTypes.object,
  center: PropTypes.object,
  title: PropTypes.string,
  visible: PropTypes.bool,
  zoom: PropTypes.number,
  location: PropTypes.arrayOf(PropTypes.shape({ latitude: PropTypes.number, longitude: PropTypes.number })),
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  showSearchBox: PropTypes.bool,
};
export default MapDrawer;
