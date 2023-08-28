export interface Publisher {
  id: string;
  publisherName: string;
  phoneNumber: string;
  email: string;
  address: string;
  description: string;
  createDate?: Date;
  updateDate?: Date;
}

export interface PublisherParam {
  id: string;
}
