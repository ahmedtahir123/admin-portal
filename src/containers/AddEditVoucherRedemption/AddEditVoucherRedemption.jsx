import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Row, Col, Divider, Spin, Modal } from "antd";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import QRCode from "qrcode.react";
import * as moment from "dayjs";
import { VALIDATE_FORM_MESSAGES_TEMPLATE, DATE_FORMAT_TIME, STATUS } from "../../utils/constants";
import ROUTES from "../../routes/constant.route";
import PageTitle from "../../components/PageTitle/PageTitle";
import { numberOnly } from "../../utils/utils";
import { StatusRadioButtons } from "../../components/StatusRadioButtons/StatusRadioButtons";

const AddEditVoucherRedemption = ({
  loading,
  voucherRedemption,
  getVoucherRedemptionById,
  addVoucherRedemption,
  redeemWithCode,
  redeemWithQR,
  history,
  isModalShow,
  voucherRedemptionModalChange,
}) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const isEditView = !!id;

  const inProgress = voucherRedemption && voucherRedemption.redeemedTicketStatus === STATUS.INPROGRESS;
  const isAuthCodeType = voucherRedemption && voucherRedemption.redemptionType === STATUS.REDEEMED_WITH_CODE;
  const isQRCodeType = voucherRedemption && voucherRedemption.redemptionType === STATUS.REDEEMED_WITH_QR;
  const isVerified = voucherRedemption && voucherRedemption.redeemedTicketStatus === STATUS.VERIFIED;
  let isRedeemWithAuthCodeBtnDisabled = isQRCodeType;
  let isRedeemWithQRCodeBtnDisabled = isAuthCodeType;
  let disableSaleAmount = !inProgress;
  let disableVoucherCode = !inProgress;

  if (!inProgress && !isVerified && !isAuthCodeType && !isQRCodeType) {
    isRedeemWithQRCodeBtnDisabled = true;
    isRedeemWithAuthCodeBtnDisabled = true;
  } else if (isAuthCodeType && isVerified) {
    isRedeemWithQRCodeBtnDisabled = false;
    isRedeemWithAuthCodeBtnDisabled = true;
  } else if (isQRCodeType && isVerified) {
    isRedeemWithQRCodeBtnDisabled = false;
    isRedeemWithAuthCodeBtnDisabled = true;
    disableVoucherCode = true;
    disableSaleAmount = false;
  } else if (isQRCodeType && !inProgress) {
    isRedeemWithQRCodeBtnDisabled = true;
    isRedeemWithAuthCodeBtnDisabled = true;
  } else if (isAuthCodeType && !inProgress) {
    isRedeemWithQRCodeBtnDisabled = true;
    isRedeemWithAuthCodeBtnDisabled = true;
  } else if ((isAuthCodeType || isQRCodeType) && !inProgress && !isVerified) {
    isRedeemWithQRCodeBtnDisabled = true;
    isRedeemWithAuthCodeBtnDisabled = true;
  } else if ((isAuthCodeType || isQRCodeType) && inProgress) {
    isRedeemWithQRCodeBtnDisabled = false;
    isRedeemWithAuthCodeBtnDisabled = false;
  }

  if (isVerified && isAuthCodeType) {
    disableSaleAmount = true;
  }

  if (isVerified && isQRCodeType) {
    disableSaleAmount = false;
  }

  const currentType = voucherRedemption.redemptionType ? voucherRedemption.redemptionType : "";
  const statusTypesButtonProps = {
    types: [
      { code: STATUS.REDEEMED_WITH_CODE, name: "Redeemed With Code" },
      { code: STATUS.REDEEMED_WITH_QR, name: "Redeemed With QR" },
    ],
    defaultValue: currentType,
  };

  const currentStatus = voucherRedemption && voucherRedemption.redeemedTicketStatus;

  const statusRadioButtonProps = {
    currentStatus: [
      { code: STATUS.INPROGRESS, name: "In Progress" },
      { code: STATUS.VERIFIED, name: "Verified" },
      { code: STATUS.REJECTED, name: "Rejected" },
      { code: STATUS.COMPLETED, name: "Completed" },
      { code: STATUS.WITHDRAWED, name: "Withdrawed" },
    ],
    defaultValue: isEditView ? STATUS[currentStatus] : STATUS.INPROGRESS,
  };

  useEffect(() => {
    if (isEditView) {
      fetchVoucherRedemption(id);
    }
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(voucherRedemption) && !loading) {
      setFormValues();
    }
  }, [voucherRedemption, loading]);

  const fetchVoucherRedemption = async () => {
    await getVoucherRedemptionById(id);
  };
  const verifyForm = async () => {
    const values = await form.validateFields();
    return {
      ticketId: id,
      voucherNumber: values.voucherNumber,
      saleAmount: values.saleAmount,
    };
  };
  const _redeemWithQR = async () => {
    const data = await verifyForm();
    delete data.voucherNumber;
    redeemWithQR(data);
  };
  const _redeemWithCode = async () => {
    const data = await verifyForm();
    voucherRedemptionModalChange(true);
    redeemWithCode(data);
  };

  const setFormValues = () => {
    form.setFieldsValue({
      code: id,
      partnerCode: voucherRedemption.partnerCode,
      partnerName: voucherRedemption.partnerName,
      voucherNumber: voucherRedemption.voucherNumber,
      saleAmount: voucherRedemption.saleAmount,
      voucherTitle: voucherRedemption.voucherTitle,
      voucherSaving: voucherRedemption.voucherSaving,
      consumerCode: !_isEmpty(voucherRedemption.consumerCode) ? voucherRedemption.consumerCode : "",
      consumerName: !_isEmpty(voucherRedemption.consumerName) ? voucherRedemption.consumerName : "",
      authorizationCode: voucherRedemption.authorizationCode,
      reason: voucherRedemption.reason,
      redeemedTicketStatus: voucherRedemption.redeemedTicketStatus,
      redemptionType: voucherRedemption.redemptionType,
    });
  };

  const onFormFinish = () => {};

  const initialValues = {
    status: null,
    type: null,
  };

  const createdAt = _get(voucherRedemption, "createdAt", "")
    ? moment(voucherRedemption.createdAt).format(DATE_FORMAT_TIME)
    : "N/A";
  const updatedAt = _get(voucherRedemption, "updatedAt", "")
    ? moment(voucherRedemption.updatedAt).format(DATE_FORMAT_TIME)
    : "N/A";

  function error(errorText) {
    Modal.error({
      title: "Rejection",
      content: `${errorText}`,
      onOk() {
        voucherRedemptionModalChange(false);
      },
    });
  }

  if (voucherRedemption.reason && isModalShow) {
    // error(voucherRedemption.reason);
  }

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}
      <PageTitle title={isEditView ? "Edit Voucher Ticket" : "Add Voucher Ticket"} />

      <Form
        form={form}
        className="AddVoucherRedemption"
        layout="vertical"
        name="nest-messages"
        initialValues={initialValues}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Ticket #" name="code">
              <Input readOnly placeholder="Ticket #" className="blackPlaceHolder" />
            </Form.Item>
            <Form.Item label="Outlet Code" name="partnerCode">
              <Input readOnly placeholder="Outlet Code" className="blackPlaceHolder" />
            </Form.Item>
            <Form.Item label="Outlet Name" name="partnerName">
              <Input readOnly placeholder="Outlet Name" className="blackPlaceHolder" />
            </Form.Item>
            <Form.Item label="Voucher Code" name="voucherNumber" rules={[{ required: true }]}>
              <Input readOnly={disableVoucherCode} placeholder="Voucher Code" className="blackPlaceHolder" />
            </Form.Item>
            <Form.Item label="Sale Amount" name="saleAmount" rules={[{ required: true, numberOnly }]}>
              <Input readOnly={disableSaleAmount} placeholder="Sale Amount" className="blackPlaceHolder" />
            </Form.Item>
            <Form.Item label="Voucher Name" name="voucherTitle">
              <Input readOnly placeholder="Voucher Name" className="blackPlaceHolder" />
            </Form.Item>
            <Form.Item label="Voucher Savings" name="voucherSaving">
              <Input readOnly placeholder="Voucher Savings" className="blackPlaceHolder" />
            </Form.Item>
            <Form.Item label="Consumer Code" name="consumerCode">
              <Input readOnly placeholder="Consumer Code" className="blackPlaceHolder" />
            </Form.Item>
            <Form.Item label="Consumer Name" name="consumerName">
              <Input readOnly placeholder="Consumer Name" className="blackPlaceHolder" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Redemption Type" className="text-left" name={["voucherRedemption", "redemptionType"]}>
              <StatusRadioButtons
                currentStatus={statusTypesButtonProps.types}
                defaultValue={statusTypesButtonProps.defaultValue}
              />
            </Form.Item>
            <Form.Item
              label="Current Status"
              className="text-left"
              name={["voucherRedemption", "redeemedTicketStatus"]}
            >
              <StatusRadioButtons
                currentStatus={statusRadioButtonProps.currentStatus}
                defaultValue={statusRadioButtonProps.defaultValue}
              />
            </Form.Item>
            <Divider />
            <Form.Item label=" ">
              <div className="text-center">
                <QRCode size={300} value={voucherRedemption.voucherRedeemedTicketId || "test"} />
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Authorization Code" name="authorizationCode">
              <Input readOnly placeholder="Authorization Code" />
            </Form.Item>
            <Form.Item label="Rejection Reason" name="reason">
              <Input readOnly placeholder="Rejection Reason" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={8} lg={8}>
              Created By: {_get(voucherRedemption, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(voucherRedemption, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={16} lg={16}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col className="text-right">
                  <Button
                    type="info"
                    onClick={() => {
                      history.push(ROUTES.VOUCHER_REDEMPTION_MANAGEMENT.path);
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="action-btn"
                    type="danger"
                    loading={loading}
                    onClick={() => {
                      addVoucherRedemption(history);
                    }}
                  >
                    Create Ticket
                  </Button>
                </Col>
                <Col className="text-right">
                  <Form.Item>
                    <Button type="primary" loading={loading} onClick={fetchVoucherRedemption}>
                      Refresh
                    </Button>
                  </Form.Item>
                </Col>
                <Col className="text-right">
                  <Form.Item>
                    <Button
                      disabled={isRedeemWithAuthCodeBtnDisabled}
                      type="primary"
                      onClick={_redeemWithCode}
                      loading={loading}
                    >
                      Redeem with code
                    </Button>
                  </Form.Item>
                </Col>
                <Col className="text-right">
                  <Form.Item>
                    <Button
                      disabled={isRedeemWithQRCodeBtnDisabled}
                      type="primary"
                      onClick={_redeemWithQR}
                      loading={loading}
                    >
                      Redeem with QR
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row className="fields-row" justify="end" type="flex">
            <Col>
              <Button
                className="action-btn mg-right-50"
                type="info"
                onClick={() => {
                  history.push(ROUTES.VOUCHER_REDEMPTION_MANAGEMENT.path);
                }}
              >
                Cancel
              </Button>
              <Button
                className="action-btn mg-right-50"
                type="danger"
                loading={loading}
                onClick={() => {
                  history.push(ROUTES.EDIT_VOUCHER_REDEMPTION.path);
                }}
              >
                Create ticket
              </Button>
              <Button
                className="action-btn mg-right-50"
                type="primary"
                loading={loading}
                onClick={() => fetchVoucherRedemption(id)}
              >
                Refresh
              </Button>
              <Button
                disabled={inProgress}
                className="action-btn mg-right-50"
                type="primary"
                onClick={_redeemWithCode}
                loading={loading}
              >
                Redeem with code
              </Button>
              <Button
                disabled={inProgress}
                className="action-btn"
                type="primary"
                onClick={_redeemWithQR}
                loading={loading}
              >
                Redeem with QR
              </Button>
            </Col>
          </Row>
        )}
      </Form>

      {/* <Modal title="Reject Reason" visible={isModalShow} onOk={handleOk} onCancel={handleCancel}>
        {voucherRedemption ? <p>{voucherRedemption.reason}</p> : null}
      </Modal> */}
    </>
  );
};

AddEditVoucherRedemption.propTypes = {
  getVoucherRedemptionById: PropTypes.func,
  addVoucherRedemption: PropTypes.func,
  voucherRedemption: PropTypes.object,
  loading: PropTypes.bool,
  redeemWithCode: PropTypes.func,
  redeemWithQR: PropTypes.func,
  history: PropTypes.object,
  voucherRedemptionModalChange: PropTypes.func,
  isModalShow: PropTypes.bool,
};
export default AddEditVoucherRedemption;
