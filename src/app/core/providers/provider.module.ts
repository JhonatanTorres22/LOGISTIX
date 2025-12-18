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


@NgModule({
    exports: [ ],
    imports: [],
    providers: [
        interceptorProviders, 
        [
            
            {provide : AuthRepository, useClass : AuthRepositoryImpl},
            {provide : ProveedorRepository, useClass : ProveedorRepositoryImpl},
            {provide : EvaluacionRepository, useClass : EvaluacionRepositoryImpl},
            {provide : CategoriaRepository, useClass : CategoriaRepositoryImpl}
           
        ]
    ]
})

export class ProvidersModule {}