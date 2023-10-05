import Swal from 'sweetalert2'
import wihtReactContent from 'sweetalert2-react-content'

export function show_alerta(mensaje,icono,foco){
    onfocus(foco)
    const MySwal = wihtReactContent(Swal);
    MySwal.fire({
        title:mensaje,
        icon:icono
    })
}

function onfocus(foco){
    if (foco !== '') {
        document.getElementById(foco).focus()
    }
}