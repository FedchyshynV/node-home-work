export enum Permissions {
  READ = 'READ', 
  WRITE = 'WRITE', 
  DELETE = 'DELETE', 
  SHARE = 'SHARE', 
  UPLOAD_FILES = 'UPLOAD_FILES',
}

export interface IGroup {
  id: string;
  name: string;
  permissions: Array<Permissions>;
}