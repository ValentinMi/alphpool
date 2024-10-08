"use server";
import { CreatePoolContract, PoolContract } from "./types";
import { prisma } from "./prisma";

export const createPool = async (
  poolParams: CreatePoolContract,
): Promise<PoolContract | undefined> => {
  try {
    return await prisma.pool.create({
      data: {
        contractAddress: poolParams.contractAddress,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
