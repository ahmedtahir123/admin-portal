/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
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
    title: "Attendance Date",
    dataIndex: "mosqueName",
    key: "mosqueName",
    sorter: true,
  },
  {
    title: "Participant Name",
    dataIndex: "mosqueName",
    key: "mosqueName",
    sorter: true,
  },
  {
    title: "Participant Father Name",
    dataIndex: "locationName",
    key: "locationName",
  },
  {
    title: "Participant Contact",
    dataIndex: "locationName",
    key: "locationName",
  },
];
const brandsArr = [
  { code: 1, name: "All Participant With Session" },
  { code: 2, name: "Participant With Session And Mosque" },
  { code: 3, name: "Participant" },
  { code: 4, name: "All Volunteer With Session" },
  { code: 5, name: "Volunteer With Session And Mosque" },
  { code: 6, name: "Volunteer" },
];

function SMSUtilityManagment(props) {
  const {
    loading,
    enableDisableAdmin,
    pagination,
    getAdminUsers,
    deleteAdminUsers,
    list,
    getAllActiveMosqueBySession,
    mosqueOptionlist,
    mosqueOptionLoading,
    getMusalliParticipant,
    participantOptionList,
    participantOptionLoading,
    getMusalliVolunteer,
    volunteerOptionLoading,
    volunteerOptionList,
  } = props;
  const [form] = Form.useForm();
  const [fieldsToShow, setFieldsToShow] = useState(1);
  //  useEffect(()=>{
  //   console.log(fieldsToShow)
  //  },[fieldsToShow])
  const getList = async query => {
    await getAdminUsers(query);
  };

  useEffect(() => {
    const getMosque = async () => {
      await getAllActiveMosqueBySession();
    };
    getMosque();
    const getParticipant = async () => {
      await getMusalliParticipant();
    };
    getParticipant();
    const getVolunteer = async () => {
      await getMusalliVolunteer();
    };
    getVolunteer();
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

  const onFormFinish = () => {};
  const { TextArea } = Input;

  return (
    <>
      <PageTitle title="SMS Utility Form" />

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
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex" justify="space-between">
          <Col span={12} xs={24} sm={12} lg={24}>
            <Form.Item name="brandCode" rules={[{ required: true }]} label="Send Message to">
              <Select
                showSearch
                defaultValue={brandsArr[0].name}
                optionFilterProp="children"
                loading={loading}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={value => setFieldsToShow(value)}
              >
                {brandsArr.map(item => (
                  <Select.Option key={item.code} value={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {(fieldsToShow === 2 || fieldsToShow === 5) && (
            <Col span={12} xs={24} sm={12} lg={24}>
              <Form.Item name="mosque" rules={[{ required: false }]} label="Mosque">
                <Select
                  showSearch
                  placeholder="Select Mosque"
                  optionFilterProp="children"
                  loading={mosqueOptionLoading}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  // onChange={(value)=>setFieldsToShow(value)}
                >
                  {mosqueOptionlist?.length > 0 &&
                    mosqueOptionlist?.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          )}
          {(fieldsToShow === 2 || fieldsToShow === 3) && (
            <Col span={12} xs={24} sm={12} lg={24}>
              <Form.Item name="participant" rules={[{ required: false }]} label="Participant">
                <Select
                  showSearch
                  placeholder="All"
                  optionFilterProp="children"
                  loading={participantOptionLoading}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  // onChange={(value)=>setFieldsToShow(value)}
                >
                  {participantOptionList.content?.length > 0 &&
                    participantOptionList.content?.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))
                  // console.log(participantOptionList,'aaaa')
                  }
                </Select>
              </Form.Item>
            </Col>
          )}
          {(fieldsToShow === 5 || fieldsToShow === 6) && (
            <Col span={12} xs={24} sm={12} lg={24}>
              <Form.Item name="volunteer" rules={[{ required: false }]} label="Volunteer">
                <Select
                  showSearch
                  placeholder="Select Volunteer"
                  optionFilterProp="children"
                  loading={loading}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  // onChange={(value)=>setFieldsToShow(value)}
                >
                  {volunteerOptionList.content?.length > 0 &&
                    volunteerOptionList.content?.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))
                  // console.log(volunteerOptionList)
                  }
                </Select>
              </Form.Item>
            </Col>
          )}
          <Col span={8} xs={24} sm={12} lg={24}>
            <Form.Item name="message" rules={[{ required: true }]} label="Message">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={4}>
            <Button type="primary" onClick={() => {}}>
              Send <CustomIcon name="SendOutlined" />
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider />
    </>
  );
}

SMSUtilityManagment.propTypes = {
  getAllActiveMosqueBySession: PropTypes.func,
  getMusalliParticipant: PropTypes.func,
  getMusalliVolunteer: PropTypes.func,
  getAdminUsers: PropTypes.func,
  list: PropTypes.array,
  mosqueOptionlist: PropTypes.array,
  mosqueOptionLoading: PropTypes.bool,
  participantOptionList: PropTypes.array,
  participantOptionLoading: PropTypes.bool,
  volunteerOptionList: PropTypes.array,
  volunteerOptionLoading: PropTypes.bool,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default SMSUtilityManagment;
