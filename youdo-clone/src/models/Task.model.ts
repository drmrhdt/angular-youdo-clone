import { Category } from "./Category.model";

export interface Task {
  id: number;
  description: string;
  category: string; // do I need it?
  subcategory: string;
  comment: string;
  time: string;
  executionTime: {
    startDate: null | number | string;
    startTime: null | number | string;
    endDate?: null | number | string;
    endTime?: null | number | string;
  };
  address: string; // it will be FormArray
  budget: number;
  author: string;
  email: string;
  tel: string;
  isBusiness: false;
  additionalConditions: {
    isSubscribeSuggestions: false;
    isShowOnlyToExecutors: false;
  };
  reviews: {
    positive: number;
    negative: number;
  };
  isSbr: boolean;
  createDate: number;
}