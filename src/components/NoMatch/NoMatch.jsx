import React from "react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";

const NoMatch = ({ history }) => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push("/home")}>
        Back Home
      </Button>
    }
  />
);

NoMatch.propTypes = {
  history: PropTypes.object,
};

export default NoMatch;
