import { useEffect, useState } from "react";
import { ColumnType, RowType } from "../types";
import { initialState } from "../constants";

type SelectedState = { type: "row" | "column"; id: string } | null;

export const useEditor = () => {
  const [rows, setRows] = useState<RowType[]>(() => {
    const saved = localStorage.getItem("editor_rows");

    return saved ? JSON.parse(saved) : initialState;
  });
  const [selected, setSelected] = useState<SelectedState>(null);

  useEffect(() => {
    localStorage.setItem("editor_rows", JSON.stringify(rows));
  }, [rows]);

  const selectedColumn =
    selected?.type === "column"
      ? rows.flatMap((row) => row.columns).find((col) => col.id === selected.id) ?? null
      : null;

  const updateColumn = (columnId: string, updater: (col: ColumnType) => Partial<ColumnType>) => {
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        columns: row.columns.map((col) => (col.id === columnId ? ({ ...col, ...updater(col) } as ColumnType) : col)),
      }))
    );
  };

  const handleAddRow = () => {
    const newRowId = crypto.randomUUID();

    const newRow: RowType = {
      id: newRowId,
      columns: [],
    };

    setRows((prev) => [...prev, newRow]);
    setSelected({ type: "row", id: newRowId });
  };

  const handleAddColumn = () => {
    let activeRowId: string | null = null;

    if (selected?.type === "row") {
      activeRowId = selected.id;
    } else if (selected?.type === "column") {
      const parentRow = rows.find((row) => row.columns.some((col) => col.id === selected.id));

      if (parentRow) activeRowId = parentRow.id;
    }

    if (!activeRowId) return;

    const newColumnId = crypto.randomUUID();

    setRows((prev) =>
      prev.map((row) =>
        row.id === activeRowId
          ? {
              ...row,
              columns: [
                ...row.columns,
                {
                  id: newColumnId,
                },
              ],
            }
          : row
      )
    );

    setSelected({ type: "column", id: newColumnId });
  };

  const handleTextChange = (value: string) => {
    if (selected?.type === "column") {
      updateColumn(selected.id, () => ({ content: value }));
    }
  };

  const handleTextAlign = (align: "left" | "center" | "right") => {
    if (selected?.type === "column") {
      updateColumn(selected.id, (col) => (col.type === "text" ? { align } : {}));
    }
  };

  const handleColumnTypeChange = (type: "text" | "image") => {
    if (selected?.type === "column") {
      updateColumn(selected.id, () =>
        type === "text" ? { type: "text", content: "", align: "left" } : { type: "image", content: "" }
      );
    }
  };

  const handleImageChange = (value: string) => {
    if (selected?.type === "column") {
      updateColumn(selected.id, () => ({ content: value }));
    }
  };

  return {
    rows,
    selected,
    selectedColumn,
    setSelected,
    handleAddRow,
    handleAddColumn,
    handleTextChange,
    handleTextAlign,
    handleColumnTypeChange,
    handleImageChange,
  };
};
