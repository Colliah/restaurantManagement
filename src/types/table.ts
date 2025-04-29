export interface TableItem {
  id: number;
  name: string;
  capacity: number;
  status: TableStatus;
}

export type TableStatus = "available" | "occupied" | "reserved" | "maintenance";
