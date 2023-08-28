export interface Book {
  id?: string;
  publisherId: string;
  title: string;
  pageNumber: string;
  description: string;
  createDate?: Date;
  updateDate?: Date;
}
