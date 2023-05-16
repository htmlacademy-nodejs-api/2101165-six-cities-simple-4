import { City } from './city.type.js';
import { Location } from './location.type.js';
import { OfferKind } from './offer-kind.type.js';
import { Profile } from './profile.type.js';

export type Offer = {
  title: string;
  description: string;
  createdDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: OfferKind;
  rooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Profile;
  commentsCount: number;
  location: Location;
}
