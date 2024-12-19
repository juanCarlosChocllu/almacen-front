import { FormEmpresa } from "../components/modal/FormEmpresa"
import { TablaEmpresa } from "../components/TablaEmpresa"

export const EmpresaPage = () => {
  return (
     <>
      <div>{<FormEmpresa/>}</div>
      <div>{<TablaEmpresa/>}</div>
     </>
  )
}

