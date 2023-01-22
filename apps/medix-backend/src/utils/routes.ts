import { Request } from "express";
import { PaginateOptions } from "mongoose";

export const parsePaginationQs = (qs: Request["query"]): PaginateOptions => {
  return Object.keys(qs).length === 0
    ? {
        pagination: false,
      }
    : {
        limit: qs.limit ? Number(qs.limit) : 20,
        page: qs.page ? Number(qs.page) : 1,
        useEstimatedCount: true,
        allowDiskUse: true,
        sort: {
          _id: -1,
        },
      };
};
