import { useState, useEffect } from "react";
import { Entity } from "@/utils/interfaces";

export default function useGenres(url: string) {
  const [genres, setGenres] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGenres() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener los generos");
        const data = await response.json();
        setGenres(data.data || []);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  return { genres, loading, error };
}