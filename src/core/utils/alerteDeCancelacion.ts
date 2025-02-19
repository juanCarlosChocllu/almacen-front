import Swal from 'sweetalert2';

export const alertaDeCancelacion = (accionArealizar: () => any) => {
  Swal.fire({
    customClass: {
      popup: 'w-49 p-1',
      title: 'text-lg',
      confirmButton: 'text-sm',
      cancelButton: 'text-sm',
    },
    title: '¿Estás seguro de cancelar?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'error',  // Changed to 'error' icon
    showCancelButton: true,
    confirmButtonText: 'Rechazar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      accionArealizar();
    }
  });
};
