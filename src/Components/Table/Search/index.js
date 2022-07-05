import React, { useState } from "react";
import "./index.css";

const SearchTableData = ({
  placeholder,
  name,
  type,
  onChange,
  value,
  width,
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        style={{ padding: "7px 0px", width: width, outline: "none" }}
      />
    </div>
  );
};

export default SearchTableData;
