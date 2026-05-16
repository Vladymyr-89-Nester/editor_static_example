export type TextColumnType = {
  id: string;
  type: "text";
  content: string;
  align: "left" | "center" | "right";
};

export type ImageColumnType = {
  id: string;
  type: "image";
  content: string;
};

export type EmptyColumnType = {
  id: string;
  type?: never;
  content?: never;
};

export type ColumnType = TextColumnType | ImageColumnType | EmptyColumnType;

export type RowType = {
  id: string;
  columns: ColumnType[];
};
