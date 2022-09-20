/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Col, DatePicker, Divider, Form, Row, Select } from "antd";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

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
    sorter: true,
  },
  {
    title: "Father Name",
    dataIndex: "fatherName",
    key: "fatherName",
    sorter: true,
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "Date Of Birth",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
  },
  {
    title: "Document Submission Status",
    dataIndex: "documentSubmissionStatus",
    key: "documentSubmissionStatus",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: record => (
      <Row>
        <Col span={12} xs={24} sm={12} lg={12}>
          <Link to={`/landing-designer/${record.id}`}>
            <Button type="link">
              <CustomIcon name="EditOutlined" />
            </Button>
          </Link>
        </Col>
      </Row>
    ),
  },
];

function MusalliMosqueManagement(props) {
  const {
    loading,
    enableDisableAdmin,
    pagination,
    getMusalliParticipant,
    deleteAdminUsers,
    list,
    mosqueOptionlist,
    mosqueOptionLoading,
    activeSessionList,
  } = props;
  const [form] = Form.useForm();
  const [date, setDate] = useState("");
  const [value, setValue] = useState([]);
  const getList = async query => {
    await getMusalliParticipant(query);
  };

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
    text: "Add Participants",
    route: ROUTES.ADD_MUSALLI_PARTICIPANT_USER.path,
  };

  // useEffect(() => {
  //   if (pagination.pageable) {
  //     {
  //       const query = { size: pagination.pageable.pageSize };
  //       getList(query);
  //     }
  //   } else getList();
  // }, []);

  const onEnable = {
    handler: enableDisableAdmin,
    text: "Enable",
  };

  const onDisable = {
    handler: enableDisableAdmin,
    text: "Disable",
  };

  const onFormFinish = async val => {
    console.log(val, "valval");

    // https://dev-api.baitussalam.org:8450/api/role-admin/v1/participant/mosque/3/session/1
  };

  const onClear = () => {
    form.resetFields();
  };

  console.log(activeSessionList, "activeSessionList");

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
            <Form.Item name="session" rules={[{ required: true, message: "Session is required!" }]}>
              <Select
                showSearch
                placeholder="Select Session"
                optionFilterProp="children"
                loading={mosqueOptionLoading}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {activeSessionList?.length > 0 &&
                  activeSessionList?.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.description}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          {/* <Divider /> */}
          <Col span={4} xs={24} sm={12} lg={4}>
            <Button type="primary" htmlType="submit" onClick={() => {}}>
              Get Participant
            </Button>
          </Col>
          <Col span={4} xs={24} sm={12} lg={4}>
            <Button onClick={onClear}>Clear</Button>
          </Col>
          {/* <Col span={4} xs={24} sm={12} lg={4}>
            <Button type="primary" onClick={() => {}}>
              Export Attendance
            </Button>
          </Col> */}
        </Row>
      </Form>
      <Divider />
      <PageTitle title="All Participant" />
      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="id"
        addButton={addButton}
        pagination={pagination}
        deleteAllData={deleteAdminUsers}
        getList={getList}
        enableButton={onEnable}
        disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canAdd={canAddUser}
        canDelete={canDeleteUser}
      />
    </>
  );
}

MusalliMosqueManagement.propTypes = {
  getMusalliParticipant: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
  mosqueOptionlist: PropTypes.func,
  mosqueOptionLoading: PropTypes.func,
  activeSessionList: PropTypes.func,
};

export default MusalliMosqueManagement;
