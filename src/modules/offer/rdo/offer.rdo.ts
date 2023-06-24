import { Expose, Type } from 'class-transformer';
import { Goods } from '../../../types/goods.enum.js';
import { Location } from '../../../types/location.type.js';
import { OfferKind } from '../../../types/offer-kind.enum.js';
import CityRdo from '../../city/rdo/city.rdo.js';

export default class OfferRdo {
  @Expose()
  public title!: string;
  
  @Expose()
  public description!: string;
  
  @Expose()
  public postedAt!: Date;
  
  @Expose()
  @Type(() => CityRdo)
  public city!: CityRdo;
  
  @Expose()
  public preview!: string;
  
  @Expose()
  public photos!: string[];
  
  @Expose()
  public isPremium!: boolean;
  
  @Expose()
  public rating!: number;
  
  @Expose()
  public housing!: OfferKind;
  
  @Expose()
  public bedroomsAmount!: number;
  
  @Expose()
  public capacity!: number;
  
  @Expose()
  public price!: number;
  
  @Expose()
  public features!: Goods[];
  
  @Expose()
  public userId!: string;
  
  @Expose()
  public commentsAmount!: number;
  
  @Expose()
  public location!: Location;
}