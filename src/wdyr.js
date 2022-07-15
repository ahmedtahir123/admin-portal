// import React from "react";

// if (process.env.NODE_ENV === "development") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   const ReactRedux = require("react-redux");
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//     trackExtraHooks: [[ReactRedux, "useSelector"]],
//   });
// }

import React from "react";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
