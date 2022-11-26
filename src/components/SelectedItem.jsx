import React from "react";
import "./SelectedItem.scss";

const SelectedItem = ({ label, value }) => {
  return (
    <div className="selected-item">
      <span className="selected-item-label">{label}:</span>
      <span className="selected-item-value">{value && value.name}</span>
    </div>
  );
};

export default React.memo(SelectedItem);
