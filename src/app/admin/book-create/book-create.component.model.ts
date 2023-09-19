export interface Book {
  id?: string;
  publisherId: string;
  title: string;
  pageNumber: string;
  bookSize: string;
  bookWeight: number;
  coverMaterial: number;
  publishYear: number;
  description: string;
  createDate?: Date;
  updateDate?: Date;
}

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

export interface Voucher {
  id: string;
  name: string;
  discountFloat: number;
  discountAmount: number;
  description: string;
  createDate: string;
  updateDate: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createDate: string;
  updateDate: string;
}


export interface Publisher {
  id: string;
  publisherName: string;
  phoneNumber: string;
  email: string;
  address: string;
  description: string;
  createDate: string;
  updateDate: string;
}


export interface AuthorParam {
  id: string;
}
