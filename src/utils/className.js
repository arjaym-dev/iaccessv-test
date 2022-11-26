export function dropdownListItemClass(
  selectedItem,
  selectedHoverItem,
  props,
  index
) {
  const activeClass =
    selectedItem && selectedItem.name === props.name
      ? "dropdown-item-ul-item active"
      : "dropdown-item-ul-item";

  const hoverClass =
    selectedHoverItem && selectedHoverItem === index ? "hover" : null;

  const combineClass = `${activeClass} ${hoverClass}`;

  return combineClass;
}
