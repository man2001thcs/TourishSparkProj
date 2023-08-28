export interface Author {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  description: string;
  createDate?: Date;
  updateDate?: Date;
}

export interface AuthorParam {
  id: string;
}
