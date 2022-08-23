import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import style from "./style.module.scss";

const CarouselComp = ({ contentStyle }) => {
  const sliderRef = useRef();

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Carousel dots={false} ref={sliderRef} autoplay>
          <div style={contentStyle}>
            <img
              className={style.carouselImg}
              src="https://www.baitussalam.org/storage/images/settings/1627880943welfare-banner-3.jpg"
              alt=""
            />
          </div>
          <div style={contentStyle}>
            <img
              style={{ width: "100%", height: "100vh", objectFit: "fill" }}
              src="https://www.baitussalam.org/storage/images/settings/1620421157welfare-banner-4.jpg"
              alt=""
            />
          </div>
          <div style={contentStyle}>
            <img
              style={{ width: "100%", height: "100vh", objectFit: "fill" }}
              src="https://www.baitussalam.org/storage/images/foodbank/2.jpg"
              alt=""
            />
          </div>
        </Carousel>
        <div className={style.btntest}>
          <LeftOutlined
            className={`${style.nextAndPrevBtn} ${style.prevBtn}`}
            onClick={() => sliderRef.current.prev()}
          />
          <RightOutlined
            className={`${style.nextAndPrevBtn} ${style.nextBtn}`}
            onClick={() => sliderRef.current.next()}
          />
        </div>
      </div>
    </div>
  );
};

CarouselComp.propTypes = {
  contentStyle: PropTypes.object,
};

export default CarouselComp;
