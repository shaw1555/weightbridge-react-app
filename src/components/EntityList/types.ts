export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
  type?: "text" | "number" | "date" | "select" | "checkbox";
  options?: { value: any; label: string }[];
  showTime?: boolean; // for date columns: show time if true
}
