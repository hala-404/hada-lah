"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { categoryAPI } from "@/lib/api"

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
  try {
    const newCategory = await categoryAPI.create({ categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
  }
}

export const getAllCategories = async () => {
  try {
    const categories = await categoryAPI.getAll();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error)
  }
}

