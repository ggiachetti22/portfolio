import { Time } from "@angular/common";

export interface MessageDTO {
  messageID: Number,
  userName: String,
  chatMsj: String,
  timeMessage: Date,
  timeFecha: String,
  timeHora: String;
} // MessageDTO;

export interface MyResponse {
  success: Number,
  upMessage: String,
  data: any,
  isSuccess: Boolean;
} // MyResponse;

export interface UserResponse {
  userName: String,
  keyToken: String
} // UserResponse;
