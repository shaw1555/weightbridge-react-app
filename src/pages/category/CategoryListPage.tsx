import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "./service"; // your API function
import { type Category } from "./types"; // your Product type
import ROUTES from "../../routes";
import { EntityList, type Column } from "../../components/EntityList";

const CategoryListPage: React.FC = () => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        fetchCategories().then(setCategorys);
      } catch (err) {
        setError("Failed to load form names");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const columns: Column<Category>[] = [
    // { key: "category_Id_F", label: "Category Id" },
    { key: "category_f", label: "Category" },
  ];

  return (
    <EntityList
      title="Category"
      data={categorys}
      columns={columns}
      idKey="category_id_f" // 👈 tell which field is the PK
      onRowClick={(id) => navigate(ROUTES.Category_Form(String(id)))}
      onAddClick={() => navigate(ROUTES.Category_Form())}
    />
  );
};

export default CategoryListPage;
