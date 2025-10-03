import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import { AuthService } from "../services/AuthService";
import Button from "./Button";
import SearchableDropdown from "../components/SearchableDropdown";

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
    // radio removed on purpose
    ;
  required?: boolean;
  options?: { label: string; value: any }[];
}

export interface EntityFormProps<T, K extends keyof T> {
  title: string;
  fields: Field<T>[];
  idField: K;
  fetchById?: (id: string | number) => Promise<T>;
  create?: (data: T) => Promise<T>;
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

  const canCreate = createPermission
    ? AuthService.hasPermission(createPermission)
    : false;
  const canUpdate = updatePermission
    ? AuthService.hasPermission(updatePermission)
    : false;
  const canDelete = deletePermission
    ? AuthService.hasPermission(deletePermission)
    : false;

  const [entity, setEntity] = useState<Partial<T>>(
    fields.reduce(
      (acc, f) => ({
        ...acc,
        [f.name]:
          f.type === "checkbox" ? false : /* radio removed */ "" ,
      }),
      {} as Partial<T>
    )
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const parseId = (id: string | undefined): string | number | undefined => {
    if (!id) return undefined;
    return /^\d+$/.test(id) ? parseInt(id, 10) : id;
  };

  // Fetch entity by id
  useEffect(() => {
    if (id && id !== "new" && fetchById) {
      fetchById(id)
        .then((data) => setEntity(data))
        .catch(() =>
          setEntity(
            fields.reduce(
              (acc, f) => ({
                ...acc,
                [f.name]: f.type === "checkbox" ? false : "",
              }),
              {} as Partial<T>
            )
          )
        );
    }
  }, [id, fetchById, fields]);

  // Normal event-based change handler (for input, checkbox)
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
        default:
          value = e.target.value;
      }
    } else {
      value = e.target.value;
    }

    // functional update to prevent stale-overwrite bugs
    setEntity((prev) => ({ ...prev, [name]: value }));
  };

  // Helper for custom components (SearchableDropdown etc.)
  const handleValueChange = (name: keyof T, value: string | number | null) => {
    setEntity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedId = parseId(id);
    try {
      if (parsedId !== undefined && id !== "new" && update) {
        await update(parsedId, entity as T);
      } else if (create) {
        const { [idField]: _, ...dataWithoutId } = entity as T; // remove id for create
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg">
          {fields.map((field) => {
            const value = entity[field.name];

            const labelClass = "w-40 font-medium text-gray-700 text-sm";
            const controlClass = "flex-1";

            // SELECT / SEARCHABLE DROPDOWN
            if (field.type === "select" && field.options) {
              return (
                <div key={String(field.name)} className="flex items-center gap-4">
                  {/* label on the left (fixed width) */}
                  <span className={labelClass}>{field.label}</span>

                  {/* control on the right (takes remaining width) */}
                  <div className={controlClass}>
                    {/* Do NOT pass label prop to SearchableDropdown so it doesn't render its own label above */}
                    <SearchableDropdown
                      options={field.options.map((opt) => ({
                        id: opt.value,
                        name: opt.label,
                      }))}
                      // pass raw-type value (string | number | null) to match option ids
                      value={
                        value !== undefined && value !== null
                          ? (value as unknown as string | number)
                          : null
                      }
                      onChange={(val) => handleValueChange(field.name, val)}
                      displayKey="name"
                      valueKey="id"
                      placeholder={`Select ${field.label}`}
                    />
                  </div>
                </div>
              );
            }

            // CHECKBOX
            if (field.type === "checkbox") {
              return (
                <div key={String(field.name)} className="flex items-center gap-4">
                  <span className={labelClass}>{field.label}</span>
                  <div className={controlClass}>
                    <input
                      id={String(field.name)}
                      name={String(field.name)}
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={handleChange}
                      className="h-4 w-4 accent-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              );
            }

            // DEFAULT INPUT (covers text, number, date, email, tel, etc.)
            return (
              <div key={String(field.name)} className="flex items-center gap-4">
                <span className={labelClass}>{field.label}</span>
                <div className={controlClass}>
                  <input
                    id={String(field.name)}
                    name={String(field.name)}
                    type={field.type || "text"}
                    placeholder={field.label}
                    value={
                      field.type === "number"
                        ? (value ?? "") as unknown as number | string
                        : String(value ?? "")
                    }
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required={field.required}
                  />
                </div>
              </div>
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
