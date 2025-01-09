import { useState, useEffect } from "react";
import { Entity } from "@/utils/interfaces";
import axios from "axios";

export default function useGenres() {
  const [genres, setGenres] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGenres() {
      try {
        setLoading(true);
        const response = await axios.get("https://api.jikan.moe/v4/genres/anime");
        if (!response.data.ok) throw new Error("Error al obtener los generos");
        setGenres(response.data.data || []);
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