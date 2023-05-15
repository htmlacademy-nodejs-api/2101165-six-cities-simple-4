import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { City } from '../../types/city.type.js';
import { OfferKind } from '../../types/offer-kind.type.js';
import { ProfileKind } from '../../types/profile-kind.type.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => {
        const [
          title,
          description,
          createDate,
          city,
          previewImage,
          images,
          isPremium,
          rating,
          type,
          rooms,
          maxAdults,
          price,
          goods,
          name,
          email,
          avatar,
          userType,
          commentsCount,
          location,
        ] = line.split('\t');

        const [latitude, longitude] = location.split(';')
          .map((item) => Number(item));

        return {
          title,
          description,
          createdDate: new Date(createDate),
          city: city as City,
          previewImage,
          images: images.split(';'),
          isPremium: Boolean(isPremium),
          rating: Number(rating),
          type: type as OfferKind,
          rooms: Number(rooms),
          maxAdults: Number(maxAdults),
          price: Number(price),
          goods: goods.split(';'),
          host: {
            name,
            email,
            avatar,
            type: userType as ProfileKind,
          },
          commentsCount: Number(commentsCount),
          location: {
            longitude,
            latitude,
          }
        };
      });
  }
}
