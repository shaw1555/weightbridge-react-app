import React from "react";
import { type Category } from "./types";
import {
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./service";
import ROUTES from "../../routes";
import EntityForm, { type Field } from "../../components/EntityForm";

const CategoryFormPage: React.FC = () => {
  const fields: Field<Category>[] = [
    {
      name: "category_F",
      label: "Category Name",
      type: "text",
      required: true,
    },
  ];
  return (
    <EntityForm<Category, "category_Id_F">
      title="Category"
      idField="category_Id_F"
      fields={fields}
      fetchById={fetchCategoryById}
      create={createCategory}
      update={updateCategory}
      deleteFn={deleteCategory}
      listRoute={ROUTES.Category_List}
      createPermission="Create_Category"
      updatePermission="Update_Category"
      deletePermission="Delete_Category"
    />
  );
};

export default CategoryFormPage;
