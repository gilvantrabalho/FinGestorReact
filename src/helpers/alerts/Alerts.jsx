import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const danger = (msg) => {
    MySwal.fire({
        icon: 'error',
        title: msg,
        confirmButtonColor: '#3085d6'
    })
}

const success = (msg) => {
    MySwal.fire({
        icon: 'success',
        title: msg,
        showConfirmButton: false,
        timer: 1500
        // confirmButtonColor: '#3085d6'
    })
}

export default {
    danger,
    success,
}