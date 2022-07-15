import React, { useState, useEffect } from "react";
import { Form, Input, Select, Switch, Drawer, Button, InputNumber } from "antd";
import PropTypes from "prop-types";
import _get from "lodash/get";
import {
  STATUS,
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  CardTypes,
  PresentationTypes,
  LaneTypes,
} from "../../utils/constants";

const AddSwimlaneDrawer = props => {
  const { visibility, onClose, formValues, id, datas, title, setFilter } = props;
  const { filterData } = props;
  // const [title, setTitle] = useState("");

  const [form] = Form.useForm();
  const { Option } = Select;

  const onFormFinish = values => {
    console.log("Success:", values);
    // values.isSeperateScreen = values.isSeperateScreen ? "YES" : "NO";
    if (title === "Edit Swimlane") {
      formValues("EDIT", values);
    } else {
      formValues("ADD", values);
    }
    onCancel();
  };
  const onCancel = () => {
    form.resetFields();

    onClose();
  };

  useEffect(() => {
    if (filterData) {
      form.setFieldsValue({
        swimlaneId: filterData.swimlaneId,
        title: filterData.title,
        type: filterData.type,
        isSeperateScreen: _get(filterData, "isSeperateScreen", false),
        presentationType: filterData.presentationType,
        listItem: filterData.listItem,
        cardType: filterData.cardType,
      });
      // setTitle("Edit Swimlane");
    } else {
      setFilter();
      form.resetFields();
      form.setFieldsValue({ swimlaneId: datas });
      //   setTitle("Add Swimlane");
    }
  }, [filterData, datas]);

  // useEffect(() => {
  //     //   if (filterData) {
  //     form.setFieldsValue({
  //       swimlaneId: filterData.swimlaneId,
  //       title: filterData.title,
  //       type: filterData.type,
  //       isSeperateScreen: _get(filterData, "isSeperateScreen", false),
  //       presentationType: filterData.presentationType,
  //       listItem: filterData.listItem,
  //       cardType: filterData.cardType,
  //     });
  //     //  setTitle("Edit Swimlane");
  //   } else {
  //     // setTitle("Add Swimlane");
  //     setFilter();
  //     form.setFieldsValue()
  //     form.resetFields();
  //   }
  // });

  // form.setFieldsValue({ swimlaneId: datas });
  return (
    <Drawer
      footer={
        <div className="text-right">
          <Button className="action-btn mg-right-8" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="action-btn" type="primary" htmlType="submit" form="designer">
            Save
          </Button>
        </div>
      }
      width={720}
      id="drawer"
      title={title}
      placement="right"
      closable={false}
      maskClosable={false}
      visible={visibility}
    >
      <Form
        id="designer"
        form={form}
        layout="vertical"
        initialValues={{ status: STATUS.NON_VERIFIED }}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Form.Item label="Swimlane ID" name="swimlaneId" rules={[{ required: true }]}>
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Swimlane Title" name="title" rules={[{ max: 25, required: true }]}>
          <Input placeholder="Swimlane Title" />
        </Form.Item>
        <Form.Item name="type" label=" Type">
          <Select placeholder="Type">
            {Object.keys(LaneTypes).map(item => (
              <Option value={LaneTypes[item].name}>{LaneTypes[item].value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Has Seperate Screen" name="isSeperateScreen" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="cardType" label="Card Type">
          <Select placeholder="Card Type">
            {Object.keys(CardTypes).map(item => (
              <Option value={CardTypes[item].name}>{CardTypes[item].value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="presentationType" label="Presentation Type">
          <Select placeholder="Presentation Type">
            {Object.keys(PresentationTypes).map(item => (
              <Option value={PresentationTypes[item].name}>{PresentationTypes[item].value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="listItem" label="After N List Item">
          <InputNumber min={0} defaultValue={3} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddSwimlaneDrawer;

// AddSwimlaneDrawer.defaultProps = {
//   filterData: [],
// };

AddSwimlaneDrawer.propTypes = {
  filterData: PropTypes.object,
  onClose: PropTypes.func,
  visibility: PropTypes.bool,
  id: PropTypes.string,
  formValues: PropTypes.func,
  title: PropTypes.string,
  datas: PropTypes.string,
  setFilter: PropTypes.func,
};
