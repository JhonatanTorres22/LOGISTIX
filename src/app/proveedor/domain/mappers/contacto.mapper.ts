import { ContactoDTO, CrearContactoDTO, DataContactoDTO, EditarContactoDTO, EliminarContactoDTO } from "@/proveedor/infraestructure/dto/contacto.dto";
import { Contacto, CrearContacto, DataContacto, EditarContacto, EliminarContacto } from "../models/contacto.model";

export class ContactoMapper {
    static toDomain = (param: ContactoDTO) : Contacto =>  {
        return{
            idContacto : param.codigoContacto,
            idProveedor : param.codigoProveedor,
            apePaterno : param.apellidoPaterno,
            apeMaterno : param.apellidoMaterno,
            nombres : param.nombres,
            celular : param.celular,
            correo : param.correo,
            cargo : param.cargo,
            anotacion1 : param.anotacion1,
            anotacion2 : param.anotacion2
        }
    }

    static toDomainData = (param : DataContactoDTO) : DataContacto => {
        return{
            data : param.data.map(this.toDomain),
            isSuccess : param.isSuccess,
            message : param.message,
            errors : param.errors
        }
    }

    static toApiCrear = (param : CrearContacto) : CrearContactoDTO => {
        return {
            codigoProveedor : param.idProveedor,
            apellidoPaterno: param.apePaterno,
            apellidoMaterno : param.apeMaterno,
            nombres : param.nombres,
            celular : param.celular,
            cargo : param.cargo,
            correo : param.correo,
            anotacion1 : param.anotacion1,
            anotacion2 : param.anotacion2
        }
    }

    static toApiEditar = (param : EditarContacto) : EditarContactoDTO =>{
        return {
            codigoProveedor : param.idProveedor,
            codigoContacto : param.idContacto,
            apellidoPaterno : param.apePaterno,
            apellidoMaterno : param.apeMaterno,
            nombres : param.nombres,
            celular : param.celular,
            cargo : param.cargo,
            correo : param.correo,
            anotacion1: param.anotacion1,
            anotacion2: param.anotacion2
        }
    }

    static toApiEliminar = (param : EliminarContacto) : EliminarContactoDTO => {
        return {
            codigoContacto : param.idContacto
        }
    }
}