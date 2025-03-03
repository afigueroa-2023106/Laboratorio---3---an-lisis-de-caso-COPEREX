import { Schema, model } from "mongoose"

const EmpresaSchema = Schema(
    {
        nombre: { 
            type: String, 
            required: true, 
            unique: true 
        },
        descripcion: { 
            type: String, 
            required: true 
        },
        impacto: { 
            type: String, 
            enum: ["Alto", "Medio", "Bajo"], 
            required: true 
        },
        trayectoria: { 
            type: Number, 
            required: true 
        },
        categoria: { 
            type: String, 
            required: true 
        },
    },
    { timestamps: true }
);

export default model("Empresa", EmpresaSchema)
