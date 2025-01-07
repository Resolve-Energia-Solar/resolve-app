import { apiConfig } from '../config/apiConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

const formatCPF = cpf => cpf.replace(/[^\d]/g, '')

const formatBirthDate = birthDate => {
  if (!birthDate || birthDate.split('/').length !== 3) {
    throw new Error('Data de nascimento inválida')
  }
  const [day, month, year] = birthDate.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

const validateInputs = (cpf, birthDate) => {
  const formattedCpf = formatCPF(cpf)
  if (formattedCpf.length !== 11) {
    throw new Error('CPF inválido')
  }
  return {
    formattedCpf,
    formattedBirthDate: formatBirthDate(birthDate)
  }
}

const loginCRM = async (cpf, birthDate) => {
  const crmData = {
    first_document: cpf,
    birth_date: birthDate
  }
  const response = await fetch(apiConfig.crm.loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(crmData)
  })

  if (!response.ok) {
    throw new Error('Erro no login CRM: ' + response.statusText)
  }

  return await response.json()
}

const loginClientAPI = async (cpf, birthDate) => {
  const response = await fetch(apiConfig.client.customerLogin(cpf, birthDate), {
    method: 'GET',
    headers: {
      Authorization: 'PAYSANDU2024',
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar informações do cliente na API Client.')
  }

  return await response.json()
}

const login = async (cpf, birthDate, setUserInfo) => {
  const { formattedCpf, formattedBirthDate } = validateInputs(cpf, birthDate)

  let crmLoginSuccess = false
  let clientLoginSuccess = false
  let user = null
  let customerData = null

  try {
    user = await loginCRM(formattedCpf, formattedBirthDate)
    if (user && user.access && user.refresh && user.id) {
      crmLoginSuccess = true
      setUserInfo(user)
    }
  } catch (error) {
    console.log('Erro no login CRM:', error.message)
  }

  try {
    customerData = await loginClientAPI(formattedCpf, formattedBirthDate)
    console.log('Dados do cliente:', customerData)
    clientLoginSuccess = true

    if (customerData.access && customerData.refresh && customerData.id) {
      await AsyncStorage.setItem('accessTokenClient', customerData.access)
      await AsyncStorage.setItem('refreshTokenClient', customerData.refresh)
      await AsyncStorage.setItem('userIdClient', customerData.id)
    }
  } catch (error) {
    console.log('Erro no login na API Client:', error.message)
  }

  if (crmLoginSuccess || clientLoginSuccess) {
    return {
      success: true,
      user: {
        ...user,
        customerDetails: customerData
      }
    }
  }

  return { success: false, error: 'Falha no login' }
}

const logout = async setUserInfo => {
  try {
    await AsyncStorage.removeItem('accessTokenClient')
    await AsyncStorage.removeItem('refreshTokenClient')
    await AsyncStorage.removeItem('userIdClient')
    await AsyncStorage.removeItem('userId')
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')
    setUserInfo(null)

    console.log('Logout realizado com sucesso')
  } catch (error) {
    console.log('Erro ao realizar logout:', error.message)
  }
}

export default {
  logout,
  login
}
