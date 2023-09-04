import { useCallback, useState } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {
        try {
            setLoading(true);
            const response = await fetch(url, { method, body, headers });
            if(!response.ok){throw new Error(`Can't get ${url}, status: ${response.status}`)};
            const data = await response.json();
            setLoading(false)
            return data;
        } catch(e) {
            setLoading(false);
            setError(true)
            throw e
        }
    }, [])

    const clearError = useCallback(()=>setError(null),[]);
    return {loading, error, request, clearError};
}
