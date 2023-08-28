
export interface Voucher {
  id: string;
  name: string;
  discountFloat: number;
  discountAmount: number;
  description: string;
  createDate?: Date;
  updateDate?: Date;
}

export interface VoucherParam {
  id: string;
}