import { User } from "firebase/auth";

export interface UserModel extends User {
  firstName?: string;
  lastName?: string;
  nick?: string;
  additionalInformation?: boolean;
}
