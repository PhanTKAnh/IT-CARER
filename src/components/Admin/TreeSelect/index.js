import React from "react";

const TreeSelect = ({ items, level = 1 }) => {
  return (
    <>
      {items.map((item) => {
        const prefix = "--".repeat(level - 1);
        return (
          <React.Fragment key={item._id}>
            <option value={item._id}>
              {prefix} {item.TagsName}
            </option>
            {item.children && item.children.length > 0 && (
              <TreeSelect items={item.children} level={level + 1} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};


export default TreeSelect;
