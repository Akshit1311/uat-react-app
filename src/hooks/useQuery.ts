import { useState } from "react"
import axios from "axios"

const ERROR_INITIAL_STATE = { error: false, errorMessage: "" }

export function useQuery(apiUrl: string) {
    const [state, setState] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(ERROR_INITIAL_STATE)

    const fetch = async () => {
        setLoading(true)
        try {
            const response = await axios.get(apiUrl)
            setState(response.data)
            console.log(response.data)
        } catch (error) {
            setError({ error: true, errorMessage: error })
        } finally {
            setLoading(false)
            console.log(state)
        }
    }

    return [fetch, state, loading, error]
}