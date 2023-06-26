import {prop, modelOptions, getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { CityEnum } from '../../types/city.enum.js';
import { City } from '../../types/city.type.js';

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities',
  },
})
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({ required: true, enum: CityEnum })
  public name!: CityEnum;
}

export const CityModel = getModelForClass(CityEntity);
