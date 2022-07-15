import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Input, Button, Row, Select, Col, Radio, DatePicker, message, Divider, Spin, Popconfirm } from "antd";
import PropTypes from "prop-types";
import * as moment from "dayjs";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import FormItem from "antd/lib/form/FormItem";
import {
  STATUS,
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  CONFIRM_MESSAGE,
  DATE_FORMAT_TIME,
  // bookLocationList,
} from "../../utils/constants";
import PageTitle from "../../components/PageTitle/PageTitle";
import { StatusRadioButtons } from "../../components/StatusRadioButtons/StatusRadioButtons";
import ROUTES from "../../routes/constant.route";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AddEditProfilerContainer = ({
  loading,
  profiler,
  getProfilerById,
  updateProfiler,
  addProfiler,
  history,
  deleteAllProfiler,
  startProfilerr,
  bookLocationList,
}) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [defaultValue, setDefaultValue] = useState(STATUS.IN_ACTIVE);

  const isEditView = !!id;
  useEffect(() => {
    if (id) {
      fetchProfilerDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (form) {
      form.resetFields();
    }
  }, [form]);

  const statusRadioButtonProps = {
    currentStatus: [
      // { code: STATUS.DEFAULT, name: "Default" },
      // { code: STATUS.IN_ACTIVE, name: "InActive" },
      { code: STATUS.ACTIVE, name: "Active" },
      { code: STATUS.DORMANT, name: "Dormant" },
    ],
    defaultValue,
    // defaultValue: editMode ? STATUS[partner.status] : STATUS.NOT_READY,
  };

  useEffect(() => {
    if (!_isEmpty(profiler) && !loading && isEditView) {
      setFormValues();
    }
  }, [profiler, loading, isEditView]);

  const fetchProfilerDetail = async profilerId => {
    await getProfilerById(profilerId);
  };

  const createdAt = _get(profiler, "createdAt", "") ? moment(profiler.createdAt).format("DD/MM/YYYY hh:mm") : "";
  const updatedAt = _get(profiler, "updatedAt", "") ? moment(profiler.endDate).format("DD/MM/YYYY hh:mm") : "";

  const setFormValues = () => {
    setDefaultValue(profiler.operationalStatus);
    form.setFieldsValue({
      profilerId: profiler.id,
      profilerName: profiler.name,
      description: profiler.description,
      cityName: profiler.city,
      // enabled: profiler.enabledStatus,
      status: profiler.operationalStatus,
      lastDisengage: profiler.disengagedAt ? moment(profiler.disengagedAt) : null,
      lastDeploy: profiler.deployedAt ? moment(profiler.deployedAt) : null,
      // areaSegment: profiler.segmentName,
      // profileType: profiler.type,
      // creationTimespant: profiler.createdAt ? moment(profiler.createdAt) : moment(),
      // startOn: moment(profiler.startDate),
      // endOn: moment(profiler.endDate),
    });
  };

  const startProfiler = () => {
    startProfilerr(id);
  };

  const onFormFinish = async fieldsValue => {
    let values;
    console.log("form values ===", fieldsValue);
    // const rangeTimeValue = fieldsValue.creationTimespant;
    if (id) {
      values = {
        city: fieldsValue.cityName,
        operationalStatus: fieldsValue.status ? fieldsValue.status : "DEFAULT",
        profileJson: profiler.profileJson ? profiler.profileJson : "",
        name: fieldsValue.profilerName,
        description: fieldsValue.description ? fieldsValue.description : null,
        // enabledStatus: fieldsValue.enabled,
        // ...fieldsValue,
        // startFrom: rangeTimeValue[0].format("YYYY-MM-DD"),
        // endAt: rangeTimeValue[1].format("YYYY-MM-DD"),
        //  creationTimespant: rangeTimeValue[2].format("YYYY-MM-DD"),
      };
    } else {
      values = {
        city: fieldsValue.cityName,
        operationalStatus: fieldsValue.status ? fieldsValue.status : "DEFAULT",
        profileJson: "",
        name: fieldsValue.profilerName,
        description: fieldsValue.description ? fieldsValue.description : null,
        // enabledStatus: fieldsValue.enabled,
        // ...fieldsValue,
        // startFrom: rangeTimeValue[0].format("YYYY-MM-DD"),
        // endAt: rangeTimeValue[1].format("YYYY-MM-DD"),
        //  creationTimespant: rangeTimeValue[2].format("YYYY-MM-DD"),
      };
    }
    try {
      if (isEditView) {
        await updateProfiler(id, values);
      } else {
        await addProfiler(values);
      }
      history.goBack();
    } catch (err) {
      console.log("err", err);
    }
  };
  // const initialValues = {
  //   status: STATUS.NON_VERIFIED,
  // };

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}

      <PageTitle title={isEditView ? "Edit Profiler" : "Add Profiler"} />
      <Form
        form={form}
        className="add-edit-profiler"
        layout="vertical"
        name="nest-messages"
        // initialValues={initialValues}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Profiler Code" name="profilerId">
              <Input readOnly placeholder="Profiler Code" />
            </Form.Item>
            <Form.Item label="Name" name="profilerName" rules={[{ required: true }]}>
              <Input placeholder="Name" maxLength={25} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea maxLength="500" rows={4} placeholder="Description" />
            </Form.Item>
            {/* <Form.Item label="Creation Timestamp" name="creationTimespant">
              <Input placeholder="Creation Timestamp" /> 
              <RangePicker showTime format="DD/MM/YYYY hh:mm a" />
            </Form.Item> */}
            <Form.Item label="City" name="cityName" rules={[{ required: true }]}>
              <Select className="location-select" placeholder="City">
                {bookLocationList.map(city => (
                  <Option value={city.code}>{city.name}</Option>
                ))}
              </Select>
            </Form.Item>
            {/* <Form.Item label="Area Segment" name="areaSegment" rules={[{ required: true }]}>
              <Select placeholder="Area Segment">
                {areaSegment.map(item => (
                  <Option value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item> */}
            {isEditView ? (
              <div>
                <FormItem label="Last Deploy" name="lastDeploy">
                  {/* <Input disabled placeholder={profiler.endDate} /> */}
                  <DatePicker disabled format={DATE_FORMAT_TIME} />
                </FormItem>
                <FormItem label="Last Disengage" name="lastDisengage">
                  <DatePicker disabled format={DATE_FORMAT_TIME} />
                </FormItem>
              </div>
            ) : null}
          </Col>

          <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
            {/* <Form.Item className="text-left" name="enabled">
              <Radio.Group>
                <Radio.Button value="ENABLED">ENABLED</Radio.Button>
                <Radio.Button value="DISABLED">DISABLED</Radio.Button>
              </Radio.Group>
            </Form.Item> */}
            <Form.Item className="text-left" label="Current Status" name="status">
              <StatusRadioButtons
                currentStatus={statusRadioButtonProps.currentStatus}
                defaultValue={statusRadioButtonProps.defaultValue}
              />
            </Form.Item>
            {/* <Form.Item label="Profile Type" name="profileType" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio.Button value="Permanent">Permanent</Radio.Button>
                <Radio.Button value="Temporary">Temporary</Radio.Button>
              </Radio.Group>
            </Form.Item> */}
            {/* <Form.Item label="Deploy Period" name="deployPeriod" rules={[{ required: true }]}>
              <RangePicker showTime />
            </Form.Item> */}
            {isEditView ? (
              <div>
                <Row className="mg-top-40" justify="space-between" type="flex">
                  <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                    <Form.Item>
                      <Link to={`/landing-designer/${id}`}>
                        <Button type="primary">Open Designer</Button>
                      </Link>
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                    <Form.Item>
                      <Link to={`/swim-lane-manager/${id}`}>
                        <Button type="primary">Open Manager</Button>
                      </Link>
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="mg-top-40" justify="end" type="flex">
                  <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                    <Button onClick={() => startProfiler()} type="primary">
                      Start
                    </Button>
                  </Col>
                </Row>
              </div>
            ) : (
              <div>
                <Row className="mg-top-40" justify="space-between" type="flex">
                  <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                    <Form.Item>
                      <Link to={`/swim-lane-manager/${id}`}>
                        <Button disabled type="primary">
                          Open Manager
                        </Button>
                      </Link>
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                    <Form.Item>
                      <Link to={`/landing-designer/${id}`}>
                        <Button disabled type="primary">
                          Open Designer
                        </Button>
                      </Link>
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="mg-top-40" justify="end" type="flex">
                  <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                    <Button onClick={startProfiler} disabled type="primary">
                      Start
                    </Button>
                  </Col>
                </Row>
              </div>
            )}

            {/* <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                <Button type="primary">Stop</Button>
              </Col> */}
          </Col>
        </Row>
        <Divider />
        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(profiler, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(profiler, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Popconfirm
                      title={CONFIRM_MESSAGE.DELETE}
                      onConfirm={() => {}}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                      disabled
                    >
                      <Button onClick={() => deleteAllProfiler(id)} type="danger" disabled>
                        Delete
                      </Button>
                    </Popconfirm>
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Button type="info" onClick={() => history.push(ROUTES.LANDING_PAGE_MANAGEMENT.path)}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
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
              <Button
                className="action-btn mg-right-50"
                type="info"
                onClick={() => history.push(ROUTES.LANDING_PAGE_MANAGEMENT.path)}
              >
                Cancel
              </Button>
              <Button className="action-btn" type="primary" htmlType="submit" loading={loading}>
                Create
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </>
  );
};

AddEditProfilerContainer.propTypes = {
  deleteAllProfiler: PropTypes.func,
  addProfiler: PropTypes.func,
  getProfilerById: PropTypes.func,
  updateProfiler: PropTypes.func,
  profiler: PropTypes.object,
  loading: PropTypes.bool,
  history: PropTypes.object,
  startProfilerr: PropTypes.func,
  bookLocationList: PropTypes.array,
};
export default AddEditProfilerContainer;
