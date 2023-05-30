type MinMax = [number, number];

export type MockData = {
  titles: string[];
  descriptions: string[];
  cities: {
    name: string;
    coords: [number, number];
  }[];
  photos: string[];
  features: string[];
  housing: string[];
  user: {
    names: string[];
    emails: string[];
    userpics: string[];
    passwords: string[];
  };
  minMax: {
    rating: MinMax;
    bedrooms: MinMax;
    capacity: MinMax;
    price: MinMax;
    comments: MinMax;
    weekdays: MinMax;
  };
};
