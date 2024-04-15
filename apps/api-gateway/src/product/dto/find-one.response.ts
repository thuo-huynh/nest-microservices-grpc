import { FindOneData } from './find-one-data';

export interface FindOneResponse {
  status: number;
  error: string[];
  data: FindOneData | undefined;
}
