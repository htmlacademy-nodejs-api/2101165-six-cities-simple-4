import { Offer } from '../../types/offer.type.js';
import { CityEnum } from '../../types/city.enum.js';
import { OfferKind } from '../../types/offer-kind.enum.js';
import { Goods } from '../../types/goods.enum.js';
import { StringBool } from '../../types/string-bool.type.js';
import { TSV_SEPARATOR, stringBoolToBool } from './index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postedAt,
    city,
    preview,
    allPhotos,
    isPremium,
    rating,
    housing,
    bedroomsAmount,
    capacity,
    price,
    features,
    user,
    commentsAmount,
    location,
  ] = offerData.replace('\n', '').split(TSV_SEPARATOR.Tab);

  const [name, email, userpic, userIsPro] = user.split(TSV_SEPARATOR.String);
  const [lat, lng] = location.split(TSV_SEPARATOR.String);

  return {
    title,
    description,
    postedAt: new Date(postedAt),
    city: city as CityEnum,
    preview,
    photos: allPhotos.split(TSV_SEPARATOR.String) as string[],
    isPremium: stringBoolToBool(isPremium as StringBool),
    rating: Number(rating),
    housing: housing as OfferKind,
    bedroomsAmount: Number(bedroomsAmount),
    capacity: Number(capacity),
    price: Number(price),
    features: features.split(TSV_SEPARATOR.String) as Goods[],
    user: {
      name,
      email,
      userpic,
      isPro: stringBoolToBool(userIsPro as StringBool),
    },
    commentsAmount: Number(commentsAmount),
    location: { lat: Number(lat), lng: Number(lng) },
  };
}
