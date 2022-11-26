import "./ItemDropdown.scss";

import { filterData } from "../utils/filter";
import { dropdownListItemClass } from "../utils/className";
export const ItemDropdown = ({
  dropdownRef,
  dropdownLabel,
  dropdownData,
  dropdownOpen,
  filterInputValue,
  selectedItem,
  selectedHoverItem,
  clickDropdown,
  filterDropdown,
  selectItem,
}) => {
  return (
    <div className="dropdown-item">
      <div className="dropdown-item-label">{dropdownLabel}</div>
      <div className="dropdown-item-select" name="country">
        <div
          className={
            dropdownOpen
              ? "dropdown-item-default active"
              : "dropdown-item-default"
          }
          onClick={clickDropdown}
        >
          <span>
            {selectedItem && selectedItem.name !== ""
              ? selectedItem.name
              : " -Select- "}
          </span>
          <span></span>
        </div>
        <ul
          ref={dropdownRef}
          className={
            dropdownOpen ? "dropdown-item-ul active" : "dropdown-item-ul"
          }
        >
          <li className="dropdown-item-ul-item dropdown-item-input">
            <input
              placeholder="Type search here"
              value={filterInputValue}
              onChange={filterDropdown}
            />
          </li>
          {filterData(dropdownData, filterInputValue).map((props, index) => (
            <li
              key={index}
              className={dropdownListItemClass(
                selectedItem,
                selectedHoverItem,
                props,
                index
              )}
              onClick={() => selectItem(props)}
            >
              {props.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const ItemDropdownWrapper = ({ children }) => {
  return <div className="dropdown-wrapper">{children}</div>;
};
