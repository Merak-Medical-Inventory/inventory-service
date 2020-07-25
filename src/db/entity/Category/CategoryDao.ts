import { getManager, getConnection } from "typeorm";
import { Category } from "@db/entity/Category/Category";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const createCategory = async (category: any) => {
  try {
    const categoryRepository = getManager().getRepository(Category);
    await categoryRepository.save(category);
    return category;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findCategory = async (criteria: any) => {
  try {
    const categoryRepository = getManager().getRepository(Category);
    return await categoryRepository.findOne({
      where: criteria
    });
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findAllCategories = async () => {
  try {
    const categoryRepository = getManager().getRepository(Category);
    const categories = await categoryRepository.find();
    return categories;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const updateCategory = async (id: any, dataToUpdate: any) => {
  try {
    const categoryRepository = getManager().getRepository(Category);
    const update = await categoryRepository.update(id, { ...dataToUpdate });
    if (update.affected === 0)
      throw new ErrorHandler(404, "Category not found");
    return await categoryRepository.findOne({ id });
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const deleteCategory = async (id: any) => {
  try {
    const categoryRepository = getManager().getRepository(Category);
    const data = await categoryRepository.delete({ id });
    return { CategoriesDeleted: data.affected };
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
