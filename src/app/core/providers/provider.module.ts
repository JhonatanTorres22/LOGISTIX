import { NgModule } from "@angular/core";
import { interceptorProviders } from "../interceptors/interceptor";

import { AuthRepository } from "src/app/auth/domain/repositories/auth.repository";
import { AuthRepositoryImpl } from "src/app/auth/infraestructure/repositories/auth.repository.impl";
import { ProveedorRepository } from "@/proveedor/domain/repositories/proveedor.repository";
import { ProveedorRepositoryImpl } from "@/proveedor/infraestructure/repository/proveedor.repository.impl";


@NgModule({
    exports: [ ],
    imports: [],
    providers: [
        interceptorProviders, 
        [
            
            {provide : AuthRepository, useClass : AuthRepositoryImpl},
            {provide : ProveedorRepository, useClass : ProveedorRepositoryImpl},
            
           
        ]
    ]
})

export class ProvidersModule {}