import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Input, Button, Row, Select, Col, Radio, Divider, Spin, InputNumber, Popconfirm } from "antd";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _map from "lodash/map";
import * as moment from "dayjs";
import "./AddEditAreaSegment.scss";
import { citiesByProvince } from "../../__mocks__/areaSegment";
import { STATUS, VALIDATE_FORM_MESSAGES_TEMPLATE, CONFIRM_MESSAGE, DATE_FORMAT_TIME } from "../../utils/constants";
import MapDrawer from "../../components/MapDrawer";
import { numberOnly, filterCities } from "../../utils/utils";
import CustomIcon from "../../components/CustomIcon/CustomIcon";
import PageTitle from "../../components/PageTitle/PageTitle";
import ROUTES from "../../routes/constant.route";
const { Option } = Select;
const { TextArea } = Input;

const AddEditAreaSegmentContainer = ({
  deleteArea,
  loading,
  areaSegment,
  getSegmentById,
  addSegment,
  updateSegment,
  // getState,
  history,
  // getCity,
  cities,
  province,
}) => {
  const [form] = Form.useForm();
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [_location, _setLocation] = useState(null);
  const { id } = useParams();
  const isEditView = !!id;
  const [selectedProvince, setSelectedProvince] = useState(isEditView ? areaSegment.state : "");
  const [filteredCities, setCities] = useState([]);

  useEffect(() => {
    if (id) {
      fetchAreaSegmentDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(areaSegment) && !loading && isEditView) {
      setFormValues();
      setSelectedProvince(areaSegment.state);
    }
  }, [areaSegment, loading]);

  useEffect(() => {
    if (isEditView && province.length && areaSegment && cities) {
      setSelectedProvince(areaSegment.state);
      setCities(filterCities(areaSegment.state, cities));
      // getCity(areaSegment.state);
    }
  }, [province, areaSegment, cities]);

  // on Component did mount
  useEffect(() => {
    if (form) {
      form.resetFields();
      _setLocation(null);
    }
    // return () => { TODO: should work on Component unMount
    //   if (form) {
    //     form.resetFields();
    //   }
    // };
  }, [form]);

  const onProvinceChange = value => {
    form.setFieldsValue({ city: null });
    setSelectedProvince(value);
    setCities(filterCities(value, cities));
  };

  const fetchAreaSegmentDetail = async ID => {
    await getSegmentById(ID);
  };
  const setFormValues = () => {
    form.setFieldsValue({
      code: areaSegment.code,
      name: areaSegment.name,
      state: areaSegment.state,
      enabled: areaSegment.enabled,
      city: areaSegment.city,
      areaName: areaSegment.areaName,
      description: areaSegment.description,
      radius: areaSegment.radius,
    });
    if (areaSegment.longitude && areaSegment.latitude) {
      const { longitude, latitude, location } = areaSegment;
      _setLocation({ longitude, latitude, name: location });
    }
  };

  const onFormFinish = async fieldsValue => {
    const values = {
      ...fieldsValue,
      latitude: _location ? _location.latitude : null,
      longitude: _location ? _location.longitude : null,
      location: _location ? _location.name : null,
    };
    try {
      if (isEditView) {
        await updateSegment(id, values);
      } else {
        await addSegment(values);
      }
      history.push(ROUTES.AREA_SEGMENT_MANAGEMENT.path);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const onLocationChange = place => {
    if (!_isEmpty(place)) _setLocation(place);
    setIsMapVisible(false);
  };

  const _deleteArea = async () => {
    try {
      await deleteArea(id);
      history.push(ROUTES.AREA_SEGMENT_MANAGEMENT.path);
    } catch (error) {
      console.log("area del error", error);
    }
  };

  const _place = _get(_location, "name", "");
  // const _place = `${_get(_location, "name", "")} ${
  //   _get(_location, "latitude") ? `(${_get(_location, "latitude")}, ${_get(_location, "longitude")})` : ""
  // }`;

  const createdAt = _get(areaSegment, "createdAt", "") ? moment(areaSegment.createdAt).format(DATE_FORMAT_TIME) : "";
  const updatedAt = _get(areaSegment, "updatedAt", "") ? moment(areaSegment.updatedAt).format(DATE_FORMAT_TIME) : "";

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}
      <PageTitle title={isEditView ? "Edit Area Segment" : "Add Area Segment"} />
      <Form
        form={form}
        layout="vertical"
        name="nest-messages"
        initialValues={{ enabled: true }}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {isEditView ? (
              <Form.Item label="Segment Code" name="code">
                <Input readOnly placeholder="Segment Code" />
              </Form.Item>
            ) : null}
            <Form.Item label="Segment Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Segment Name" />
            </Form.Item>
            <Form.Item label="State / Province" name="state" rules={[{ required: true }]}>
              <Select placeholder="State" onChange={onProvinceChange}>
                {_map(province, prov => (
                  <Option key={prov.code} value={prov.code}>
                    {prov.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="City" name="city" rules={[{ required: true }]}>
              <Select placeholder="City">
                {_map(filteredCities, city => (
                  <Option key={city.code} value={city.code}>
                    {city.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Area Name" name="areaName" rules={[{ required: true }]}>
              <Input placeholder="Area Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
            <Form.Item className="text-left" name="enabled">
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Description" name="description">
              <TextArea rows={5} />
            </Form.Item>
            <Form.Item label="Location">
              <Button
                type="link"
                className="location-btn"
                icon={<CustomIcon name="PushpinOutlined" />}
                onClick={() => setIsMapVisible(true)}
              >
                {_place} (Google Map Pin)
              </Button>
            </Form.Item>
            <Form.Item label="Radius (meters)" name="radius" rules={[numberOnly]}>
              <Input className="input-number-full-width" placeholder="500" disabled={_isEmpty(_location)} />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={8} lg={8}>
              Created By: {_get(areaSegment, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(areaSegment, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={16} lg={16}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Popconfirm
                      title={CONFIRM_MESSAGE.DELETE}
                      onConfirm={_deleteArea}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                      disabled
                    >
                      <Button type="danger" disabled>
                        Delete
                      </Button>
                    </Popconfirm>
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Button type="info" onClick={() => history.push(ROUTES.AREA_SEGMENT_MANAGEMENT.path)}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row className="fields-row" justify="end" type="flex">
            <Col>
              <Link to="/area-segment-management">
                <Button
                  className="action-btn mg-right-50"
                  type="info"
                  onClick={() => history.push(ROUTES.AREA_SEGMENT_MANAGEMENT.path)}
                >
                  Cancel
                </Button>
              </Link>
              <Button loading={loading} className="action-btn" type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        )}
      </Form>
      <MapDrawer
        location={_location}
        visible={isMapVisible}
        onCancel={() => setIsMapVisible(false)}
        onSave={onLocationChange}
        title="Area-Segment Location"
        showSearchBox
      />
    </>
  );
};

AddEditAreaSegmentContainer.propTypes = {
  getSegmentById: PropTypes.func,
  updateSegment: PropTypes.func,
  addSegment: PropTypes.func,
  areaSegment: PropTypes.object,
  loading: PropTypes.bool,
  deleteArea: PropTypes.func,
  history: PropTypes.object,
  // getState: PropTypes.func,
  province: PropTypes.object,
  // getCity: PropTypes.func,
  cities: PropTypes.object,
};
export default AddEditAreaSegmentContainer;
