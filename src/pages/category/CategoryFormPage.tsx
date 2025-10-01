// import React from "react";
// import { type Category } from "./types";
// import {
//   fetchProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "./service";
// import ROUTES from "../../routes";
// import EntityForm, { type Field } from "../../components/EntityForm";

// const CategoryFormPage: React.FC = () => {
//   const fields: Field<Category>[] = [
//     { name: "name", label: "Name", required: true },
//     { name: "price", label: "Price", type: "number", required: true },
//   ];

//   return (
//     <EntityForm<Category>
//       title="Product"
//       fields={fields}
//       fetchById={fetchProductById}
//       create={createProduct}
//       update={updateProduct}
//       deleteFn={deleteProduct}
//       listRoute={ROUTES.PRODUCT_LIST}
//       createPermission="CREATE_PRODUCT"
//       updatePermission="UPDATE_PRODUCT"
//       deletePermission="DELETE_PRODUCT"
//     />
//   );
// };

// export default CategoryFormPage;
