import { FC } from "react";
import { ColumnType } from "../../types";
import { Icons } from "../icons";

interface SidebarProps {
  selected: { type: "row" | "column"; id: string } | null;
  selectedColumn: ColumnType | null;
  onAddRow: () => void;
  onAddColumn: () => void;
  onColumnTypeChange: (type: "text" | "image") => void;
  onTextAlign: (align: "left" | "center" | "right") => void;
  onTextChange: (val: string) => void;
  onImageChange: (val: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  selected,
  selectedColumn,
  onAddRow,
  onAddColumn,
  onColumnTypeChange,
  onTextChange,
  onTextAlign,
  onImageChange,
}) => {
  const isRowActive = selected?.type === "row" || selected?.type === "column";

  const isColumnActive = selected?.type === "column";

  return (
    <div className="properties">
      <div className="section">
        <div className="section-header">Page</div>
        <div className="actions">
          <button className="action" onClick={onAddRow}>
            Add row
          </button>
        </div>
      </div>

      {isRowActive && (
        <div className="section">
          <div className="section-header">Row</div>
          <div className="actions">
            <button className="action" onClick={onAddColumn}>
              Add column
            </button>
          </div>
        </div>
      )}

      {isColumnActive && (
        <div className="section">
          <div className="section-header">Column</div>
          <div className="button-group-field">
            <label>Contents</label>
            <div className="button-group">
              <button
                className={selectedColumn?.type === "text" ? "selected" : ""}
                onClick={() => onColumnTypeChange("text")}
              >
                <Icons.Text />
              </button>
              <button
                className={selectedColumn?.type === "image" ? "selected" : ""}
                onClick={() => onColumnTypeChange("image")}
              >
                <Icons.Image />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedColumn?.type === "text" && (
        <div className="section">
          <div className="section-header">Text</div>
          <div className="button-group-field">
            <label>Alignment</label>
            <div className="button-group">
              <button className={selectedColumn.align === "left" ? "selected" : ""} onClick={() => onTextAlign("left")}>
                <Icons.TextAlignLeft />
              </button>
              <button
                className={selectedColumn.align === "center" ? "selected" : ""}
                onClick={() => onTextAlign("center")}
              >
                <Icons.TextAlignCenter />
              </button>
              <button
                className={selectedColumn.align === "right" ? "selected" : ""}
                onClick={() => onTextAlign("right")}
              >
                <Icons.TextAlignRight />
              </button>
            </div>
          </div>
          <div className="textarea-field">
            <textarea
              rows={8}
              placeholder="Enter text"
              value={selectedColumn.content}
              onChange={(e) => onTextChange(e.target.value)}
            ></textarea>
          </div>
        </div>
      )}

      {selectedColumn?.type === "image" && (
        <div className="section">
          <div className="section-header">Image</div>
          <div className="text-field">
            <label htmlFor="image-url">URL</label>
            <input
              id="image-url"
              type="text"
              placeholder="Enter direct image URL"
              value={selectedColumn.content}
              onChange={(e) => onImageChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
