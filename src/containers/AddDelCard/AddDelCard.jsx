import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Drawer, Button, Row, Col, Input, Form, Checkbox, Divider, Table } from "antd";
import AddEditCard from "./AddEditCard";
import defaultLogo from "../../images/listing-card.svg";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

function AddDelCard({ visible, close, onSave, swimlaneData, lppInfo, type }) {
  const [tableData, setTableData] = useState([]);
  const [childDrawerVisible, setChildDrawerVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (lppInfo && swimlaneData && type) {
      form.setFieldsValue({
        ...lppInfo,
        laneName: swimlaneData.name,
        type,
      });
      setTableData(swimlaneData.dataSource);
    }
  }, [lppInfo, swimlaneData, type]);

  const footer = () => (
    <Row justify="space-evenly" align="middle">
      <Col span={6} xs={24} sm={6} lg={6}>
        Total Items: <b>{tableData && tableData.length}</b>
      </Col>
      <Col span={18} xs={24} sm={18} lg={18}>
        <Row justify="end" type="flex" align="middle" gutter={10}>
          <Col className="text-right" span={8} xs={24} sm={24} lg={8} onClick={_onClose}>
            <Button type="secondary" htmlType="submit">
              Cancel
            </Button>
          </Col>
          <Col className="text-right" span={8} xs={24} sm={24} lg={8}>
            <Button type="primary" htmlType="submit" onClick={_onSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  const options = [
    { label: "Swimlane", value: "SWIMLANE" },
    { label: "Carousel", value: "CAROUSEL" },
  ];

  const _columns = [
    {
      title: "Card Image",
      dataIndex: "imageUrl",
      render: imageUrl => (
        <img className="card-img" src={(imageUrl && imageUrl.url) || imageUrl || defaultLogo} alt="pic1" />
      ),
    },
    { title: "Minor Text 1", dataIndex: "minorText1", key: "minorText1" },
    { title: "Minor Text 2", dataIndex: "minorText2", key: "minorText2" },
    { title: "Card Type", dataIndex: "cardType", key: "cardType" },
    {
      title: "Actions",
      render: (text, record, index) => (
        <Row justify="space-evenly" align="middle">
          <Col span={6} xs={24} sm={12} lg={12}>
            <Button
              onClick={() => deleteSelected(record, index)}
              type="link"
              icon={<CustomIcon name="DeleteOutlined" />}
            ></Button>
          </Col>
          <Col span={6} xs={24} sm={12} lg={12}>
            <Button
              type="link"
              onClick={() => openChildDrawer(record, index)}
              icon={<CustomIcon name="EditOutlined" />}
            />
          </Col>
        </Row>
      ),
      align: "center",
    },
  ];
  const deleteSelected = (record, index) => {
    const newTable = [...tableData];
    newTable.splice(index, 1);
    setTableData(newTable);
  };
  const openChildDrawer = (record, index) => {
    setSelectedCard(record);
    setSelectedCardIndex(index);
    setChildDrawerVisible(true);
  };
  const _onChildClose = () => {
    setSelectedCard({});
    setSelectedCardIndex(null);
    setChildDrawerVisible(false);
  };
  const _onChildSave = newCard => {
    const newTable = [...tableData];
    if (selectedCardIndex !== null) newTable[selectedCardIndex] = newCard;
    else newTable.push(newCard);
    setTableData(newTable);
    // _onChildClose();
  };
  const _onSave = () => {
    onSave(tableData);
    _onClose();
  };

  const _onClose = () => {
    form.resetFields();
    setTableData([]);
    close();
  };

  return (
    <Drawer
      title="Manage Cards"
      width={720}
      onClose={close}
      visible={visible}
      bodyStyle={{ paddingBottom: "100px" }}
      footer={footer()}
      maskClosable={false}
      closable={false}
      keyboard={false}
    >
      <Form id="designer" form={form} layout="vertical">
        <Form.Item required label="LPP ID" name="lppId">
          <Input placeholder="LPP ID" readOnly />
        </Form.Item>
        <Form.Item required label="LPP Name" name="lppName">
          <Input placeholder="Landing Page Name" readOnly />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Checkbox.Group options={options} disabled />
        </Form.Item>
        <Form.Item label="Lane Name" name="laneName">
          <Input placeholder="Lane Name" readOnly />
        </Form.Item>
        <div className="text-right mg-top-20">
          <Button type="primary" onClick={() => openChildDrawer(null, null)}>
            Add New
          </Button>
        </div>
        <Divider orientation="center" className="form-divider first">
          All Cards
        </Divider>
        <Table columns={_columns} dataSource={tableData} pagination={false} scroll={{ x: 240 }} />
        <AddEditCard
          visible={childDrawerVisible}
          data={selectedCard}
          onSave={_onChildSave}
          onClose={_onChildClose}
          swimLaneId={swimlaneData.id}
          isUpdate={!!swimlaneData.id}
        />
      </Form>
    </Drawer>
  );
}

AddDelCard.defaultProps = {
  visible: false,
};

AddDelCard.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  onSave: PropTypes.func,
  swimlaneData: PropTypes.object,
  lppInfo: PropTypes.object,
  type: PropTypes.string,
};

export default AddDelCard;
