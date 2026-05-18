import { useEffect, useState } from "react";
import { ColumnType, RowType } from "../types";
import { initialState } from "../constants";

type SelectedState = { type: "row" | "column"; id: string } | null;

const STORAGE_KEY = "editor_rows";

export const useEditor = () => {
  const [rows, setRows] = useState<RowType[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : initialState;
  });
  const [selected, setSelected] = useState<SelectedState>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  const selectedColumn =
    selected?.type === "column"
      ? rows.flatMap((row) => row.columns).find((col) => col.id === selected.id) ?? null
      : null;

  const updateColumn = (columnId: string, updater: (col: ColumnType) => ColumnType) => {
    setRows((prev) =>
      prev.map((row) => ({
        ...row,

        columns: row.columns.map((col) => (col.id === columnId ? updater(col) : col)),
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

  const handleDeleteRow = (idToCheck: string) => {
    setRows((prev) =>
      prev.filter((row) => {
        if (row.id === idToCheck) return false;

        if (row.columns.some((col) => col.id === idToCheck)) return false;

        return true;
      })
    );

    setSelected(null);
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

  const handleDeleteColumn = (columnId: string) => {
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        columns: row.columns.filter((col) => col.id !== columnId),
      }))
    );

    setSelected(null);
  };

  const handleTextChange = (value: string) => {
    if (selected?.type !== "column") return;

    updateColumn(selected.id, (col) => {
      if (col.type !== "text") return col;

      return { ...col, content: value };
    });
  };

  const handleTextAlign = (align: "left" | "center" | "right") => {
    if (selected?.type !== "column") return;

    updateColumn(selected.id, (col) => {
      if (col.type !== "text") return col;

      return { ...col, align };
    });
  };

  const handleColumnTypeChange = (type: "text" | "image") => {
    if (selected?.type !== "column") return;

    updateColumn(selected.id, (col) => {
      if (col.type === type) return col;

      if (type === "text")
        return {
          id: col.id,
          type: "text",
          content: "",
          align: "left",
        };

      return {
        id: col.id,
        type: "image",
        content: "",
      };
    });
  };

  const handleImageChange = (value: string) => {
    if (selected?.type !== "column") return;

    updateColumn(selected.id, (col) => {
      if (col.type !== "image") return col;

      return { ...col, content: value };
    });
  };

  return {
    rows,
    selected,
    selectedColumn,
    setSelected,
    handleAddRow,
    handleDeleteRow,
    handleAddColumn,
    handleDeleteColumn,
    handleTextChange,
    handleTextAlign,
    handleColumnTypeChange,
    handleImageChange,
  };
};
