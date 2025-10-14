import React, { useEffect, useState } from "react";
import { type Setup } from "./types";
import {
  fetchCategoriesNames,
  fetchSetupById,
  createSetup,
  updateSetup,
  deleteSetup,
} from "./service";
import ROUTES from "../../routes";
import EntityForm, { type Field } from "../../components/EntityForm";

const SetupFormPage: React.FC = () => {
  const [CategoriesNames, setCategoriesNames] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const names = await fetchCategoriesNames();
        setCategoriesNames(names);
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

  const fields: Field<Setup>[] = [
    {
      name: "category_f",
      label: "Category",
      type: "select",
      required: true,
      options: CategoriesNames.map((name) => ({
        label: name,
        value: name,
      })),
    },
    {
      name: "description_f",
      label: "Description",
      type: "text",
      required: true,
    },
    {
      name: "note_f",
      label: "Note",
      type: "text",
    },
    {
      name: "option1_f",
      label: "Option1",
      type: "text",
    },

    {
      name: "is_default_f",
      label: "Default",
      type: "checkbox", 
    },
  ];
  return (
    <EntityForm<Setup, "setup_id_f">
      title="Setup"
      idField="setup_id_f"
      fields={fields}
      fetchById={fetchSetupById}
      create={createSetup}
      update={updateSetup}
      deleteFn={deleteSetup}
      listRoute={ROUTES.Setup_List}
      createPermission="Create_Setup"
      updatePermission="Update_Setup"
      deletePermission="Delete_Setup"
    />
  );
};

export default SetupFormPage;
