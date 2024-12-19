import { FormSubCategorias } from "../components/modal/FormSubCategorias"
import { TablaSubCategorias } from "../components/TablaSubCategorias"


export const SubCategoriaPage = () => {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Subcategorías</h1>
        <FormSubCategorias />
        <TablaSubCategorias />
      </div>
    );
  };
  