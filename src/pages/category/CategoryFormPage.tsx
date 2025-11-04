import React from "react";
import { type Category } from "./types";
import {
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./service";
import ROUTES from "../../config/routes";
import EntityForm, { type Field } from "../../components/EntityForm";
import { PERMISSIONS } from "../../constants";

const CategoryFormPage: React.FC = () => {
  const fields: Field<Category>[] = [
    {
      name: "category_f",
      label: "Category Name",
      type: "text",
      required: true,
    },
  ];
  return (
    <EntityForm<Category, "category_id_f">
      title="Category"
      idField="category_id_f"
      fields={fields}
      fetchById={fetchCategoryById}
      create={createCategory}
      update={updateCategory}
      deleteFn={deleteCategory}
      listRoute={ROUTES.Category_List}
      createPermission={PERMISSIONS.CREATE_CATEGORY}
      updatePermission={PERMISSIONS.UPDATE_CATEGORY}
      deletePermission={PERMISSIONS.DELETE_CATEGORY}
    />
  );
};

export default CategoryFormPage;
