import React, { useState } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { Autocomplete } from "@react-google-maps/api";

const SearchBox = props => {
  const { placeholder, onPlacesChanged } = props;
  const [_autocomplete, setAutocomplete] = useState(null);
  const _onPlacesChanged = () => {
    if (onPlacesChanged) {
      const _place = _autocomplete.getPlace();
      const _lat = get(_place, "geometry.location.lat");
      const _lng = get(_place, "geometry.location.lng");
      const location = {
        name: _place.name,
        latitude: (_lat && _lat()) || null,
        longitude: (_lng && _lng()) || null,
      };
      onPlacesChanged(location);
    }
  };

  return (
    <Autocomplete onLoad={setAutocomplete} onPlaceChanged={_onPlacesChanged}>
      <input type="text" placeholder={placeholder} id="search-box" />
    </Autocomplete>
  );
};

SearchBox.defaultProps = {
  placeholder: "Search place",
};

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  onPlacesChanged: PropTypes.func.isRequired,
};
export default SearchBox;
