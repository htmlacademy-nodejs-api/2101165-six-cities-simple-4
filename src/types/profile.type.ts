import { ProfileKind } from './profile-kind.type.js';

export type Profile = {
  name: string;
  email: string;
  avatar?: string;
  type: ProfileKind;
}
