export interface Book {
  id?: string;
  publisherId: string;
  title: string;
  pageNumber: number;
  description: string;
  createDate?: Date;
  updateDate?: Date;

  bookStatus: BookStatus;

  bookCategories?: Category[];
  bookPublishers?: Publisher;
  bookAuthors?: Author[];
  bookVouchers?: BookVoucher[];
}

export interface BookParam {
  id: string;
}

// public Guid Id { get; set; }
// public Guid ProductId { get; set; }
// public int SoldNumberInMonth { get; set; }
// public int TotalSoldNumber { get; set; }
// public int RemainNumber { get; set; }
// public double CurrentPrice { get; set; }
// public DateTime UpdateDate { get; set; }

export interface BookStatus {
  id?: string;
  productId?: string;
  soldNumberInMonth: number;
  totalSoldNumber: number;
  remainNumber: number;
  currentPrice: number;
  updateDate?: Date;
}

export interface BookVoucher {
  voucher: Voucher;
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

export interface VoucherPayload {
  id?: string;
  voucherRelationString: string;
}

export interface AuthorPayload {
  id?: string;
  authorRelationString: string;
}

export interface CategoryPayload {
  id?: string;
  categoryRelationString: string;
}

export interface BookStatusParam {
  id?: string;
  bookStatus: BookStatus;
}

export interface BookInfoParam {
  id?: string;
  publisherId: string;
  title: string;
  pageNumber: number;
  description: string;
  createDate?: Date;
  updateDate?: Date;
}

