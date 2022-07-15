export const reportsConfig = {
  bookOrderReports: {
    generalView: {
      fileName: "bookOrderReports.csv",
      url: "report/v1/public/admin/book-order-reports",
    },
  },
  bookActivationReports: {
    generalView: {
      fileName: "bookActivationReports.csv",
      url: "report/v1/public/admin/book-activation-reports/general",
    },
    monthWiseView: {
      fileName: "bookActivationReports-monthWiseView.csv",
      url: "report/v1/public/admin/book-activation-reports/month-wise",
    },
  },
  voucherRedemptionReport: {
    consumerView: {
      fileName: "voucherRedemptionReport-consumerView.csv",
      url: "report/v1/public/admin/voucher-redeem-reports/customer",
    },
    partnerView: {
      fileName: "voucherRedemptionReport-partnerView.csv",
      url: "report/v1/public/admin/voucher-redeem-reports/partner",
    },
    partnerWiseView: {
      fileName: "voucherRedemptionReport-partnerWiseView.csv",
      url: "report/v1/public/admin/voucher-redeem-reports/partner-wise",
    },
    monthWiseView: {
      fileName: "voucherRedemptionReport-monthWiseView.csv",
      url: "report/v1/public/admin/voucher-redeem-reports/month-wise",
    },
    unredeemedView: {
      fileName: "voucherRedemptionReport-unredeemedView.csv",
      url: "report/v1/public/admin/voucher-unredeem-reports",
    },
  },
  salesReport: {
    monthWiseView: {
      fileName: "salesReport-monthWiseView.csv",
      url: "report/v1/public/admin/sale-reports",
    },
  },
  consumerReports: {
    generalView: {
      fileName: "consumerReports.csv",
      url: "report/v1/public/admin/consumer-reports",
    },
  },
  userLoginReport: {
    generalView: {
      fileName: "userLoginReport.csv",
      url: "report/v1/public/admin/user-login-reports",
    },
  },
};
