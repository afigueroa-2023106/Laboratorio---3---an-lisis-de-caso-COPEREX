import {Router} from "express"
import { 
    createEmpresa, 
    updateEmpresa,
    getEmpresasSortedAZ,
    getEmpresasSortedZA, 
    getEmpresasByTrayectoria,
    getEmpresasByCategoria,
    getEmpresaById 
} from "../company/company.controller.js"
import { validateJwt } from "../../middleware/validate.jwt.js"

const api = Router()

api.post("/",  
    [
    ],createEmpresa
)

api.put("/:id",  
    [
        validateJwt

    ],updateEmpresa
)

 api.post("/:id",  
    [
         validateJwt

     ],getEmpresaById
 )

api.get("/ordenadas-az", 
    [
        validateJwt

    ],getEmpresasSortedAZ
)

api.get("/ordenadas-za", 
    [
        validateJwt

    ],getEmpresasSortedZA
)

api.get("/por-trayectoria", 
    [
        validateJwt

    ],getEmpresasByTrayectoria
)

api.get("/por-categoria", 
        [
            validateJwt
    
        ],getEmpresasByCategoria
    )

export default api
