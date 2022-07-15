import React from "react";
import PropTypes from "prop-types";
import { List } from "antd";
import "./GalleryGrid.scss";
import GridItem from "./GridItem";
import defaultImage from "../../images/defaultImage.svg";
import defaultImageFile from "../../images/defaultImageFile.svg";

const GalleryGrid = ({ images, selected, onSelect, gridOnly, grid, forCarousel, type, ...rest }) => {
  let gridClass = gridOnly ? "grid__list" : "";
  gridClass += forCarousel ? " grid__carousel-list" : "";
  const DefaultImg = () =>
    type === "file" ? (
      <img src={defaultImageFile} alt="grid box" className="width-150" />
    ) : (
      <img src={defaultImage} alt="grid box" className="width-150" />
    );

  const _renderItem = (item, index) => {
    const _selected = forCarousel ? selected.imageUrl === item.imageUrl : !!selected.get(item.uid || item.imageUrl);
    return (
      <GridItem
        item={item}
        type={type}
        onSelect={onSelect}
        selected={_selected}
        forCarousel={forCarousel}
        index={index}
        {...rest}
      />
    );
  };

  return images.length ? (
    <List className={gridClass} grid={grid} dataSource={images} renderItem={_renderItem} />
  ) : (
    <DefaultImg />
  );
};

GalleryGrid.defaultProps = {
  images: [],
  gridOnly: false,
  selected: new Map(),
  onSelect: () => {},
  grid: { gutter: 16, column: 4, row: 2 },
};
GalleryGrid.propTypes = {
  images: PropTypes.array,
  selected: PropTypes.object,
  onSelect: PropTypes.func,
  gridOnly: PropTypes.bool,
  grid: PropTypes.object,
  forCarousel: PropTypes.bool,
  type: PropTypes.string,
};
export default GalleryGrid;
