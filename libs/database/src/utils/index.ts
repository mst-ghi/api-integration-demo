import { Logger } from '@nestjs/common';

export const prismaPaginationQuery = (
  page?: string,
  take?: string,
): { skip: number; take: number; page: number } => {
  let pageNum = 1;
  let takeNum = 25;

  try {
    if (page) {
      pageNum = parseInt(page, 10);
    }
  } catch (error) {
    Logger.error('Error in pagination query in page value: ', error);
  }
  try {
    if (take) {
      takeNum = parseInt(take, 10);
    }
  } catch (error) {
    Logger.error('Error in pagination query in take value: ', error);
  }

  return {
    skip: pageNum > 0 ? (pageNum - 1) * takeNum : 0,
    take: takeNum,
    page: pageNum,
  };
};
