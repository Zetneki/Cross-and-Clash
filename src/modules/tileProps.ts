export interface TileProps {
  label: string;
  row: number;
  col: number;
  colSpan?: number;
  rowSpan?: number;
  value?: string | number;
  pressed?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}
