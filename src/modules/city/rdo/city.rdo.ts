import { Expose } from 'class-transformer';

export default class CityRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public offersCount!: number;
}
