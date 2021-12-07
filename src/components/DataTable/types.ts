export interface CellsType {
  children: React.ReactNode;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: string;
  borderRight?: boolean;
  borderLeft?: boolean;
  background?: string;
  borderHeight?: string;
  fontWeight?: boolean;
  cellWidth?: string;
  cellClass: string;
}

export interface SearchTypes {
  background?: string;
  borderRadius?: string;
  placeholderClass?: string;
  inputClass?: string;
  onChange: any;
  value:string;
}

interface HeaderConfig {
  label: string;
  cellConfig: CellsType;
}

export interface HeaderTypes {
  headerConfig: HeaderConfig[];
}

export interface BodyConfig {
  accessor: string;
  defaultAccessor?:string;
  cellConfig: CellsType
}

export interface BodyTypes{
  renderedData: any[];
  bodyConfig: BodyConfig[];
}