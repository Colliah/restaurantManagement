export interface TableItem {
  id?: string;
  number: number;
  qrCode?: string;
  capacity: number;
  status: TableStatus;
}

export type TableStatus = "available" | "occupied" | "reserved" | "maintenance";
