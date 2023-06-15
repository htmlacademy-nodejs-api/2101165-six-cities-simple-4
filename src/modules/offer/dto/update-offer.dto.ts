import { OfferKind } from '../../../types/offer-kind.enum';
import { CityEnum } from '../../../types/city.enum.js';
import { Goods } from '../../../types/goods.enum';
import { Location } from '../../../types/location.type';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postedAt?: Date;
  public city?: CityEnum;
  public preview?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public housing?: OfferKind;
  public bedroomsAmount?: number;
  public capacity?: number;
  public price?: number;
  public features?: Goods[];
  public userId?: string;
  public commentsAmount?: number;
  public location?: Location;
}
