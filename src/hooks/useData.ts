import { useEffect, useState } from "react"
import { supabase } from "../utils/superbase"

export type Medicamentos = {
    id: number,
    nombre: string,
    descripcion?: string,
    precio: number,
    stock: number,
    tipo: string
}

function useData() {
    const [datos, setDatos] = useState<Medicamentos[]>([])

    const traer = async () => {
        const { data } = await supabase.from("medicamentos").select("*")
        if (data) {
            setDatos(data)
        }
    }

    const insertar = async (nombre: string, precio: number, stock: number, tipo: string, descripcion?: string) => {
        try {
            const { error } = await supabase.from("medicamentos").insert([{ nombre, descripcion, precio, stock, tipo }])

            if (error) {
                console.log(error)
            }
            await traer()

        }
        catch (error) {
            console.log(error)
        }
    }

    const actualizar = async (id: number, nombre: string, precio: number, stock: number, tipo: string, descripcion?: string) => {
        try {
           const { error } = await supabase.from("medicamentos").update({ nombre, descripcion, precio, stock, tipo }).eq("id", id)
            if (error) {
                console.log(error)
            }
            await traer()
        }
        catch (error) {
            console.log(error)
        }
    }
    
    const eliminar = async (id: number) => {
        try {
           const { error } = await supabase.from("medicamentos").delete().eq("id", id)
            if (error) {
                console.log(error)
            }
            await traer()
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        traer()
        const channel = supabase
            .channel("medicamentos-realtime")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "medicamentos" },
                () => {
                    traer()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return {
        datos,
        insertar,
        actualizar,
        eliminar
    }
}

export default useData