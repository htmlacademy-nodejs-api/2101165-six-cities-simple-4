import { Offer } from '../../types/offer.type.js';
import { City } from '../../types/city.type.js';
import { OfferKind } from '../../types/offer-kind.type.js';
import { Goods } from '../../types/goods.type.js';
import { OfferPhotos } from '../../types/offerPhotos.type';
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

  const [name, email, userpic, password, userIsPro] = user.split(TSV_SEPARATOR.String);
  const [lat, lng] = location.split(TSV_SEPARATOR.String);

  return {
    title,
    description,
    postedAt: new Date(postedAt),
    city: city as City,
    photos: {
      preview,
      all: allPhotos.split(TSV_SEPARATOR.String) as OfferPhotos,
    },
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
      password,
      isPro: stringBoolToBool(userIsPro as StringBool),
    },
    commentsAmount: Number(commentsAmount),
    location: { lat: Number(lat), lng: Number(lng) },
  };
}