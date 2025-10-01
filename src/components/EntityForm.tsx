import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import { AuthService } from "../services/AuthService";
import Button from "./Button";

export interface Field<T> {
  name: keyof T;
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
  options?: { label: string; value: any }[];
}

export interface EntityFormProps<T, K extends keyof T> {
  title: string;
  fields: Field<T>[];
  idField: K;
  fetchById?: (id: string | number) => Promise<T>;
  create?: (data: T) => Promise<T>; // full entity now
  update?: (id: string | number, data: T) => Promise<T>;
  deleteFn?: (id: string | number) => void | Promise<void>;
  listRoute: string;
  createPermission?: string;
  updatePermission?: string;
  deletePermission?: string;
}

function EntityForm<T extends object, K extends keyof T>({
  title,
  fields,
  idField,
  fetchById,
  create,
  update,
  deleteFn,
  listRoute,
  createPermission,
  updatePermission,
  deletePermission,
}: EntityFormProps<T, K>) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const canCreate = createPermission ? AuthService.hasPermission(createPermission) : false;
  const canUpdate = updatePermission ? AuthService.hasPermission(updatePermission) : false;
  const canDelete = deletePermission ? AuthService.hasPermission(deletePermission) : false;

  const [entity, setEntity] = useState<Partial<T>>(
    fields.reduce(
      (acc, f) => ({
        ...acc,
        [f.name]: f.type === "checkbox" ? false : f.type === "radio" ? undefined : "",
      }),
      {} as Partial<T>
    )
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const parseId = (id: string | undefined): string | number | undefined => {
    if (!id) return undefined;
    return /^\d+$/.test(id) ? parseInt(id, 10) : id;
  };

  // Fetch entity
  useEffect(() => {
    if (id && id !== "new" && fetchById) {
      fetchById(id)
        .then((data) => setEntity(data))
        .catch(() =>
          setEntity(
            fields.reduce(
              (acc, f) => ({
                ...acc,
                [f.name]: f.type === "checkbox" ? false : f.type === "radio" ? undefined : "",
              }),
              {} as Partial<T>
            )
          )
        );
    }
  }, [id, fetchById, fields]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as keyof T;
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
          value = e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value;
          break;
        default:
          value = e.target.value;
      }
    } else {
      value = e.target.value;
    }

    setEntity({ ...entity, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedId = parseId(id);
    try {
      if (parsedId !== undefined && id !== "new" && update) {
        await update(parsedId, entity as T);
      } else if (create) {
        // automatically remove id field for create
        const { [idField]: _, ...dataWithoutId } = entity as T;
        await create(dataWithoutId as T);
      }
      navigate(listRoute, { replace: true });
    } catch (err) {
      console.error(err);
      alert("Error saving entity");
    }
  };

  const handleConfirmDelete = async () => {
    const parsedId = parseId(id);
    if (parsedId !== undefined && deleteFn) {
      await deleteFn(parsedId);
      navigate(listRoute, { replace: true });
    }
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

            if (field.type === "radio" && field.options) {
              return (
                <div key={String(field.name)} className="flex flex-col">
                  <span className="font-medium">{field.label}</span>
                  <div className="flex gap-4">
                    {field.options.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-1">
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

            return (
              <input
                key={String(field.name)}
                name={String(field.name)}
                placeholder={field.label}
                type={field.type || "text"}
                checked={field.type === "checkbox" ? (value as boolean) : undefined}
                value={field.type === "checkbox" ? undefined : String(value ?? "")}
                onChange={handleChange}
                className="border p-2 rounded"
                required={field.required}
              />
            );
          })}

          <div className="flex gap-2 mt-4">
            {(id === "new" && canCreate) || (id !== "new" && canUpdate) ? (
              <Button type="submit" color="green">
                {id === "new" ? "Create" : "Update"}
              </Button>
            ) : null}

            {id !== "new" && deleteFn && canDelete && (
              <Button type="button" color="red" onClick={() => setConfirmOpen(true)}>
                Delete
              </Button>
            )}

            <Button type="button" color="gray" onClick={() => navigate(listRoute)}>
              Cancel
            </Button>
          </div>
        </form>

        <ConfirmDialog
          open={confirmOpen}
          message={`Are you sure you want to delete this ${title}?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </div>
    </div>
  );
}

export default EntityForm;
