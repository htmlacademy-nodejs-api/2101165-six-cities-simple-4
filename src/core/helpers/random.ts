export function getRandomInt(min: number, max: number, numAfterDigit = 0) {
  return Number((Math.random() * (max - min) + min).toFixed(numAfterDigit));
}

export function getRandomIntFromMinMaxTuple(
  rangeTuple: [number, number],
  numAfterDigit = 0
): number {
  const [min, max] = rangeTuple;
  return Number(getRandomInt(min, max).toFixed(numAfterDigit));
}

export function getRandomArrItem<T>(items: T[]): T {
  return items[getRandomInt(0, items.length - 1)];
}

export function getRandomLengthArr<T>(items: T[]): T[] {
  const startPosition = getRandomInt(0, items.length - 1);
  const endPosition = startPosition + getRandomInt(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomBoolean() {
  return Math.random() < 0.5;
}
