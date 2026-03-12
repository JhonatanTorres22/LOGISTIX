import { inject, Injectable } from "@angular/core";
import { GipeoRepository } from "../../domain/repository/gipeo.repository";
import { GipeoService } from "../services/gipeo.service";
import { Observable } from "rxjs";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";
import { AuthResponse, IniciaSesionGipeo } from "../../domain/models/gipeo.model";

@Injectable({
    providedIn : 'root'
})

export class GipeoRepositoryImpl implements GipeoRepository {
    gipeoService = inject(GipeoService)

    obtenerRol(): Observable<UiSelect[]> {
        return this.gipeoService.obtenerRol()
    }

    authGipeo(auth: IniciaSesionGipeo): Observable<AuthResponse> {
        return this.gipeoService.authGipeo(auth)
    }
}