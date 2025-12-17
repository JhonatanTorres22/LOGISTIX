import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from 'sweetalert2'
import { tipoAlerta } from "./alert.interface";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})


export class AlertService {

  constructor(
    private messageService: MessageService
  ) { }

  showAlert(
    mensaje: string,
    tipo: tipoAlerta = 'success',
    duracion: number = 5
  ) {    
    this.messageService.add({
      severity: this.mapToastSeverity(tipo),
      summary: '',
      detail: mensaje,
      life: duracion * 1000
    });
  }

  sweetAlert(icon: SweetAlertIcon, title?: string, text?: string, confirmButtonText: string = 'Entendido') {

    return new Promise<boolean>((resolve, reject) => {

      switch (icon) {
        case 'question': {
          Swal.fire({
            icon: icon, title: title, text: text, confirmButtonText: 'SI, CONTINUAR', showCancelButton: true,
            confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', cancelButtonText: 'CANCELAR', allowEnterKey: false, allowEscapeKey: false, allowOutsideClick: false
          }).then(result => {
            result.isConfirmed ? resolve(true) : resolve(false)
          }); break;
        }
        case 'success': {
          Swal.fire({
            icon: icon, title: title, text: text, confirmButtonText: confirmButtonText, showCancelButton: false,
            confirmButtonColor: '#3085d6', allowEnterKey: false, allowEscapeKey: false, allowOutsideClick: false
          }).then(result => {
            console.log(result);
            result.isConfirmed ? resolve(true) : resolve(false)
          }); break;
        }
        case 'error': {
          Swal.fire({
            icon: icon,
            title: 'No fue posible conectarse al servidor',
            text: 'Ocurrió un error al comunicarnos con el servidor, vuelva a intentarlo en unos minutos, si el problema persiste, comunicarse con el Administrador.'
          }); break;
        }

        case 'warning': {
          Swal.fire({
            icon: icon, title: title, text: text, confirmButtonText: confirmButtonText, showCancelButton: false,
            confirmButtonColor: '#3085d6', allowEnterKey: false, allowEscapeKey: false, allowOutsideClick: false
          }).then(result => {
            result.isConfirmed ? resolve(true) : resolve(false)
          }); break;
        }

        case 'info': {
          Swal.fire({
            icon: icon, title: title, text: text, confirmButtonText: confirmButtonText, showCancelButton: false,
            confirmButtonColor: '#3085d6', allowEnterKey: false, allowEscapeKey: false, allowOutsideClick: false
          }).then(result => {
            result.isConfirmed ? resolve(true) : resolve(false)
          }); break;
        }

      }
    })
  }

  mapToastSeverity(tipo: tipoAlerta) {
    switch (tipo) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warn';
      case 'info': return 'info';
      default: return 'info';
    }
  }

}