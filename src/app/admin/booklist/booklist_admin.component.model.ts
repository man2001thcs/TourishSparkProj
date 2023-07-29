
export interface Book {
  id: string;
  title: string;
  pageNumber: number;
  description: string;

  bookStatus: BookStatus,

  bookCategories: BookCategory[];
}

export interface BookStatus {
  productId: string;
  soldNumberInMonth: number;
  totalSoldNumber: number;
  remainNumber: number;
  currentPrice: number;
  updateDate: Date;
}

export interface BookCategory {
  bookId: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    bookCategories: [];
    createDate: Date;
    updateDate: Date;
  };
}
