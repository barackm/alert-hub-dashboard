export enum DialogAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export type DialogData<T> = {
  open: boolean;
  data: T | null;
  title: string;
  description: string;
  variant: "destructive" | "default";
  action: DialogAction;
};
