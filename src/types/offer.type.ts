import { CityEnum } from './city.enum';
import { User } from './user.type';
import { Goods } from './goods.enum';
import { OfferKind } from './offer-kind.enum';
import { Location } from './location.type';

export type Offer = {
  title: string; // length === 10 — 100
  description: string; // length === 20 — 1024
  postedAt: Date;
  city: CityEnum;
  preview: string;
  photos: string[];
  isPremium: boolean;
  rating: number; // 1.0 — 5.0
  housing: OfferKind;
  bedroomsAmount: number; // 1 — 8
  capacity: number; // 1 — 10
  price: number; // 100 — 100_000
  features: Goods[];
  user: User;
  commentsAmount: number;
  location: Location;
};
