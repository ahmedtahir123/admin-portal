/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Divider, Form, Row, Select } from "antd";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";
import { VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";

const { Option } = Select;
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Father Name",
    dataIndex: "fatherName",
    key: "fatherName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Attendance",
    key: "attendance",
    render: record => (
      <Row>
        <Col span={12} xs={24} sm={12} lg={12}>
          <Select
            defaultValue="present"
            // disabled="true"
          >
            {/* style={{ width: 120 }} onChange={handleChange} */}
            <Option value="present">Present</Option>
            <Option value="absent">Absent</Option>
          </Select>
        </Col>
      </Row>
    ),
  },
];

function MusalliAttendanceBulkManagment(props) {
  const {
    loading,
    enableDisableAdmin,
    pagination,
    deleteAdminUsers,
    getMusalliAttendanceBulk,
    list,
    getAllActiveMosqueBySession,
    mosqueOptionlist,
    mosqueOptionLoading,
  } = props;
  const [form] = Form.useForm();
  const [date, setDate] = useState("");
  const [value, setValue] = useState([]);

  const getList = async query => {};

  useEffect(() => {
    const getMosque = async () => {
      await getAllActiveMosqueBySession();
    };
    getMosque();
  }, []);

  const canAddUser = permissionsUtil.checkAuth({
    category: "MusalliManagement",
    subCategory: "Musalli",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "MusalliManagement",
    subCategory: "Musalli",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "MusalliManagement",
    subCategory: "Musalli",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Mosque",
    route: ROUTES.ADD_MUSALLI_MOSQUE_USER.path,
  };

  // useEffect(() => {
  //   if (pagination.pageable) {
  //     {
  //       const query = { size: pagination.pageable.pageSize };
  //       getList(query);
  //     }
  //   } else getList();
  // }, []);

  // const onEnable = {
  //   handler: enableDisableAdmin,
  //   text: "Enable",
  // };

  // const onDisable = {
  //   handler: enableDisableAdmin,
  //   text: "Disable",
  // };

  const onFormFinish = async val => {
    await getMusalliAttendanceBulk(val?.mosque);
  };

  useEffect(() => {
    const convertList = Object.values(list);
    const listArr = [];
    // eslint-disable-next-line array-callback-return
    convertList.map(val => {
      // eslint-disable-next-line array-callback-return
      // eslint-disable-next-line no-unused-expressions
      val.length > 0 && val.map(val2 => listArr.push(val2));
    });
    setValue(listArr);
  }, [list]);

  const onClear = () => {
    form.resetFields();
  };
  return (
    <>
      <Form
        hideRequiredMark
        className="add-remove-voucher"
        form={form}
        initialValues={{
          selectedBrand: "Select Masjid",
          selectedLocation: "Select Location",
          selectedOutlet: "Select Outlet",
        }}
        layout="vertical"
        name="nest-messages"
        onFinish={onFormFinish}
      >
        <Row className="fields-row" gutter={[20, 12]} type="flex">
          <Col span={12} xs={24} sm={12} lg={12}>
            <Form.Item name="mosque" rules={[{ required: true, message: "Mosque is required!" }]}>
              <Select
                showSearch
                placeholder="Select Mosque"
                optionFilterProp="children"
                loading={mosqueOptionLoading}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {mosqueOptionlist?.length > 0 &&
                  mosqueOptionlist?.map(item => (
                    <Select.Option key={item.code} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} xs={24} sm={12} lg={12}>
            <Form.Item name="date" rules={[{ required: false, message: "Please Select Date!" }]}>
              <DatePicker style={{ width: "600px" }} onChange={(_, string) => setDate(string)} />
            </Form.Item>
          </Col>
          {/* <Divider /> */}
          <Col span={4} xs={24} sm={12} lg={4}>
            <Button type="primary" htmlType="submit" onClick={() => {}}>
              Get Attendance
            </Button>
          </Col>
          <Col span={4} xs={24} sm={12} lg={4}>
            <Button onClick={onClear}>Clear</Button>
          </Col>
          <Col span={4} xs={24} sm={12} lg={4}>
            <Button type="primary" onClick={() => {}}>
              Export Attendance
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider />

      <PageTitle title="Attendance Bulk" />
      <ListView
        dataSource={value}
        columns={columns}
        loading={loading}
        rowKey="id"
        addButton={addButton}
        pagination={pagination}
        deleteAllData={deleteAdminUsers}
        getList={getList}
        // enableButton={onEnable}
        // disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        rowSelection={false}
        // canAdd={canAddUser}
        // canDelete={canDeleteUser}
      />
      <Row className="fields-row" type="flex" justify="center">
        <Col span={4} xs={24} sm={12} lg={4}>
          <Button
            type="primary"
            //   disabled="true"
          >
            Save
          </Button>
        </Col>
      </Row>
    </>
  );
}

MusalliAttendanceBulkManagment.propTypes = {
  getAllActiveMosqueBySession: PropTypes.func,
  getMusalliAttendanceBulk: PropTypes.func,
  list: PropTypes.array,
  mosqueOptionlist: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  mosqueOptionLoading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default MusalliAttendanceBulkManagment;
