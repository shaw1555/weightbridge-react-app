import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import { AuthService } from "../services/AuthService";
import Button from "./Button";

export interface Field<T> {
  name: keyof Omit<T, "id">;
  label: string;
  type?:
    | "text"
    | "number"
    | "checkbox"
    | "date"
    | "select"
    | "email"
    | "tel"
    | "radio";
  required?: boolean;
  options?: { label: string; value: any }[]; // for select or radio
}

export interface EntityFormProps<T extends { id?: string | number }> {
  title: string;
  fields: Field<T>[];
  fetchById?: (id: string | number) => Promise<T | null>;
  create?: (data: Omit<T, "id">) => Promise<T>;
  update?: (data: T) => Promise<T>;
  deleteFn?: (id: string | number) => void | Promise<void>;
  listRoute: string;
  createPermission?: string;
  updatePermission?: string;
  deletePermission?: string;
}

function EntityForm<T extends { id?: string | number }>({
  title,
  fields,
  fetchById,
  create,
  update,
  deleteFn,
  listRoute,
  createPermission,
  updatePermission,
  deletePermission,
}: EntityFormProps<T>) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const canCreate = createPermission
    ? AuthService.hasPermission(createPermission)
    : false;
  const canUpdate = updatePermission
    ? AuthService.hasPermission(updatePermission)
    : false;
  const canDelete = deletePermission
    ? AuthService.hasPermission(deletePermission)
    : false;

  const [entity, setEntity] = useState<Omit<T, "id">>(
    fields.reduce(
      (acc, f) => ({
        ...acc,
        [f.name]:
          f.type === "checkbox" ? false : f.type === "radio" ? undefined : "",
      }),
      {} as Omit<T, "id">
    )
  );

  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (id && id !== "new" && fetchById) {
      fetchById(id).then((data) => {
        if (data) {
          const { id: _id, ...rest } = data;
          setEntity(rest as Omit<T, "id">);
        } else {
          setEntity(
            fields.reduce(
              (acc, f) => ({
                ...acc,
                [f.name]:
                  f.type === "checkbox"
                    ? false
                    : f.type === "radio"
                    ? undefined
                    : "",
              }),
              {} as Omit<T, "id">
            )
          );
        }
      });
    }
  }, [id, fetchById, fields]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as keyof Omit<T, "id">;
    let value: any;

    if (e.target instanceof HTMLInputElement) {
      switch (e.target.type) {
        case "number":
          value = e.target.value ? parseFloat(e.target.value) : "";
          break;
        case "checkbox":
          value = e.target.checked;
          break;
        case "radio":
          // Convert radio string values back to boolean if needed
          if (e.target.value === "true") value = true;
          else if (e.target.value === "false") value = false;
          else value = e.target.value;
          break;
        default:
          value = e.target.value;
      }
    } else if (e.target instanceof HTMLSelectElement) {
      value = e.target.value;
    }

    setEntity({ ...entity, [name]: value });
  };

  const parseId = (id: string | undefined): string | number | undefined => {
    if (!id) return undefined;
    return /^\d+$/.test(id) ? parseInt(id, 10) : id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedId = parseId(id);
      if (parsedId !== undefined && id !== "new" && update)
        await update({ id: parsedId, ...(entity as T) });
      else if (create) await create(entity);
      navigate(listRoute, { replace: true });
    } catch (err) {
      console.error(err);
      alert("Error saving entity");
    }
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    const parsedId = parseId(id);
    if (parsedId !== undefined && deleteFn) {
      await deleteFn(parsedId);
      navigate(listRoute, { replace: true });
    }
    setConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4">
          {id === "new" ? `Add ${title}` : `Edit ${title}`}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
          {fields.map((field) => {
            const value = entity[field.name];

            // Handle select fields
            if (field.type === "select" && field.options) {
              return (
                <select
                  key={String(field.name)}
                  name={String(field.name)}
                  value={value as string}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              );
            }

            // Handle radio fields
            if (field.type === "radio" && field.options) {
              return (
                <div key={String(field.name)} className="flex flex-col">
                  <span className="font-medium">{field.label}</span>
                  <div className="flex gap-4">
                    {field.options.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-1"
                      >
                        <input
                          type="radio"
                          name={String(field.name)}
                          value={String(opt.value)}
                          checked={value === opt.value}
                          onChange={handleChange}
                          required={field.required}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              );
            }

            // Handle all other fields (text, number, email, date, checkbox)
            return (
              <input
                key={String(field.name)}
                name={String(field.name)}
                placeholder={field.label}
                type={field.type || "text"}
                checked={
                  field.type === "checkbox" ? (value as boolean) : undefined
                }
                value={
                  field.type === "checkbox" ? undefined : String(value ?? "")
                }
                onChange={handleChange}
                className="border p-2 rounded"
                required={field.required}
              />
            );
          })}

          <div className="flex gap-2 mt-4">
            {(id === "new" && canCreate) || (id !== "new" && canUpdate) ? (
              // <button
              //   type="submit"
              //   className="bg-green-500 text-white px-4 py-2 rounded"
              // >
              //   {id === "new" ? "Create" : "Update"}
              // </button>

              <Button
                type="submit"
                color="green"
                onClick={() => alert("clicked")}
              >
                {id === "new" ? "Create" : "Update"}
              </Button>
            ) : null}

            {id !== "new" && deleteFn && canDelete && (
              <Button type="button" color="red" onClick={handleDeleteClick}>
                Delete
              </Button>
            )}

            <Button
              type="button"
              color="gray"
              onClick={() => navigate(listRoute)}
            >
              Cancel
            </Button>
          </div>
        </form>

        <ConfirmDialog
          open={confirmOpen}
          message={`Are you sure you want to delete this ${title}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </div>
  );
}

export default EntityForm;
