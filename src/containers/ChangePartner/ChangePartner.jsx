import { Drawer, Button, Form, Row, Col, Select, Table, Divider } from "antd";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _map from "lodash/map";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _debounce from "lodash/debounce";

import {
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  CHANGE_PARTNER_COL,
  ERROR_MESSAGE,
  SEARCH_QUERY,
  SELECTED_PARTNER_COL,
} from "../../utils/constants";
import { toastMessage } from "../../utils/utils";
import BrandService from "../../services/brand.service";

export const ChangePartnerContainer = ({
  visible,
  close,
  isShowSelectedPartners,
  getPartnerList,
  dealCategories,
  filteredBrands,
  partners,
  filteredPartners,
  onSave,
  getBrandNamesList,
  getDealCategoriesList,
  partnerLoading,
  brandLoading,
  categoryLoading,
  dealSelectedPartners,
  resetFilteredPartnerList,
  defaultCategoryCode,
  defaultBrandCode,
}) => {
  const partnerState = isShowSelectedPartners ? [] : {};
  const [rowsSelected, setRowsSelected] = useState(partnerState);
  const [rowsSelectedKey, setRowsSelectedKey] = useState([]);
  const [rowsSelectedPartners, setRowsSelectedPartners] = useState([]);
  const [rowsSelectedPartnersKey, setRowsSelectedPartnersKey] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const [isFilter, setIsFilter] = useState(false);

  const [form] = Form.useForm();
  const brandArr = brandList.length ? brandList : filteredBrands;
  const partnersArr = isFilter ? filteredPartners : partners;
  const dealCategoriesArr = dealCategories.length ? dealCategories : [];

  useEffect(() => {
    setSelectedPartners(dealSelectedPartners);
  }, [dealSelectedPartners]);

  useEffect(() => {
    if (visible) {
      const query = { page: 0, size: 500 };
      if (defaultBrandCode) {
        const filters = {
          partnerBrandCode: defaultBrandCode,
        };
        getPartnerList({ ...query, filters }, true);
        setIsFilter(true);
        const categoryCode = defaultCategoryCode || undefined;
        const brandCode = defaultBrandCode || undefined;
        form.setFieldsValue({ brandCode, categoryCode });
      } else {
        getBrandNamesList({ ...SEARCH_QUERY });
        getDealCategoriesList(query);
      }
      if (!partners.length) {
        getPartnerList(query);
      }
    }
  }, [visible]);

  const rowSelection = {
    selectedRowKeys: rowsSelectedKey,
    onChange: (selectedRowKeys, selectedRows) => {
      if (!isShowSelectedPartners) {
        setRowsSelected(selectedRows[0]);
      } else {
        setRowsSelected(selectedRows);
      }
      setRowsSelectedKey(selectedRowKeys);
    },
  };

  const rowSelectionPartner = {
    selectedRowKeys: rowsSelectedPartnersKey,
    onChange: (selectedRowKeys, selectedRows) => {
      setRowsSelectedPartners(selectedRows);
      setRowsSelectedPartnersKey(selectedRowKeys);
    },
  };

  const onFormFinish = () => {};

  const addSelected = () => {
    const arr = [...rowsSelected, ...selectedPartners];
    const uniqueArr = [...new Map(arr.map(item => [item.code, item])).values()];
    // setSelectedPartners([...new Set([...rowsSelected, ...selectedPartners])]);
    const customArr = uniqueArr.map(d => {
      const brandCode = d.brandCode || _get(d, "brand.code", "");
      const brandName = d.brandName || _get(d, "brand.name", "");
      const location = d.location || _get(d, "areaSegment.city", "");
      return {
        code: d.code,
        name: d.name,
        location,
        brandCode,
        brandName,
      };
    });
    setSelectedPartners([...customArr]);
    setRowsSelectedKey([]);
  };

  const removeSelected = () => {
    setSelectedPartners([...selectedPartners.filter(item => !rowsSelectedPartners.includes(item))]);
  };

  const onClickSearch = () => {
    const { brandCode } = form.getFieldsValue();
    const filters = {};
    // if (categoryCode) {
    //   filters.categoryCode = categoryCode;
    // }
    if (brandCode) {
      filters.partnerBrandCode = brandCode;
      const query = { page: 0, size: 500, filters };
      getPartnerList(query, true);
      setIsFilter(true);
      setRowsSelectedKey([]);
    } else {
      toastMessage("info", "Please select brand");
    }
  };

  const onClickClear = () => {
    const query = { page: 0, size: 500 };
    getPartnerList(query, true);
    setRowsSelectedKey([]);
    // getBrandNamesList();
    fetchBrandList();
    form.resetFields();
    setIsFilter(false);
  };

  const handleCategoryChange = async value => {
    if (value) {
      form.resetFields(["brandCode"]);
      const query = { ...SEARCH_QUERY, categoryCode: value };
      fetchBrandList(query);
    }
  };

  const handleBrandSearch = value => {
    if (value) {
      let query = { ...SEARCH_QUERY, name: value };
      const code = form.getFieldValue("categoryCode");
      if (code) {
        query = { ...SEARCH_QUERY, name: value, categoryCode: code };
      }
      fetchBrandList(query);
    } else {
      form.resetFields(["brandCode"]);
      console.log("else condition of search text");
    }
  };

  const fetchBrandList = (query = SEARCH_QUERY) => {
    BrandService.getBrandNamesList(query)
      .then(listData => {
        // TODO check if this always give object
        setBrandList(listData.content);
      })
      .catch(err => {
        setBrandList([]);
        console.log("brand list err", err);
        toastMessage("error", ERROR_MESSAGE.LIST);
      });
  };

  const onSubmitClick = () => {
    if (isShowSelectedPartners) {
      if (!_isEmpty(selectedPartners)) {
        onSave(selectedPartners);
      } else {
        onSave([]);
      }
      setRowsSelectedKey([]);
      setRowsSelectedPartnersKey([]);
      setBrandList([]);
      resetFilteredPartnerList();
    } else {
      onSave(rowsSelected);
      // setRowsSelectedKey([]);
    }
    close();
    form.resetFields();
    setIsFilter(false);
  };

  const resetStates = () => {
    form.resetFields();
    // setRowsSelected(partnerState);
    // setRowsSelectedPartners([]);
    // setRowsSelectedKey([]);
    setRowsSelectedPartnersKey([]);
    resetFilteredPartnerList();
    setIsFilter(false);
    setBrandList([]);
  };

  const onClose = () => {
    // if (isShowSelectedPartners) {
    //   form.resetFields();
    //   selectedPartners([]);
    //   close();
    // } else {
    //   form.resetFields();
    //   selectedPartners({});
    //   close();
    // }
    resetStates();
    close();
  };

  const delayBrandSearch = _debounce(handleBrandSearch, 300);

  return (
    <div>
      <Drawer
        title="Add / Remove Outlet"
        width={720}
        visible={visible}
        closable={false}
        maskClosable={false}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={close}
        footer={
          <div className="text-right">
            <Button onClick={onClose} className="mg-right-15">
              Cancel
            </Button>
            <Button onClick={onSubmitClick} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form
          hideRequiredMark
          className="EditMerchant"
          form={form}
          initialValues={{ userType: "Select Category", brandType: "Select Brand" }}
          layout="vertical"
          name="nest-messages"
          onFinish={onFormFinish}
          validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
        >
          <Row className="fields-row" gutter={20} type="flex">
            <Col span={8} xs={24} sm={12} lg={12}>
              <Form.Item name="categoryCode">
                <Select
                  showSearch
                  placeholder="Select Category"
                  optionFilterProp="children"
                  loading={categoryLoading}
                  onChange={handleCategoryChange}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {_map(dealCategoriesArr, deal => (
                    <Select.Option key={deal.code} value={deal.code}>
                      {deal.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Form.Item name="brandCode">
                <Select
                  showSearch
                  placeholder="Select Brand"
                  loading={brandLoading}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={delayBrandSearch}
                  value={brandArr}
                >
                  {_map(brandArr, brand => (
                    <Select.Option key={brand.code} value={brand.code}>
                      {brand.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className="fields-row mg-bottom-10 text-right" gutter={20} type="flex">
            <Col span={8} xs={24} sm={12} lg={12}>
              <Button onClick={onClickClear}>Reset filters</Button>
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Button onClick={onClickSearch}>Search</Button>
            </Col>
          </Row>
          <Divider orientation="left" className="form-divider first sub-page-title ">
            Select New Outlet(s)
          </Divider>
          <Row className="fields-row" gutter={20} type="flex">
            <Col span={8} xs={24} sm={24} lg={24}>
              <Table
                rowSelection={{
                  type: isShowSelectedPartners ? "checkbox" : "radio",
                  ...rowSelection,
                }}
                columns={CHANGE_PARTNER_COL}
                dataSource={partnersArr}
                rowKey="code"
                pagination={false}
                scroll={isShowSelectedPartners ? { y: 240 } : false}
                // size="small"
                loading={partnerLoading}
              />
            </Col>
          </Row>
          {isShowSelectedPartners ? (
            <Row className="fields-row mg-top-15 mg-bottom-15 text-right" gutter={20} type="flex">
              <Col span={8} xs={24} sm={24} lg={24}>
                <Button type="primary" onClick={addSelected}>
                  Add Selected
                </Button>
              </Col>
            </Row>
          ) : null}
          {isShowSelectedPartners ? (
            <>
              <Divider orientation="left" className="form-divider first sub-page-title">
                Selected Outlet(s)
              </Divider>
              <Row className="fields-row" gutter={20} type="flex">
                <Col span={8} xs={24} sm={24} lg={24}>
                  <Table
                    rowSelection={{
                      ...rowSelectionPartner,
                    }}
                    columns={SELECTED_PARTNER_COL}
                    rowKey="code"
                    dataSource={selectedPartners}
                    pagination={false}
                    size="small"
                  />
                </Col>
              </Row>
              {selectedPartners.length ? (
                <Row className="fields-row mg-top-15 text-right" gutter={20} type="flex">
                  <Col span={8} xs={24} sm={24} lg={24}>
                    <Button type="primary" onClick={removeSelected}>
                      Remove Selected
                    </Button>
                  </Col>
                </Row>
              ) : null}
            </>
          ) : null}
        </Form>
      </Drawer>
    </div>
  );
};

ChangePartnerContainer.defaultProps = {
  partners: [],
  defaultCategoryCode: null,
  defaultBrandCode: null,
};

ChangePartnerContainer.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  isShowSelectedPartners: PropTypes.bool,
  getBrandNamesList: PropTypes.func,
  getDealCategoriesList: PropTypes.func,
  getPartnerList: PropTypes.func,
  dealCategories: PropTypes.array,
  defaultCategoryCode: PropTypes.string,
  defaultBrandCode: PropTypes.string,
  filteredBrands: PropTypes.array,
  partners: PropTypes.array,
  filteredPartners: PropTypes.array,
  onSave: PropTypes.func,
  partnerLoading: PropTypes.bool,
  brandLoading: PropTypes.bool,
  categoryLoading: PropTypes.bool,
  dealSelectedPartners: PropTypes.array,
  resetFilteredPartnerList: PropTypes.func,
};
export default ChangePartnerContainer;
