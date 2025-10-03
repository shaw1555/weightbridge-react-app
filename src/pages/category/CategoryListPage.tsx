import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "./service"; // your API function
import { type Category } from "./types";  // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const CategoryListPage: React.FC = () => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(setCategorys);
  }, []);

  const columns: Column<Category>[] = [
    // { key: "category_Id_F", label: "Category Id" }, 
    { key: "category_F", label: "Category" },
  ];

  return (
    <EntityList
      title="Category"
      data={categorys}
      columns={columns}
       idKey="category_Id_F"   // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.Category_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.Category_Form())}
    />
  );
};

export default CategoryListPage;
