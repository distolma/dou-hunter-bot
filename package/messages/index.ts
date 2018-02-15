import { IUser } from "../db/models/User";

export const welcomeMessage = (user: IUser) => `
  Hi, ${user.first_name}!
`;

export const welcomeMessageToNew = (user: IUser) => `
  Welcome to DOU Hunter, ${user.first_name}!
`;

