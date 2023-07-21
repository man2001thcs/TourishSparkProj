export interface Book {
  WpBook: {
    id: number;
    name: string;
    page_number: number;
    description: string;
    type: string;
  };
  WpBookNumber: {
    id: number;
    price: number;
    remain_number: number;
    bought_number: number;
  };
  WpBookAuthor: {
    id: number;
    string_array: string;
  };
  WpBookVoucher: {
    id: number;
    vouchers_id: string;
  };
}
