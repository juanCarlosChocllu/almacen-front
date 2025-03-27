import Swal from 'sweetalert2';


export const alertaDeEliminacion = (accionArealizar: () => any) => {
    Swal.fire({
      customClass: {
        popup: 'w-49 p-1',
        title: 'text-lg',
        confirmButton: 'text-sm bg-red-500 text-white', 
        cancelButton: 'text-sm',
      },
      title: '¿Estás seguro de eliminar?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33', 
      cancelButtonColor: '#6c757d', 
    }).then((result) => {
      if (result.isConfirmed) {
        accionArealizar();
      }
    });
  };