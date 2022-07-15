import { Button, Col, Divider, Drawer, Form, Input, Row, Select, Table } from "antd";
import _map from "lodash/map";
import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback } from "react";
import { ADDRESS_TABLE_COLUMNS, VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";
import { filterCities } from "../../utils/utils";

const { Option } = Select;
const AddressManagementDrawer = ({ data, visible, onSave, onCancel, province, cities }) => {
  const [form] = Form.useForm();
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [_addresses, _setAddresses] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(data.province || "");
  const [filteredCities, setCities] = useState([]);
  const getTableColumns = useCallback(
    () => [
      {
        title: "Complete Address",
        dataIndex: "addressName",
        key: "addressName",
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        render: val => {
          const city = cities.length ? cities.find(item => item.code === val) : "";
          return city ? city.name : "";
        },
      },
      {
        title: "Area",
        dataIndex: "area",
        key: "area",
      },
    ],
    [cities],
  );
  useEffect(() => {
    if (data.length) {
      _setAddresses(data);
    }
  }, [data]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedAddress(selectedRows);
      setSelectedRowKeys(selectedKeys);
    },
  };

  const removeSelectedAddr = () => {
    const leftAddress = _addresses.filter(addr => !selectedAddress.find(s => s.id === addr.id));
    _setAddresses(leftAddress);
    setSelectedAddress([]);
    setSelectedRowKeys([]);
  };

  const addAddress = values => {
    _setAddresses([..._addresses, values]);
    form.resetFields();
  };

  const keyExtractor = record => record.id;

  const onClickSave = () => {
    onSave(_addresses);
  };

  const _onCancel = () => {
    form.resetFields();
    _setAddresses(data);
    setSelectedAddress([]);
    setSelectedRowKeys([]);
    onCancel();
  };

  const onProvinceChange = value => {
    setSelectedProvince(value);
    setCities(filterCities(value, cities));
  };

  return (
    <Drawer
      title="Address Management"
      width={720}
      onClose={onCancel}
      visible={visible}
      footer={
        <div className="text-right">
          <Button className="action-btn mg-right-8" onClick={_onCancel}>
            Cancel
          </Button>
          <Button className="action-btn" onClick={onClickSave} type="primary">
            Save
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        onFinish={addAddress}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={24}>
            <Form.Item label="Addresses">
              <Table
                bordered
                rowKey={keyExtractor}
                dataSource={_addresses}
                rowSelection={{
                  type: "checkbox",
                  ...rowSelection,
                }}
                columns={getTableColumns()}
                pagination={false}
                scroll={{ y: 100 }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button disabled={_addresses.length <= 0} onClick={removeSelectedAddr}>
              Remove Selected
            </Button>
          </Col>
        </Row>
        <Divider />

        <Row>
          <Col span={24}>
            <Form.Item label="Area" name="area" rules={[{ required: true }]}>
              <Input placeholder="Area" />
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span={10}>
            <Form.Item label="Complete Address" name="addressName" rules={[{ required: true }]}>
              <Input placeholder="Address" />
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
          </Col>

          <Col span={10}>
            <Form.Item label="State / Province" name="province" rules={[{ required: true }]}>
              <Select placeholder="State" onChange={onProvinceChange}>
                {_map(province, prov => (
                  <Option key={prov.code} value={prov.code}>
                    {prov.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button className="action-btn" htmlType="submit" type="primary">
              Add New
            </Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
AddressManagementDrawer.propTypes = {
  data: PropTypes.array,
  visible: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  province: PropTypes.array,
  cities: PropTypes.array,
};
export default AddressManagementDrawer;
