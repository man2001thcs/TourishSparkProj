export interface NotificationModel {
  id?:string;
  userId: string;
  content: string;
  isRead: boolean;
  isDeleted: boolean;
  createDate?: string;
  updateDate?: string;
}

export interface NotificationParam {
  id: string;
}
