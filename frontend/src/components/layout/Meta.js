import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title }) => (
  <Helmet>
    <title>{`${title}- ShopIT`}</title>{" "}
  </Helmet>
);

export default Meta;
