import React from "react";

const GroupListing = (props) => {
  const { items, textProperty, valueProperty } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li key={item[valueProperty]} className="list-group-item">
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
GroupListing.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default GroupListing;
