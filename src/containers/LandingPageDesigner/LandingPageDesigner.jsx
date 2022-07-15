import React, { useState, Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import { Form, Input, Select, Row, Col, Table, Switch, Divider, Button } from "antd";
import "./LandingPageDesigner.scss";
import { STATUS, VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";
import { uuidv4 } from "../../utils/utils";

import AddSwimlaneDrawer from "../../components/AddSwimlaneDrawer";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const LandingPageDesigner = props => {
  const { error, designer, loading, getDesigner, addDesigner, history, updateDesigner } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState(false);
  const { id } = useParams();
  const [tableData, setTableData] = useState([]);
  const [rowSelected, setRowsSelected] = useState([]);
  const [filterData, setFilterData] = useState(null);
  const [datas, setData] = useState("");

  const [rowsSelectedKey, setRowsSelectedKey] = useState([]);

  const onFormFinish = async values => {
    const fieldValues = {
      ...designer,
      profileJson: {
        searchControl: {
          isEnabled: _get(values, "enableSearchControl", false),
          isFilterEnabled: _get(values, "filterFunction", false),
        },
        mainCarousel: {
          isEnabled: _get(values, "enableMainCarousel", false),
        },
        list: {
          title: _get(values, "listTitle", ""),
          type: _get(values, "listType", ""),
          isBookSelectionEnabled: _get(values, "bookSelection", false),
          isCategoriesEnabled: _get(values, "categoriesControl", false),
        },
        swimlanes: {
          isEnabled: _get(values, "swimlane", false),
          lanes: tableData || [],
        },
      },
    };
    fieldValues.profileJson = JSON.stringify(fieldValues.profileJson);
    try {
      if (id) {
        await updateDesigner(id, fieldValues);
      } else {
        await addDesigner(fieldValues);
      }
      history.goBack();
      console.log("Success:", values);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteSwimlane = () => {
    let updateSwimlanes = [...tableData];

    for (let i = 0; i < rowsSelectedKey.length; i += 1) {
      updateSwimlanes = updateSwimlanes.filter(swimlane => swimlane.swimlaneId !== rowsSelectedKey[i]);
    }
    setTableData(updateSwimlanes);
  };

  const changeData = () => {
    setFilterData(null);
  };

  const onClose = () => {
    setVisibility(false);
    setFilterData(null);
  };

  useEffect(() => {
    getDesigner(id);
  }, []);

  // useEffect(() => {
  //   if (!visibility) {
  //     form.resetFields();
  //   }
  // }, [visibility]);

  useEffect(() => {
    if (!_isEmpty(designer) && !loading) {
      setFormValues();
    }
  }, [designer, loading]);

  const columns = [
    {
      title: "Swimlane Code",
      dataIndex: "swimlaneId",
      key: "swimlaneId",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Is Seperate Screen",
      dataIndex: "isSeperateScreen",
      key: "isSeperateScreen",
      render: text => (text ? "Yes" : "No"),
    },
    {
      title: "Card Type",
      dataIndex: "cardType",
      key: "cardType",
    },
    {
      title: "Presentation Type",
      dataIndex: "presentationType",
      key: "presentationType",
    },
    {
      title: "List Item",
      dataIndex: "listItem",
      key: "listItem",
    },
    {
      title: "Action",
      dataIndex: "swimlaneId",
      key: "swimlaneId",
      align: "center",
      render: text => (
        <Button onClick={() => showDrawer(text)} type="link">
          <CustomIcon name="PushpinOutlined" />
        </Button>
      ),
    },
  ];

  const _rowSelection = {
    selectedRowKeys: rowsSelectedKey,
    onChange: (selectedRowKeys, selectedRows) => {
      setRowsSelected(selectedRows);
      setRowsSelectedKey(selectedRowKeys);
    },
  };

  const showDrawer = text => {
    if (text === "ADD") {
      setVisibility(true);
      setTitle("Add Swimlane");
      const d = uuidv4();
      setData(d);
    } else {
      const Data = tableData.find(data => data.swimlaneId === text);
      setTitle("Edit Swimlane");
      setFilterData(Data);
      setVisibility(true);
    }
  };

  const setFormValues = () => {
    const values = { ...designer };
    values.profileJson = values.profileJson ? JSON.parse(values.profileJson) : {};
    form.setFieldsValue({
      lppId: values.id,
      enableSearchControl: _get(values, "profileJson.searchControl.isEnabled", false),
      filterFunction: _get(values, "profileJson.searchControl.isFilterEnabled", false),
      enableMainCarousel: _get(values, "profileJson.mainCarousel.isEnabled", false),
      listTitle: _get(values, "profileJson.list.title", ""),
      listType: _get(values, "profileJson.list.type", ""),
      bookSelection: _get(values, "profileJson.list.isBookSelectionEnabled", false),
      categoriesControl: _get(values, "profileJson.list.isCategoriesEnabled", false),
      swimlane: _get(values, "profileJson.swimlanes.isEnabled", false),
    });
    setTableData(_get(values, "profileJson.swimlanes.lanes", []));
  };

  const formValues = (type, value) => {
    const data = tableData;
    let fData = [...data];
    if (type === "EDIT") {
      fData = data.map(d => {
        if (d.swimlaneId === value.swimlaneId) {
          return value;
        }
        return d;
      });
    } else {
      fData.push(value);
    }
    setTableData([...fData]);
  };

  return (
    <Fragment>
      <Form
        className="landing-page-designer"
        id="landing-page-designer"
        form={form}
        layout="vertical"
        name="nest-messages"
        initialValues={{ status: STATUS.NON_VERIFIED }}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="LPP Code" name="lppId">
              <Input readOnly placeholder="LPP Code" />
            </Form.Item>
            <Form.Item
              className="flex-direction-row"
              label="Enable Search Control"
              name="enableSearchControl"
              valuePropName="checked"
            >
              <Switch className="mg-left-20" />
            </Form.Item>
            <Form.Item
              className="flex-direction-row"
              label="Enable advance filter function"
              name="filterFunction"
              valuePropName="checked"
            >
              <Switch className="mg-left-20" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item
              className="flex-direction-row"
              label="Enable Main Carousel"
              name="enableMainCarousel"
              valuePropName="checked"
            >
              <Switch className="mg-left-20" />
            </Form.Item>
            {/* <Form.Item name="categoriesControl" label="List" /> */}
            <h3>List</h3>
            <Form.Item label="Title" name="listTitle" rules={[{ required: true }]}>
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="listType" label="List Type" rules={[{ required: true }]}>
              <Select placeholder="List Type">
                <Option value="brand">Brand</Option>
                <Option value="outlet">Outlet</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="flex-direction-row"
              label=" Enable Book Selection"
              name="bookSelection"
              valuePropName="checked"
            >
              <Switch className="mg-left-20" />
            </Form.Item>
            <Form.Item
              className="flex-direction-row"
              label=" Enable Categories Control "
              name="categoriesControl"
              valuePropName="checked"
            >
              <Switch className="mg-left-20" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row className="fields-row" gutter={20} type="flex">
          <Col className="text-left" span={8} xs={24} sm={8} lg={8}>
            <Form.Item
              className="flex-direction-row"
              name="swimlane"
              label=" Enable SwimLanes "
              valuePropName="checked"
            >
              <Switch className="mg-left-20" />
            </Form.Item>
          </Col>
        </Row>
        <Table
          pagination={false}
          columns={columns}
          dataSource={tableData}
          loading={loading}
          rowSelection={{ ..._rowSelection }}
          rowKey="swimlaneId"
        />
        {/* 
        <Divider /> */}

        <Row className="fields-row mg-top-20 text-right" justify="end" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}></Col>
          {/* <Col span={8} xs={24} sm={8} lg={8}></Col> */}
          <Col span={8} xs={24} sm={12} lg={12}>
            <div className="swimlane-flex">
              <Button type="primary" onClick={() => showDrawer("ADD")}>
                Add Swimlane
              </Button>
              <Button type="primary" onClick={deleteSwimlane}>
                Delete Swimlane
              </Button>
            </div>
          </Col>
        </Row>

        <Divider />
        <Row className="fields-row" justify="end" type="flex">
          <Col>
            <Link to={`/swim-lane-manager/${id}`}>
              <Button className="action-btn mg-right-50">Show Manager</Button>
            </Link>
            <Button className="action-btn mg-right-50" type="info" onClick={() => history.goBack()}>
              Cancel
            </Button>
            <Button className="action-btn" type="primary" htmlType="submit" form="landing-page-designer">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
      <AddSwimlaneDrawer
        filterData={filterData}
        id={id}
        visibility={visibility}
        onClose={onClose}
        formValues={formValues}
        datas={datas}
        title={title}
        setFilter={changeData}
      />
    </Fragment>
  );
};
LandingPageDesigner.defaultProps = {};

LandingPageDesigner.propTypes = {
  loading: PropTypes.bool,
  designer: PropTypes.object,
  getDesigner: PropTypes.func,
  history: PropTypes.func,
  addDesigner: PropTypes.func,
  error: PropTypes.object,
  updateDesigner: PropTypes.func,
};

export default LandingPageDesigner;
