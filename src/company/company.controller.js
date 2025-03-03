import Empresa from "../company/company.model.js"
import ExcelJS from "exceljs"
import fs from "fs"
import path from "path"

export const createEmpresa = async (req, res) => {
    try {
        const nuevaEmpresa = new Empresa(req.body)
        await nuevaEmpresa.save()
        await generateExcelReport(req, res)
        return res.status(201).json({ message: " La empresa se registro exitosamente", empresa: nuevaEmpresa })
    } catch (error) {
        return res.status(500).json({ message: "Error al registrar la empresa", error })
    }
}

export const getEmpresasSortedAZ = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ nombre: 1 })
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener empresas ordenadas de A-Z", error })
    }
}

export const getEmpresasSortedZA = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ nombre: -1 })
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener empresas ordenadas de Z-A", error })
    }
}

export const getEmpresasByTrayectoria = async (req, res) => {
    try {
        const { trayectoria } = req.query;
        let filtro = {}

        if (trayectoria) filtro.trayectoria = { $gte: parseInt(trayectoria) }

        const empresas = await Empresa.find(filtro).sort({ trayectoria: -1 })
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ message: "Error al filtrar empresas por trayectoria", error })
    }
}

export const getEmpresasByCategoria = async (req, res) => {
    try {
        const { categoria } = req.query;
        let filtro = {}

        if (categoria) filtro.categoria = categoria;

        const empresas = await Empresa.find(filtro);
        res.json(empresas)
    } catch (error) {
        res.status(500).json({ message: "Error al filtrar empresas por categoría", error })
    }
}

export const getEmpresaById = async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id)
        if (!empresa) return res.status(404).json({ message: "Empresa no encontrada" })
        res.status(200).json(empresa)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener empresa", error })
    }
}

export const updateEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!empresa) return res.status(404).json({ message: "Empresa no encontrada" })
        res.json({ message: "Empresa actualizada", empresa })
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar empresa", error })
    }
}

export const generateExcelReport = async (req, res) => {
    try {
        const empresas = await Empresa.find()

        if (!empresas.length) {
            return res.status(404).json({ message: "No hay empresas registradas" })
        }

        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet("Empresas")

        worksheet.columns = [
            { header: "Nombre", key: "nombre", width: 25 },
            { header: "Descripción", key: "descripcion", width: 30 },
            { header: "Impacto", key: "impacto", width: 15 },
            { header: "Trayectoria", key: "trayectoria", width: 15 },
            { header: "Categoría", key: "categoria", width: 20 },
        ]

        empresas.forEach((empresa) => {
            worksheet.addRow({
                nombre: empresa.nombre,
                descripcion: empresa.descripcion,
                impacto: empresa.impacto,
                trayectoria: empresa.trayectoria,
                categoria: empresa.categoria,
            })
        })

        const filePath = path.join(process.cwd(), "Empresas.xlsx");

        await workbook.xlsx.writeFile(filePath);

        res.setHeader("Content-Disposition", "attachment; filename=Empresas.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        fileStream.on("end", () => {
            fs.unlink(filePath, (err) => {
                if (err) console.error("❌ Error al eliminar el archivo:", err);
                else console.log("📂 Archivo eliminado después de la descarga.");
            })
        })

    } catch (error) {
        console.error("❌ Error al generar reporte:", error);
        res.status(500).json({ message: "Error al generar reporte", error });
    }
}
