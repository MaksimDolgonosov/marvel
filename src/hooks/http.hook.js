import { useCallback, useState } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, SetProcess] = useState("waiting");

    const request = useCallback(async (url, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {

        try {
            setLoading(true);
            SetProcess("loading");
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) { throw new Error(`Can't get ${url}, status: ${response.status}`) };
            const data = await response.json();
            setLoading(false);
            //SetProcess("confirmed");
            return data;
        } catch (e) {
            setLoading(false);
            setError(true);
            SetProcess("error");
            throw e;
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null);
        SetProcess("loading");
    }, []);
    return { loading, error, request, clearError, process, SetProcess };
}
