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
  } = useEditor();

  return (
    <>
      <div className="editor">
        <Stage onSelect={() => setSelected(null)}>
          {rows.map((row) => {
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
          })}
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
        />
      </div>
    </>
  );
};

// {
//   /* <Row onSelect={() => console.log("Row selected")}>
//         <Column onSelect={() => console.log("Column selected")}>
//           <Markdown className="text-align-center"># Animals of the World</Markdown>
//         </Column>
//       </Row>
//       <Row>
//         <Column>
//           <img src="/images/linnea-sandbakk-HQqIOc8oYro.jpg" alt="" />
//         </Column>
//         <Column>
//           <img src="/images/jordan-whitt-EerxztHCjM8.jpg" alt="" />
//         </Column>
//         <Column>
//           <img src="/images/donnie-ray-crisp-cpL9skvSypI.jpg" alt="" />
//         </Column>
//       </Row>
//       <Row>
//         <Column>
//           <Markdown className="text-align-left">
//             Photo by [Linnea Sandbakk](https://unsplash.com/photos/HQqIOc8oYro)
//           </Markdown>
//         </Column>
//         <Column>
//           <Markdown className="text-align-center">
//             Photo by [Jordan Whitt](https://unsplash.com/photos/EerxztHCjM8)
//           </Markdown>
//         </Column>
//         <Column>
//           <Markdown className="text-align-right">
//             Photo by [Donnie Ray Crisp](https://unsplash.com/photos/cpL9skvSypI)
//           </Markdown>
//         </Column>
//       </Row>
//       <Row>
//         <Column>
//           <Markdown>
//             “Immensely powerful though we are today, it’s equally clear that we’re going to be even more powerful
//             tomorrow. And what’s more there will be greater compulsion upon us to use our power as the number of human
//             beings on Earth increases still further. Clearly we could devastate the world. As far as we know, the Earth
//             is the only place in the universe where there is life. Its continued survival now rests in our hands.”
//           </Markdown>
//         </Column>
//       </Row>
//       <Row>
//         <Column>
//           <Markdown className="text-align-right">— David Attenborough</Markdown>
//         </Column>
//       </Row>
//       <Row />
//       <Row selected>
//         <Column>Selected row</Column>
//       </Row>
//       <Row>
//         <Column selected>Selected column</Column>
//         <Column>
//           <Markdown>{"**Bold text**\n\n*Italic text*"}</Markdown>
//         </Column>
//         <Column>
//           <Markdown>Hippopotomonstrosesquippedaliophobia</Markdown>
//         </Column>
//         <Column>
//           <ImagePlaceholder />
//         </Column>
//       </Row> */
// }
