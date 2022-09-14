/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Col, Divider, Form, Row, Select } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ListView from "../../components/ListView/ListView";
import PageTitle from "../../components/PageTitle/PageTitle";
import ROUTES from "../../routes/constant.route";
import permissionsUtil from "../../utils/permissions.util";

const columns = [
  {
    title: "Attendance Date",
    dataIndex: "attendanceDate",
    key: "attendanceDate",
    render: record => record?.join("-"),
    sorter: true,
  },
  {
    title: "Participant Name",
    dataIndex: "participantName",
    key: "participantName",
  },
  {
    title: "Participant Father Name",
    dataIndex: "participantFatherName",
    key: "participantFatherName",
  },
  {
    title: "Participant Contact",
    dataIndex: "participantContact",
    key: "participantContact",
    render: record => `${record}`,
  },
];

function MusalliAttendanceDetailReportManagment(props) {
  const {
    loading,
    enableDisableAdmin,
    pagination,
    deleteAdminUsers,
    getAttendanceDetailReport,
    list,
    mosqueOptionlist,
    mosqueOptionLoading,
    activeSessionList,
  } = props;
  const [form] = Form.useForm();
  const [value, setValue] = useState([]);

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

  const onFormFinish = async val => {
    await getAttendanceDetailReport(val?.mosque);
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

  return (
    <>
      <Form
        hideRequiredMark
        className="add-remove-voucher"
        form={form}
        initialValues={{
          selectedBrand: "Select Mosque",
          selectedLocation: "Select Location",
          selectedOutlet: "Select Outlet",
        }}
        layout="vertical"
        name="nest-messages"
        onFinish={onFormFinish}
      >
        <Row className="fields-row" gutter={20} type="flex" justify="space-between">
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
          {/* <Divider /> */}
          <Col span={8} xs={24} sm={12} lg={4}>
            <Button type="primary" htmlType="submit" onClick={() => {}}>
              Search
            </Button>
          </Col>
          <Col span={8} xs={24} sm={12} lg={4}>
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              Reset filters
            </Button>
          </Col>
          <Col span={8} xs={24} sm={12} lg={4}>
            <Button type="primary" onClick={() => {}}>
              Export Attendance
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider />

      <PageTitle title="Attendance Detail Report" />
      <ListView
        dataSource={value}
        columns={columns}
        loading={loading}
        rowKey="participantId"
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
    </>
  );
}

MusalliAttendanceDetailReportManagment.propTypes = {
  getAttendanceDetailReport: PropTypes.func,
  list: PropTypes.array,
  mosqueOptionlist: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  mosqueOptionLoading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
  activeSessionList: PropTypes.array,
};

export default MusalliAttendanceDetailReportManagment;
