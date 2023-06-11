import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { CityEnum } from '../../types/city.enum.js';
import { OfferKind } from '../../types/offer-kind.enum.js';
import { Goods } from '../../types/goods.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { Location } from '../../types/location.type.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postedAt!: Date;

  @prop({
    city: () => String,
    enum: CityEnum,
    required: true
  })
  public city!: CityEnum;

  @prop({ trim: true, required: true })
  public preview!: string;

  @prop({ required: true })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferKind,
    required: true
  })
  public type!: OfferKind[];

  @prop({ required: true, default: 0 })
  public rooms!: number;

  @prop({ required: true, default: 0 })
  public guests!: number;

  @prop({ required: true, default: 0 })
  public price!: number;

  @prop({
    type: () => String,
    required: true,
    enum: Goods
  })
  public comforts!: Goods[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop()
  public coordinates!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
