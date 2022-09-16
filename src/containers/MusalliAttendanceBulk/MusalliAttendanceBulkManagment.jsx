/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import PropTypes, { func } from "prop-types";
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
function MusalliAttendanceBulkManagment(props) {
  const {
    loading,
    enableDisableAdmin,
    pagination,
    deleteAdminUsers,
    getMusalliAttendanceBulk,
    list,
    mosqueOptionlist,
    mosqueOptionLoading,
  } = props;
  const array = [];
  const [form] = Form.useForm();
  const [date, setDate] = useState("");
  const [value, setValue] = useState([]);
  const [rows, setRows] = useState([]);
  const [payload, setPayload] = useState([]);
  const getList = async query => {};
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    console.log(payload, "payloadpayload");
  }, [payload]);
  useEffect(() => {
    value.map(currentElement =>
      array.push({
        sessionIdPk: 1,
        participantIdPk: currentElement.id,
        attendanceDate: "",
        attendanceStatus: "PRESENT",
      }),
    );
    setPayload(array);
  }, [value]);
  useEffect(() => {
    setColumns([
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
        render: (text, record) => (
          <Select
            key={record.id}
            onChange={val => attendanceChange(val, record.id)}
            defaultValue="PRESENT"
            disabled={!rows.includes(record && record.id)}
          >
            <Option value="PRESENT">Present</Option>
            <Option value="ABSENT">Absent</Option>
          </Select>
        ),
      },
    ]);
  }, [rows]);
  const attendanceChange = (val, id) => {
    payload.map(currentElement => {
      if (currentElement.participantIdPk === id) {
        currentElement.attendanceStatus = val;
      }
      return 0;
    });
  };
  const saveTableValues = () => {
    // if(date!==""){
    // }
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
    text: "Add Mosque",
    route: ROUTES.ADD_MUSALLI_MOSQUE_USER.path,
  };

  const getRowIds = ids => {
    setRows(ids);
    // ids.map((x)=>{
    // console.log(form.getFieldValue("attendance"),"aaaaa")
    // })
    console.log(ids, "idid");
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
        getRowIds={getRowIds}
        // canAdd={canAddUser}
        // canDelete={canDeleteUser}
      />
      <Row className="fields-row" type="flex" justify="center">
        <Col span={4} xs={24} sm={12} lg={4}>
          <Button type="primary" disabled={rows.length === 0} onClick={saveTableValues}>
            Save
          </Button>
        </Col>
      </Row>
    </>
  );
}

MusalliAttendanceBulkManagment.propTypes = {
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
