export interface IListResponse<T> {
  info: {
    page: number,
    results: number,
    seed: string,
    version: string,
  };
  results: T[];
}
