// Đảm bảo khai báo chính xác cú pháp export
export const buildTree = (list, parentId = "") => {
    return list
      .filter((item) => item.parent_id === parentId)
      .map((item) => ({
        ...item,
        children: buildTree(list, item._id),
      }));
  };
  
  export const flattenTree = (items, level = 1) => {
    const prefix = "--".repeat(level - 1);
    return items.flatMap(item => [
      {
        ...item,
        level,
        prefix,
        TagsName: `${prefix} ${item.TagsName}`.trim(),
      },
      ...flattenTree(item.children || [], level + 1),
    ]);
  };
  