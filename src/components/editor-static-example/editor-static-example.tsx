import { FC } from "react";
import { Column } from "../column";
import { ImagePlaceholder } from "../image-placeholder";
import { Markdown } from "../markdown";
import { Row } from "../row";
import { Stage } from "../stage";
import { useEditor } from "../../hooks";
import { Sidebar } from "../sidebar";

export const EditorStaticExample: FC = () => {
  const {
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
    handleDeleteRow,
    handleDeleteColumn,
  } = useEditor();

  return (
    <>
      <div className="editor">
        <Stage onSelect={() => setSelected(null)}>
          {rows.length === 0 ? (
            <div className="empty-stage-placeholder">
              <h3>Your canvas is empty</h3>
              <p>
                Click <strong className="empty-stage-accent">"Add row"</strong> in the sidebar to start building your
                app.
              </p>
            </div>
          ) : (
            rows.map((row) => {
              const isRowSelected = selected?.type === "row" && selected.id === row.id;

              return (
                <Row
                  key={row.id}
                  selected={isRowSelected}
                  onSelect={() => {
                    setSelected({ type: "row", id: row.id });
                  }}
                  autoFocus={isRowSelected}
                >
                  {row.columns.map((column) => {
                    const isColumnSelected = selected?.type === "column" && selected.id === column.id;

                    return (
                      <Column
                        key={column.id}
                        selected={isColumnSelected}
                        onSelect={() => {
                          setSelected({ type: "column", id: column.id });
                        }}
                        autoFocus={isColumnSelected}
                      >
                        {column.type === "text" ? (
                          <Markdown className={`text-align-${column.align || "left"}`}>{column.content}</Markdown>
                        ) : column.type === "image" ? (
                          column.content ? (
                            <img src={column.content} alt="" />
                          ) : (
                            <ImagePlaceholder />
                          )
                        ) : null}
                      </Column>
                    );
                  })}
                </Row>
              );
            })
          )}
        </Stage>

        <Sidebar
          selected={selected}
          selectedColumn={selectedColumn}
          onAddRow={handleAddRow}
          onAddColumn={handleAddColumn}
          onColumnTypeChange={handleColumnTypeChange}
          onTextAlign={handleTextAlign}
          onTextChange={handleTextChange}
          onImageChange={handleImageChange}
          onDeleteRow={handleDeleteRow}
          onDeleteColumn={handleDeleteColumn}
        />
      </div>
    </>
  );
};
