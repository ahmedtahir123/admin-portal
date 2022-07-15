import React, { useState } from "react";
import "./AddVariationQuestion.scss";
import { Drawer, Button, Form, Row, Col, Select, Table, Divider, Input, InputNumber, Checkbox } from "antd";
import PropTypes from "prop-types";
import { VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";

const { Option } = Select;

const AddVariationQuestionContainer = ({ visible, close }) => {
  const [form] = Form.useForm();
  const VARIATION_QUES_OPTIONS_COL = [
    {
      title: "Option Text",
      dataIndex: "optionText",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
  ];

  const [questionOptions, setQuestionOptions] = useState([]);

  const onFormFinish = () => {};

  const onSubmitClick = () => {};

  const onOptionsModify = () => {
    const optionText = form.getFieldValue("option");
    const price = form.getFieldValue("price");
    if (optionText && price)
      setQuestionOptions([
        ...questionOptions,
        {
          optionText,
          price,
        },
      ]);
  };

  const onOptionsReset = () => {
    setQuestionOptions([]);
    form.setFieldsValue({ optionText: "", price: "" });
  };

  return (
    <>
      <Drawer
        title="Add Variation Question"
        width={720}
        visible={visible}
        closable={false}
        maskClosable={false}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={close}
        footer={
          <div className="text-right">
            <Button onClick={close} className="mg-right-10">
              Cancel
            </Button>
            <Button onClick={onSubmitClick} type="primary">
              Save
            </Button>
          </div>
        }
      >
        <Form
          hideRequiredMark
          form={form}
          layout="vertical"
          name="itemVariationQuestionForm"
          onFinish={onFormFinish}
          validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
          initialValues={{ selectionType: "multiple" }}
        >
          <Form.Item label="Question Text" name="question" rules={[{ required: true }]}>
            <Input placeholder="Question Text" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea maxLength="500" rows={3} placeholder="Description" />
          </Form.Item>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="isRequired" valuePropName="checked">
                <Checkbox>Is Required</Checkbox>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Row>
                <Col span={12} className="text-right pad-top-5 pad-right-10">
                  Selection Type
                </Col>
                <Col span={12}>
                  <Form.Item name="selectionType">
                    <Select>
                      <Option value="single">Single</Option>
                      <Option value="multiple">Multiple</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item name="questionOptions">
            <Table
              bordered
              dataSource={questionOptions}
              columns={VARIATION_QUES_OPTIONS_COL}
              rowKey="code"
              pagination={false}
              size="small"
              scroll={{ y: 100 }}
              rowSelection
            />
          </Form.Item>

          <Divider />

          <Form.Item label="Option Text" name="option">
            <Input placeholder="Option Text" />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ type: "number" }]}>
            <InputNumber className="input-number-full-width" placeholder="Price" />
          </Form.Item>

          <div className="text-right">
            <Button className="mg-right-10" onClick={onOptionsReset}>
              Reset
            </Button>
            <Button onClick={onOptionsModify}>Modify</Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

AddVariationQuestionContainer.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
};

export default AddVariationQuestionContainer;
