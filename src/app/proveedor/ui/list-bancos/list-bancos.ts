import { Component, effect, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Dialog } from "primeng/dialog";
import { AddEditBancos } from "../add-edit-bancos/add-edit-bancos";
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { BancoRepository } from '@/proveedor/domain/repositories/banco.repository';
import { BancoSignal } from '@/proveedor/domain/signals/banco.signal';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { CommonModule } from '@angular/common';
import { DataViewModule } from "primeng/dataview";
import { AvatarModule } from "primeng/avatar";
import { EliminarBanco, ListarBanco } from '@/proveedor/domain/models/banco.model';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';

@Component({
  selector: 'app-list-bancos',
  imports: [Dialog, AddEditBancos, ProcesoComprasModule, CommonModule, DataViewModule, AvatarModule],
  templateUrl: './list-bancos.html',
  styleUrl: './list-bancos.scss'
})
export class ListBancos implements OnInit {
  vista: 'lista' | 'form' = 'lista';
  loading: boolean = false
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>()

  private proveedorSignal = inject(ProveedorSignal)
  selectProveedor = this.proveedorSignal.proveedorSelect
  private bancoSignal = inject(BancoSignal)
  listBanco = this.bancoSignal.listBanco
  selectBanco = this.bancoSignal.selectBanco
  bancoDefault = this.bancoSignal.selectBancoDefault
  actionBanco = this.bancoSignal.actionBanco
  private alert = inject(AlertService)
  private repository = inject(BancoRepository)

  constructor(){
    effect(() => {
      if(this.actionBanco() == ''){return}
      this.obtenerBanco()
      this.actionBanco.set('')
    })
  }
  ngOnInit(): void {
    // this.obtenerAllBancos()
    this.obtenerBanco()
  }

  obtenerBanco = () => {
    this.loading = true
    this.repository.obtenerBanco(this.selectProveedor().id).subscribe({
      next : (data) => {
        this.listBanco.set(data.data)
        this.alert.showAlert(`Listando los bancos, ${data.message}`, 'success')
        this.loading = false
      },
      error : (err) => {
        this.alert.showAlert(`Error al listar los bancos`, 'error')
        this.loading = false
      }
    })
  }
  obtenerAllBancos = () => {
    this.loading = true
    this.repository.obtenerAllBancos().subscribe({
      next: (data) => {
        this.listBanco.set(data.data)
        this.alert.showAlert(`Listando los bancos, ${data.message}`, 'success')
        this.loading = false
      },
      error: (err) => {
        console.log(err);

        this.alert.showAlert(`Error al listar los bancos`, 'error')
        this.loading = false
      }
    })
  }

  getBancoAvatarClass(nombreBanco: string): string {
  const banco = nombreBanco.toLowerCase();

  if (banco.includes('bcp')) return 'bg-blue-600 text-white';
  if (banco.includes('scotia')) return 'bg-red-600 text-white';
  if (banco.includes('interbank')) return 'bg-green-600 text-white';
  if (banco.includes('bbva')) return 'bg-indigo-600 text-white';
  if (banco.includes('nacion')) return 'bg-yellow-500 text-black';

  return 'bg-gray-400 text-white';
}

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  seleccionarBanco = (banco: ListarBanco) => {
    this.selectBanco.set(banco)
    this.vista = 'form'
  }
  confirmEliminar = (banco: ListarBanco) => {
    this.loading = true
    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar el banco?')
      .then(result => {
        if (!result) { return }
        let eliminar: EliminarBanco = {
          idBanco: banco.idBanco
        }
        this.eliminar(eliminar)
      })
  }
  eliminar = (eliminar: EliminarBanco) => {
    this.repository.eliminarBanco(eliminar).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Banco eliminado, ${res.message}`, 'success')
        this.obtenerBanco()
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al eliminar, ${err.message}`, 'error')
      }
    })
  }


  cerrarFormulario() {
    this.vista = 'lista';
  }
}
