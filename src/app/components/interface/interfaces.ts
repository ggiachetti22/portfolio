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
  email: String,
  userName: String,
  keyToken: String
} // UserResponse;

export interface UserDTO {
  userID: Number,
  userEmail: String,
  userName: String,
  password: String,
  stateID: Number,
} // UserDTO;


export interface SettingsMain {
  valorNumber: Number,
  valorBool: boolean,
  userName: String,
  Message: String,
} // SettingsMain;