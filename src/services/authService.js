import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiConfig } from '../config/apiConfig'

const formatCPF = cpf => {
  if (!cpf) throw new Error('CPF não pode ser vazio.')
  return cpf.replace(/[^\d]/g, '')
}

const formatBirthDate = birthDate => {
  if (!birthDate) throw new Error('Data de nascimento é obrigatória.')

  const parts = birthDate.split('/')
  if (parts.length !== 3)
    throw new Error('Data de nascimento deve estar no formato DD/MM/AAAA.')

  const [day, month, year] = parts
  if (
    !day ||
    !month ||
    !year ||
    day.length !== 2 ||
    month.length !== 2 ||
    year.length !== 4
  ) {
    throw new Error('Data de nascimento inválida.')
  }

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

const validateInputs = (cpf, birthDate) => {
  const formattedCpf = formatCPF(cpf)
  if (formattedCpf.length !== 11)
    throw new Error('CPF inválido. Certifique-se de que possui 11 dígitos.')

  const formattedBirthDate = formatBirthDate(birthDate)

  return { formattedCpf, formattedBirthDate }
}

const parseErrorResponse = async response => {
  let errorText
  try {
    const data = await response.json()
    errorText = data.message || JSON.stringify(data)
  } catch (e) {
    try {
      errorText = await response.text()
    } catch (e) {
      errorText = 'Não foi possível ler a mensagem de erro.'
    }
  }

  switch (response.status) {
    case 400:
      throw new Error(`Erro 400 (Bad Request): ${errorText}`)
    case 401:
      throw new Error(`Erro 401 (Não autorizado): ${errorText}`)
    case 403:
      throw new Error(`Erro 403 (Proibido): ${errorText}`)
    case 404:
      throw new Error(`Erro 404 (Não encontrado): ${errorText}`)
    case 500:
      throw new Error(`Erro 500 (Erro interno do servidor): ${errorText}`)
    default:
      throw new Error(`Erro ${response.status}: ${errorText}`)
  }
}

const loginCRM = async (cpf, birthDate) => {
  const crmData = {
    first_document: cpf,
    birth_date: birthDate
  }

  try {
    const response = await fetch(apiConfig.crm.loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(crmData)
    })

    if (!response.ok) await parseErrorResponse(response)

    return response.json()
  } catch (error) {
    throw new Error(`Erro de rede no login CRM: ${error.message}`)
  }
}

const loginClientAPI = async (cpf, birthDate) => {
  try {
    const response = await fetch(
      apiConfig.client.customerLogin(cpf, birthDate),
      {
        method: 'GET',
        headers: {
          Authorization: 'PAYSANDU2024',
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) await parseErrorResponse(response)

    return response.json()
  } catch (error) {
    throw new Error(
      `Erro de rede ao buscar informações do cliente: ${error.message}`
    )
  }
}

const login = async (cpf, birthDate, setUserInfo) => {
  try {
    const { formattedCpf, formattedBirthDate } = validateInputs(cpf, birthDate)

    let crmLoginSuccess = false
    let clientLoginSuccess = false
    let user = null
    let customerData = null
    const errors = []

    try {
      user = await loginCRM(formattedCpf, formattedBirthDate)
      if (user && user.access && user.refresh && user.id) {
        crmLoginSuccess = true

        await AsyncStorage.multiSet([
          ['accessToken', user.access],
          ['refreshToken', user.refresh],
          ['userId', user.id.toString()]
        ])

        setUserInfo(user)
      } else {
        errors.push('Login CRM: Resposta inválida do servidor.')
      }
    } catch (error) {
      console.log('Erro no login CRM:', error.message)
      errors.push(`CRM: ${error.message}`)
    }

    try {
      console.log(
        'Iniciando login na API Client...',
        formattedCpf,
        formattedBirthDate
      )
      customerData = await loginClientAPI(formattedCpf, formattedBirthDate)
      clientLoginSuccess = true

      if (customerData.access && customerData.refresh && customerData.id) {
        await AsyncStorage.multiSet([
          ['accessTokenClient', customerData.access],
          ['refreshTokenClient', customerData.refresh],
          ['userIdClient', customerData.id.toString()]
        ])
      } else {
        errors.push('Login API Client: Resposta inválida do servidor.')
      }
    } catch (error) {
      console.log('Erro no login na API Client:', error.message)
      errors.push(`API Client: ${error.message}`)
    }

    if (crmLoginSuccess || clientLoginSuccess) {
      return {
        success: true,
        user: { ...user, customerDetails: customerData }
      }
    }

    return {
      success: false,
      errors:
        errors.length > 0
          ? errors
          : ['Não foi possível realizar o login em nenhum dos serviços.']
    }
  } catch (error) {
    return { success: false, errors: [error.message] }
  }
}

const logout = async setUserInfo => {
  try {
    await AsyncStorage.multiRemove([
      'accessTokenClient',
      'refreshTokenClient',
      'userIdClient',
      'userId',
      'accessToken',
      'refreshToken'
    ])

    await AsyncStorage.setItem('hasVisitedTrack', JSON.stringify(false))

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
