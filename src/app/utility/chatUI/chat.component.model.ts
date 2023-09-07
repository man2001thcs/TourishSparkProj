import { NbChatMessageFile } from "@nebular/theme/components/chat/chat-message-file.component";

export interface MessageModel {
  id?: string;
  userSendId: string;
  userReceiveId: string;
  UserSentName?: string;
  UserReceiveName?: string;
  content: string;
  files?: NbChatMessageFile[];

  isRead: boolean;
  isDeleted: boolean;
  createDate?: string;
  updateDate?: string;
}
