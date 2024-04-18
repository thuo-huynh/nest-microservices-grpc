import { FindOneData } from "./find-one-data.dto";

export interface FindOneResponse {
    status: number;
    error: string[];
    data: FindOneData | undefined;
  }