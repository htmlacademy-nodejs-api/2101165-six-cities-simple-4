import dayjs from 'dayjs';

import { OfferGeneratorInterface } from './offer-generator.interface';
import { MockData } from '../../types/mock-data.type';
import {
  getRandomIntFromMinMaxTuple,
  getRandomArrItem,
  getRandomBoolean,
  getRandomLengthArr,
  TSV_SEPARATOR
} from '../../core/helpers/index.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate() {
    const {
      cities,
      titles,
      descriptions,
      photos,
      housing,
      user,
      features,
      minMax,
    } = this.mockData;

    const currentCity = getRandomArrItem(cities);

    const title = getRandomArrItem<string>(titles);
    const description = getRandomArrItem<string>(descriptions);
    const postedAt = dayjs()
      .subtract(getRandomIntFromMinMaxTuple(minMax.weekdays), 'day')
      .toISOString();
    const city = currentCity.name;
    const mainPhoto = getRandomArrItem<string>(photos);
    const offerPhotos = photos.join(TSV_SEPARATOR.String);
    const isPremium = getRandomBoolean();
    const rating = getRandomIntFromMinMaxTuple(minMax.rating);
    const housingName = getRandomArrItem<string>(housing);
    const bedroomsAmount = getRandomIntFromMinMaxTuple(minMax.bedrooms);
    const capacity = getRandomIntFromMinMaxTuple(minMax.capacity);
    const price = getRandomIntFromMinMaxTuple(minMax.price);
    const featuresList = getRandomLengthArr(features).join(
      TSV_SEPARATOR.String
    );
    const userInfo = [
      getRandomArrItem<string>(user.names),
      getRandomArrItem<string>(user.emails),
      getRandomArrItem<string>(user.userpics),
      getRandomArrItem<string>(user.passwords),
    ].join(TSV_SEPARATOR.String);
    const commentsAmount = getRandomIntFromMinMaxTuple(minMax.comments);
    const location = currentCity.coords.join(TSV_SEPARATOR.String);

    return [
      title,
      description,
      postedAt,
      city,
      mainPhoto,
      offerPhotos,
      isPremium,
      rating,
      housingName,
      bedroomsAmount,
      capacity,
      price,
      featuresList,
      userInfo,
      commentsAmount,
      location,
    ].join(TSV_SEPARATOR.Tab);
  }
}
