import { SharedModule } from '@/core/components/shared.module';
import { Component } from '@angular/core';
import { ListUsuario } from "./list-usuario/list-usuario";

@Component({
  selector: 'app-usuario-component',
  imports: [SharedModule, ListUsuario],
  templateUrl: './usuario-component.html',
  styleUrl: './usuario-component.scss'
})
export class UsuarioComponent {

}
