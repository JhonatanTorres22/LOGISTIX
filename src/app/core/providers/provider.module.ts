import { NgModule } from "@angular/core";
import { interceptorProviders } from "../interceptors/interceptor";

import { AuthRepository } from "src/app/auth/domain/repositories/auth.repository";
import { AuthRepositoryImpl } from "src/app/auth/infraestructure/repositories/auth.repository.impl";
import { ProveedorRepository } from "@/proveedor/domain/repositories/proveedor.repository";
import { ProveedorRepositoryImpl } from "@/proveedor/infraestructure/repository/proveedor.repository.impl";
import { EvaluacionRepository } from "@/proveedor/domain/repositories/evaluacion.repository";
import { EvaluacionRepositoryImpl } from "@/proveedor/infraestructure/repository/evaluacion.repository.imp";
import { CategoriaRepository } from "@/categoria/domain/repositories/categoria.repository";
import { CategoriaRepositoryImpl } from "@/categoria/infraestructure/repositories/categoria.repository.impl";
import { ProductoRepository } from "@/producto/domain/repository/producto.repository";
import { ProductoRepositoryImpl } from "@/producto/infraestructure/repository/producto.repository.impl";
import { ProveedorProductoRepository } from "@/proveedor-producto/domain/repositories/proveedor-producto.repository";
import { ProveedorProductoRepositoryImpl } from "@/proveedor-producto/infraestructure/repositories/proveedor-producto.repository.impl";
import { ContactoRepository } from "@/proveedor/domain/repositories/contacto.repository";
import { ContactoRepositoryImpl } from "@/proveedor/infraestructure/repository/contacto.repository.impl";
import { PermisoRepository } from "@/configuracion/usuario/domain/repositories/permiso.repository";
import { PermisoRepositoryImpl } from "@/configuracion/usuario/infraestructure/repositories/permiso.repository.impl";
import { UsuarioRepository } from "@/configuracion/usuario/domain/repositories/usuario.repository";
import { UsuarioRpositoryImpl } from "@/configuracion/usuario/infraestructure/repositories/usuario.repository.impl";
import { GipeoRepository } from "@/proceso-compras/domain/repository/gipeo.repository";
import { GipeoRepositoryImpl } from "@/proceso-compras/infraestructure/repository/gipeo.repository.impl";
import { SolicitudCompraRepository } from "@/proceso-compras/domain/repository/solicitud-compra.repository";
import { SolicitudCompraRepositoryImpl } from "@/proceso-compras/infraestructure/repository/solicitud-compra.repository.impl";
import { AnexoPorFaseRepository } from "@/proceso-compras/domain/repository/anexoSolicitud.repository";
import { AnexoPorFaseRepositoryImpl } from "@/proceso-compras/infraestructure/repository/anexoPorFase.repository.impl";
import { CarpetasRepository } from "@/proceso-compras/domain/repository/carpeta.repository";
import { CarpetasRepositoryImpl } from "@/proceso-compras/infraestructure/repository/carpetas.repository.impl";
import { OrdenCarpetaRepository } from "@/panel-solicitudes/domain/repository/orden-carpeta.repository";
import { OrdenCarpetaRepositoryImpl } from "@/panel-solicitudes/infraestructure/repository/orden-carpeta.repository.impl";
import { CronogramaRepository } from "@/proceso-compras/domain/repository/cronograma.repository";
import { CronogramaRepositoryImpl } from "@/proceso-compras/infraestructure/repository/cronograma.repository.impl";
import { AlcanceRepository } from "@/alcance/domain/repository/alcance.repository";
import { AlcanceRepositoryImpl } from "@/alcance/infraestructure/repository/alcance.repository.impl";
import { AlmacenRepositoryImpl } from "@/alcance/infraestructure/repository/almacen.repository.impl";
import { AlmacenRepository } from "@/alcance/domain/repository/almacen.repository";
import { MarcaRepository } from "@/marca/domain/repositories/marca.repository";
import { MarcaRepositoryImpl } from "@/marca/infraestructure/repositories/marca.repository.impl";
import { BancoRepository } from "@/proveedor/domain/repositories/banco.repository";
import { BancoRepositoryImpl } from "@/proveedor/infraestructure/repository/banco.repository.impl";

