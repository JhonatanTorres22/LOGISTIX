import { Observable } from "rxjs";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";
import { AuthResponse, IniciaSesionGipeo } from "../models/gipeo.model";

export abstract class GipeoRepository {
    abstract obtenerRol() : Observable<UiSelect[]>
    abstract authGipeo (auth : IniciaSesionGipeo) : Observable<AuthResponse>
} 