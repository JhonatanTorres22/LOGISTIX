import { CambioContraseniaDTO, DataModuloDTO, DecodedTokenDTO, LoginRequestDTO, LoginResponseDTO } from "../../infraestructure/dto/auth.dto";
import { AuthData, CambioContrasenia, DataModulo, DecodedToken, LoginModel } from "../models/auth.model";

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
            const payload = token.split('.')[1];

            // 🔥 Decodificación correcta UTF-8
            const decodedJson = decodeURIComponent(
                atob(payload)
                    .split('')
                    .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
                    .join('')
            );

            const decoded: DecodedTokenDTO = JSON.parse(decodedJson);
            return { ...decoded };

        } catch (err) {
            console.error('Error decodificando token:', err);
            return null as any;
        }
    }

    static toApiCambioContrasenia(param: CambioContrasenia): CambioContraseniaDTO {
        return {
            contrasenia: param.password,
            nuevaContrasenia: param.newPassword,
            numeroDocumento: param.userName
        }
    }
}
