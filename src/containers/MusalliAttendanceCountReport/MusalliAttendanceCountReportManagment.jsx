/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Col, DatePicker, Divider, Form, Row, Select, Space } from "antd";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";
import { VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Masjid Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Absent",
    dataIndex: "absent_participants",
    key: "absent_participants",
    sorter: true,
  },
  {
    title: "Present",
    dataIndex: "present_participants",
    key: "present_participants",
    sorter: true,
  },
  {
    title: "Total",
    dataIndex: "total_participants",
    key: "total_participants",
    sorter: true,
  },
  {
    title: "Full Attendance Participant",
    dataIndex: "full_attendance_participants",
    key: "full_attendance_participants",
    sorter: true,
  },
];

function MusalliAttendanceCountReportManagment(props) {
  const { loading, enableDisableAdmin, pagination, getMusalliAttendanceCountReport, deleteAdminUsers, list } = props;
  const [form] = Form.useForm();
  const [date, setDate] = useState("");

  const getList = async query => {};

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

  const onFormFinish = async fieldValue => {
    await getMusalliAttendanceCountReport(date.toString());
  };

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
        <Row className="fields-row" gutter={20} type="flex" justify="space-between">
          <Col span={12} xs={24} sm={12} lg={12}>
            <Form.Item name="date" rules={[{ required: true, message: "Please Select Date!" }]}>
              <DatePicker style={{ width: "600px" }} onChange={(_, string) => setDate(string)} />
            </Form.Item>
          </Col>
          {/* <Divider /> */}
          <Col span={8} xs={24} sm={12} lg={4}>
            <Button type="primary" htmlType="submit" onClick={() => {}}>
              Get Attendance
            </Button>
          </Col>
          <Col span={8} xs={24} sm={12} lg={4}>
            <Button onClick={onClear}>Clear</Button>
          </Col>
          <Col span={8} xs={24} sm={12} lg={4}>
            <Button type="primary" onClick={() => {}}>
              Export Attendance
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider />

      <PageTitle title="Attendance Count Report" />
      <ListView
        dataSource={list}
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
        // canAdd={canAddUser}
        // canDelete={canDeleteUser}
      />
    </>
  );
}

MusalliAttendanceCountReportManagment.propTypes = {
  getMusalliAttendanceCountReport: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default MusalliAttendanceCountReportManagment;
