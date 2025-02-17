import Swal from 'sweetalert2'
  export  const alertaDeconfirmacion = (accionArealizar:()=>any) => {
      Swal.fire({
        customClass: {
            popup: 'w-49 p-1 ', 
            title: 'text-lg', 
            confirmButton: 'text-sm', 
            cancelButton: 'text-sm', 
          },
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
       
      }).then((result) => {
        if (result.isConfirmed) {
            accionArealizar();
        } 
      });
    };
  