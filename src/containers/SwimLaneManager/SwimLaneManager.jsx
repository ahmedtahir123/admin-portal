import React, { Fragment, useState, useEffect } from "react";
import { Table, Button, Row, Col, Switch, Form, Divider, Progress } from "antd";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import GalleryGrid from "../GalleryGrid";
import "./SwimLaneManager.scss";
import AddDelCard from "../AddDelCard/AddDelCard";
import CarouselManager from "./CarouselManager";

const SwimLaneManagerContainer = ({
  loading,
  getSwimlaneById,
  addSwimLane,
  profile,
  swimlanes,
  getProfile,
  updateSwimLane,
  history,
}) => {
  // --------- Image Upload States -------
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [swimlanesTable, setSwimlanesTable] = useState([]);
  const [carouselData, setCarouselData] = useState({});
  const [cardDrawerVisible, setCardDrawerVisible] = useState(false);
  const [downloadPercentage, setDownloadPercent] = useState(0);
  const [selectedSwimLane, setSelectedSwimLane] = useState({
    id: "",
    name: "",
    dataSource: [],
  });
  const [allSwimLanes, setAllSwimLanes] = useState([]);
  const [lppInfo, setLppInfo] = useState({});
  const { id } = useParams();
  const [carouselImages, setCarouselImages] = useState([]);
  const [selectedSwimLaneIndex, setSelectedSwimLaneIndex] = useState(null);

  const resetStates = () => {
    // setCarouselData([]);
    // setSwimlanesTable([]);
  };

  const getProgress = ({ loaded, total }) => {
    const progress = Math.floor((loaded / total) * 100);
    if (progress !== 100) {
      setDownloadPercent(progress);
      return;
    }
    setDownloadPercent(100);
  };

  useEffect(() => {
    if (id) {
      getSwimlaneById(id);
      getProfile(id);
    }
  }, [id]);
  useEffect(() => {
    if (!_isEmpty(profile) && !_isEmpty(swimlanes)) {
      const json = profile && profile.profileJson ? JSON.parse(profile.profileJson) : [];
      const info = {
        lppId: profile.id,
        lppName: profile.name,
      };
      const lanesData = _get(swimlanes, "data.swimlanes.lanes");
      const carousel = _get(swimlanes, "data.mainCarousel.cards");
      const tables = _get(json, "swimlanes.lanes", []);
      const allData = tables.map((single, index) => ({
        id: single.swimlaneId,
        cards: _get(lanesData, `[${index}].cards`, []),
      }));
      setLppInfo(info);
      setSwimlanesTable(tables);
      setAllSwimLanes(allData);
      setCarouselImages(carousel);
    }
  }, [profile, swimlanes]);

  const onSubmit = () => {
    if (_get(swimlanes, "layoutId"))
      updateSwimLane({ profile, carouselImages, allSwimLanes }, getProgress).then(() => history.goBack());
    else addSwimLane({ profile, carouselImages, allSwimLanes }, getProgress).then(() => history.goBack());
  };
  const closeGallery = () => {
    setGalleryVisible(false);
  };
  const closeCardDrawer = () => {
    setCardDrawerVisible(false);
  };
  useEffect(() => {
    resetStates();
  }, []);

  const onGallerySave = newFiles => {
    if (newFiles && newFiles.length) {
      setCarouselImages(newFiles);
    } else {
      setCarouselImages([]);
    }
  };
  const manageCard = (record, index) => {
    setSelectedSwimLane({
      id: record.swimlaneId,
      name: record.title,
      dataSource: _get(allSwimLanes, `[${index}].cards`, []),
    });
    setCardDrawerVisible(true);
    setSelectedSwimLaneIndex(index);
  };
  const openGallery = () => setGalleryVisible(true);
  const onCardsSave = values => {
    if (allSwimLanes.length > 0) {
      const newLanes = allSwimLanes.map((lane, index) => {
        if (index === selectedSwimLaneIndex) {
          return {
            ...lane,
            cards: values,
          };
        }
        return lane;
      });
      setAllSwimLanes(newLanes);
    }
  };
  const lowerColumn = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Card Type", dataIndex: "cardType", key: "cardtype" },
    {
      title: "Manage Cards",
      render: (text, record, index) => (
        <Button type="link" onClick={() => manageCard(record, index)}>
          Manage Cards
        </Button>
      ),
      align: "center",
    },
  ];
  return (
    <Fragment>
      <Divider orientation="left" className="form-divider first">
        Swim Lane Manager
      </Divider>
      <div className="carousel-div">
        <h2>Carousel</h2>
        <Button onClick={() => openGallery("carousel")} type="primary">
          Manage
        </Button>
      </div>
      <GalleryGrid images={carouselImages} gridOnly grid={{ gutter: 16, column: 6, row: 2 }} forCarousel />
      <div className="carousel-div mg-top-30">
        <h2>Swimlane</h2>
      </div>
      <Table columns={lowerColumn} dataSource={swimlanesTable} pagination={false} scroll={{ y: 240 }} />
      <Row className="fields-row" gutter={20} type="flex">
        <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40"></Col>
        <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
          <Row className="fields-row" justify="space-around" gutter={24} type="flex">
            <Col span={8} xs={24} sm={8} lg={8} className="text-right">
              <Link to="/landing-page-management">
                <Button onClick={() => history.goBack()} className="action-btn" type="secondary">
                  Cancel
                </Button>
              </Link>
            </Col>
            <Col span={8} xs={24} sm={8} lg={8} className="text-right">
              <Button onClick={onSubmit} className="action-btn" type="primary" disabled={loading}>
                {loading ? (
                  <Progress strokeLinecap="square" strokeColor="#F7931E" percent={downloadPercentage} />
                ) : (
                  "Save"
                )}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <AddDelCard
        visible={cardDrawerVisible}
        close={closeCardDrawer}
        swimlaneData={selectedSwimLane}
        lppInfo={lppInfo}
        type="SWIMLANE"
        onSave={onCardsSave}
      />
      <CarouselManager
        visible={galleryVisible}
        close={closeGallery}
        images={carouselImages}
        lppInfo={lppInfo}
        type="CAROUSEL"
        onSave={onGallerySave}
      ></CarouselManager>
    </Fragment>
  );
};
SwimLaneManagerContainer.propTypes = {
  loading: PropTypes.bool,
  getSwimlaneById: PropTypes.func,
  addSwimLane: PropTypes.func,
  profile: PropTypes.string,
  swimlanes: PropTypes.object,
  getProfile: PropTypes.func,
  updateSwimLane: PropTypes.func,
  history: PropTypes.object,
};

export default SwimLaneManagerContainer;
