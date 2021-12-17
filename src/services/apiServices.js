import Axios from 'axios'

export const getAuthorization = async (url, defaultConfig = null) => {
  let config = {
    ...defaultConfig,
    headers: {
      ...defaultConfig?.headers,
    },
  }
  return Axios.get(url, config)
}

export const postAuthorization = async (
  url,
  data = {},
  defaultConfig = null,
) => {
  let config = {
    ...defaultConfig,
    headers: {
      ...defaultConfig?.headers,
    },
  }
  return Axios.post(url, data, config)
}

export const putAuthorization = async (
  url,
  data = {},
  defaultConfig = null,
) => {
  let config = {
    ...defaultConfig,
    headers: {
      ...defaultConfig?.headers,
    },
  }
  return Axios.put(url, data, config)
}

export const deleteAuthorization = async (url, defaultConfig = null) => {
  let config = {
    ...defaultConfig,
    headers: {
      ...defaultConfig?.headers,
    },
  }
  return Axios.delete(url, config)
}
