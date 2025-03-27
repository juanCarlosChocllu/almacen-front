import Swal, { SweetAlertResult } from 'sweetalert2';

export const alertaStockRegistrado = (): Promise<SweetAlertResult<any>> => {
  return Swal.fire({
    customClass: {
      popup: 'w-49 p-1',
      title: 'text-lg',
      confirmButton: 'text-sm bg-blue-500 text-white',
      cancelButton: 'text-sm',
    },
    title: 'Producto ya registrado',
    text: 'El producto o stock que intentas agregar ya existe.',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Continuar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6', 
    cancelButtonColor: '#6c757d', 
  });
};
