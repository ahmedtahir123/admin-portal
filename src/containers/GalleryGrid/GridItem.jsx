import React, { useState } from "react";
import { List } from "antd";
import PropTypes from "prop-types";
import { DownloadOutlined } from "@ant-design/icons";
import _get from "lodash/get";
import { getThumbnailByType } from "../../utils/utils";
import defaultLogo from "../../images/invalidLogo.svg";

const GridItem = ({ item, selected, onSelect, type, forCarousel, index, downloadFile, isDownloadAble }) => {
  const { uid, url, name, thumbnail, imageUrl } = item;
  const [errorImage, setErrorImage] = useState(false);
  let thumb = "";
  if (name) {
    thumb = getThumbnailByType(name);
  } else if (uid) {
    thumb = getThumbnailByType(uid);
  } else {
    thumb = "";
  }
  const path = errorImage ? defaultLogo : url || (imageUrl && imageUrl.url) || imageUrl;
  return (
    <List.Item
      className={`grid-item ${selected && "grid-item__selected"}`}
      onClick={() => onSelect(forCarousel ? { item, index } : uid || imageUrl)}
    >
      {type === "file" ? (
        <div className={`container ${isDownloadAble && "show-download"}`}>
          <div className="grid__file-container">
            <img src={thumb} alt="grid box" />
            <span>{name}</span>
          </div>
          <DownloadOutlined className="downloadIcon" onClick={() => downloadFile(path)} />
        </div>
      ) : (
        <img src={path} alt="grid box" onError={() => setErrorImage(true)} />
      )}
    </List.Item>
  );
};
GridItem.defaultProps = {
  item: {},
};
GridItem.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  forCarousel: PropTypes.bool,
  index: PropTypes.number,
  downloadFile: PropTypes.func,
  isDownloadAble: PropTypes.bool,
};

export default GridItem;
