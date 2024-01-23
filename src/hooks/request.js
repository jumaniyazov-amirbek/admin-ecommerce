import { useEffect, useState } from 'react'
import { message } from 'antd'
import Axios from '../api'

export const usePostRequest = (options = {}) =>
    useRequest({ method: 'POST', ...options })

export const usePutRequest = (options = {}) =>
    useRequest({ method: 'PUT', ...options })

export const usePatchRequest = (options = {}) =>
    useRequest({ method: 'PATCH', ...options })

export const useGetRequest = (options = {}) =>
    useRequest({ method: 'GET', ...options })

export const useDeleteRequest = (options = {}) =>
    useRequest({ method: 'DELETE', ...options })

export const useRequest = (options = {}) => {
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})

    const request = async (
        overrideOptions = {},
        sync = false
    ) => {
        setLoading(true)


        try {
            const { data } = await Axios({
                ...options,
                ...overrideOptions,
            })
            if (!sync) setResponse(data.data)
            if (data !== null) {
                setResponse(data)
                console.log(data)
                return { response: data, success: true }
            } else {
                return { success: false, error: data.error.message }
            }
        } catch (e) {
            setError(e.response || {})
            if (e.response === undefined) {
                message.warning('Проверьте интернет соединение')
            } else if (e.response.status > 500) {
                message.warning('Ошибка сервера.')
            }
            return { error: e.response.data.message, success: false }
        } finally {
            if (!sync) setLoading(false)
        }
    }

    return {
        loading,
        request,
        error,
        response,
    }
}

export const useLoad = (options = {}, dependencies = []) => {
    const request = useGetRequest({ ...options })
    useEffect(() => {
        request.request()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)

    return request
}