import { ProductoHistoricoRepositoryImpl } from "@/proveedor-producto/infraestructure/repositories/producto-historico.repository.impl";
import { ProductoHistoricoRepository } from "@/proveedor-producto/domain/repositories/producto-historico.repository";
import { TrabajadoresPrestadoresRepository } from "@/proveedor/domain/repositories/trabajadoresPrestadores.repository";
import { TrabajadoresPrestadoresRepositoryImpl } from "@/proveedor/infraestructure/repository/trabajadoresPrestadores.repository.impl";
import { EvaluacionSunatRepository } from "@/proveedor/domain/repositories/evaluacionSunat.repository";
import { EvaluacionSunatRepositoryImpl } from "@/proveedor/infraestructure/repository/evaluacionSunat.repository.impl";
import { DeudaCoactivaRepository } from "@/proveedor/domain/repositories/deudaCoactiva.repository";
import { DeudaCoactivaRepositoryImpl } from "@/proveedor/infraestructure/repository/deudaCoactiva.repository.impl";
import { RepresentanteLegalRepository } from "@/proveedor/domain/repositories/representanteLegal.repository";
import { RepresentanteLegalRepositoryImpl } from "@/proveedor/infraestructure/repository/representanteLegal.repository.impl";
import { UnidadMedida } from "@/unidad-medida/ui/unidad-medida";
import { UnidadMedidaRepository } from "@/unidad-medida/domain/repositories/unidad-medida.repository";
import { UnidadMedidaRepositoryImpl } from "@/unidad-medida/infraestructure/repositories/unidad-medida.repository.impl";
import { ProductoAlmacenRepository } from "@/alcance/domain/repository/producto-almacen.repository";
import { ProductoAlmacenRepositoryImpl } from "@/alcance/infraestructure/repository/producto-almacen.repository.impl";


@NgModule({
    exports: [ ],
    imports: [],
    providers: [
        [ 
            {provide : AuthRepository, useClass : AuthRepositoryImpl},
            {provide : ProveedorRepository, useClass : ProveedorRepositoryImpl},
            {provide : EvaluacionRepository, useClass : EvaluacionRepositoryImpl},
            {provide : CategoriaRepository, useClass : CategoriaRepositoryImpl},
            {provide : ProductoRepository, useClass : ProductoRepositoryImpl},
            {provide : ProveedorProductoRepository, useClass: ProveedorProductoRepositoryImpl},
            {provide : ContactoRepository, useClass: ContactoRepositoryImpl},
            {provide : PermisoRepository, useClass : PermisoRepositoryImpl},
            {provide : UsuarioRepository, useClass : UsuarioRpositoryImpl},
            {provide : GipeoRepository, useClass : GipeoRepositoryImpl},
            {provide : SolicitudCompraRepository, useClass : SolicitudCompraRepositoryImpl},
            {provide : AnexoPorFaseRepository, useClass : AnexoPorFaseRepositoryImpl},
            {provide : CarpetasRepository, useClass : CarpetasRepositoryImpl},
            {provide : OrdenCarpetaRepository, useClass : OrdenCarpetaRepositoryImpl},
            {provide : CronogramaRepository, useClass : CronogramaRepositoryImpl},
            {provide : AlcanceRepository, useClass : AlcanceRepositoryImpl},
            {provide : AlmacenRepository, useClass : AlmacenRepositoryImpl},
            {provide : MarcaRepository, useClass: MarcaRepositoryImpl},
            {provide : BancoRepository, useClass: BancoRepositoryImpl},
            {provide : ProductoHistoricoRepository, useClass : ProductoHistoricoRepositoryImpl},
            {provide : TrabajadoresPrestadoresRepository, useClass : TrabajadoresPrestadoresRepositoryImpl},
            {provide : EvaluacionSunatRepository, useClass : EvaluacionSunatRepositoryImpl},
            {provide : DeudaCoactivaRepository, useClass : DeudaCoactivaRepositoryImpl},
            {provide : RepresentanteLegalRepository, useClass : RepresentanteLegalRepositoryImpl},
            {provide : UnidadMedidaRepository, useClass : UnidadMedidaRepositoryImpl},
            {provide : ProductoAlmacenRepository, useClass : ProductoAlmacenRepositoryImpl}
        ]
    ]
})

export class ProvidersModule {}