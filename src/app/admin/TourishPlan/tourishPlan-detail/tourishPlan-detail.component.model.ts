export interface TourishPlan {
  id?: string;
  publisherId: string;
  title: string;
  pageNumber: number;
  description: string;
  createDate?: Date;
  updateDate?: Date;

  tourishPlanSize: string;
  tourishPlanWeight: number;
  coverMaterial: number;
  publishYear: number;

  tourishPlanStatus: TourishPlanStatus;

  tourishPlanCategories?: Category[];
  tourishPlanPublishers?: Publisher;
  tourishPlanAuthors?: Author[];
  tourishPlanVouchers?: Voucher[];
}

export interface TourishPlanParam {
  id: string;
}

// public Guid Id { get; set; }
// public Guid ProductId { get; set; }
// public int SoldNumberInMonth { get; set; }
// public int TotalSoldNumber { get; set; }
// public int RemainNumber { get; set; }
// public double CurrentPrice { get; set; }
// public DateTime UpdateDate { get; set; }

export interface TourishPlanStatus {
  id?: string;
  productId?: string;
  soldNumberInMonth: number;
  totalSoldNumber: number;
  remainNumber: number;
  currentPrice: number;
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

export interface TourishPlanStatusParam {
  id?: string;
  tourishPlanStatus: TourishPlanStatus;
}

export interface TourishPlanInfoParam {
  id?: string;
  publisherId: string;
  title: string;
  pageNumber: number;
  description: string;
  createDate?: Date;
  updateDate?: Date;

  tourishPlanSize: string;
  tourishPlanWeight: number;
  coverMaterial: number;
  publishYear: number;
}

