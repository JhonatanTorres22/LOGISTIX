import { DataModuloDTO, DecodedTokenDTO, LoginRequestDTO, LoginResponseDTO } from "../../infraestructure/dto/auth.dto";
import { AuthData, DataModulo, DecodedToken, LoginModel } from "../models/auth.model";

export class AuthMapper {
    static toDomain(param: DataModuloDTO): DataModulo {
        return {
            modulo: (param?.modulos ?? []).map(m => ({
                nombre: m.nombreModulo,
                roles: (m.roles ?? []).map(r => ({
                    nombre: r.nombreRol
                }))
            }))
        };
    }

        static toDTO(model: LoginModel): LoginRequestDTO {
        return {
            nombreUsuario: model.username,
            contrasenia: model.password,
            rol: model.role
        };
    }

    // DTO → Model (lo que recibes del backend)
     static fromResponse(dto: LoginResponseDTO): AuthData {
        const token = dto.data.token;
        return {
            token,
            decoded: this.decodeToken(token)
        };
    }

    static decodeToken(token: string): DecodedToken {
        try {
            const payload = token.split('.')[1]; // JWT: header.payload.signature
            const decodedJson = atob(payload); // base64 decode
            const decoded: DecodedTokenDTO = JSON.parse(decodedJson);
            return { ...decoded }; // mapea campos directamente al model
        } catch (err) {
            console.error('Error decodificando token:', err);
            return null as any; // o un objeto vacío
        }
    }
}
