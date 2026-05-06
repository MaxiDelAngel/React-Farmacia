import { useEffect, useState } from "react"
import { hasSupabaseConfig, supabase } from "../utils/superbase"

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
    const [error, setError] = useState<string | null>(null)

    const traer = async () => {
        if (!supabase) {
            setError("Falta configurar VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY.")
            return
        }

        setError(null)
        const { data } = await supabase.from("medicamentos").select("*")
        if (data) {
            setDatos(data)
        }
    }

    const insertar = async (nombre: string, precio: number, stock: number, tipo: string, descripcion?: string) => {
        if (!supabase) {
            setError("No se puede insertar porque Supabase no esta configurado.")
            return
        }

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
        if (!supabase) {
            setError("No se puede actualizar porque Supabase no esta configurado.")
            return
        }

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
        if (!supabase) {
            setError("No se puede eliminar porque Supabase no esta configurado.")
            return
        }

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
        if (!hasSupabaseConfig || !supabase) {
            setError("Configuracion de Supabase faltante en deploy/local.")
            return
        }

        const client = supabase

        traer()

        const channel = client
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
            client.removeChannel(channel)
        }
    }, [])

    return {
        datos,
        error,
        insertar,
        actualizar,
        eliminar
    }
}

export default useData