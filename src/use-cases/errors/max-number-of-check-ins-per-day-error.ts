export class MaxNumberOfCheckInsPerDayError extends Error {
  constructor() {
    super('Max number of check ins per day reached.')
  }
}
