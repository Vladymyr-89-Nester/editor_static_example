import classNames from "classnames";
import { FC } from "react";
import { SelectableContainer } from "../selectable-container";

export interface RowProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  selected?: boolean;
  onSelect?(): void;
}

export const Row: FC<RowProps> = ({ selected, ...props }) => (
  <SelectableContainer className={classNames("row", { selected })} {...props} />
);
