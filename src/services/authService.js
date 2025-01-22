import { apiConfig } from '../config/apiConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Remove todos os caracteres não numéricos do CPF.
 *
 * @param {string} cpf - O CPF a ser formatado.
 * @returns {string} - O CPF formatado com apenas dígitos.
 * @throws {Error} - Se o CPF estiver vazio.
 */
const formatCPF = (cpf) => {
  if (!cpf) throw new Error('CPF não pode ser vazio.')
  return cpf.replace(/[^\d]/g, '')
}

/**
 * Formata a data de nascimento de DD/MM/AAAA para AAAA-MM-DD.
 *
 * @param {string} birthDate - A data de nascimento no formato DD/MM/AAAA.
 * @returns {string} - A data formatada no formato AAAA-MM-DD.
 * @throws {Error} - Se a data de nascimento estiver vazia ou em formato inválido.
 */
const formatBirthDate = (birthDate) => {
  if (!birthDate) {
    throw new Error('Data de nascimento é obrigatória.')
  }

  const parts = birthDate.split('/')
  if (parts.length !== 3) {
    throw new Error('Data de nascimento deve estar no formato DD/MM/AAAA.')
  }

  const [day, month, year] = parts
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day.length !== 2 ||
    month.length !== 2 ||
    year.length !== 4
  ) {
    throw new Error('Data de nascimento inválida.')
  }

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

/**
 * Valida e formata os inputs de CPF e data de nascimento.
 *
 * @param {string} cpf - O CPF a ser validado e formatado.
 * @param {string} birthDate - A data de nascimento a ser validada e formatada.
 * @returns {{ formattedCpf: string, formattedBirthDate: string }}
 * @throws {Error} - Se os inputs forem inválidos.
 */
const validateInputs = (cpf, birthDate) => {
  const formattedCpf = formatCPF(cpf)
  if (formattedCpf.length !== 11) {
    throw new Error('CPF inválido. Certifique-se de que possui 11 dígitos.')
  }
  const formattedBirthDate = formatBirthDate(birthDate)

  return { formattedCpf, formattedBirthDate }
}

/**
 * Analisa a resposta de erro da API e lança um erro apropriado.
 *
 * @param {Response} response - A resposta da API.
 * @throws {Error} - Com uma mensagem de erro baseada no status da resposta.
 */
const parseErrorResponse = async (response) => {
  let errorText
  try {
    // Tenta extrair o JSON da resposta
    const data = await response.json()
    errorText = data.message || JSON.stringify(data)
  } catch (e) {
    // Se não for JSON, extrai o texto
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

/**
 * Realiza o login no CRM.
 *
 * @param {string} cpf - O CPF formatado.
 * @param {string} birthDate - A data de nascimento formatada.
 * @returns {Promise<Object>} - Os dados do usuário retornados pelo CRM.
 * @throws {Error} - Se ocorrer um erro durante a solicitação.
 */
const loginCRM = async (cpf, birthDate) => {
  const crmData = {
    first_document: cpf,
    birth_date: birthDate
  }

  let response
  try {
    response = await fetch(apiConfig.crm.loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(crmData)
    })
  } catch (error) {
    throw new Error(`Erro de rede no login CRM: ${error.message}`)
  }

  if (!response.ok) {
    await parseErrorResponse(response)
  }

  return response.json()
}

/**
 * Realiza o login na API Client.
 *
 * @param {string} cpf - O CPF formatado.
 * @param {string} birthDate - A data de nascimento formatada.
 * @returns {Promise<Object>} - Os dados do cliente retornados pela API Client.
 * @throws {Error} - Se ocorrer um erro durante a solicitação.
 */
const loginClientAPI = async (cpf, birthDate) => {
  const clientLoginUrl = apiConfig.client.customerLogin(cpf, birthDate)
  let response
  try {
    response = await fetch(clientLoginUrl, {
      method: 'GET',
      headers: {
        Authorization: 'PAYSANDU2024',
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    throw new Error(`Erro de rede ao buscar informações do cliente: ${error.message}`)
  }

  if (!response.ok) {
    await parseErrorResponse(response)
  }

  return response.json()
}

/**
 * Realiza o login combinando os logins no CRM e na API Client.
 *
 * @param {string} cpf - O CPF fornecido pelo usuário.
 * @param {string} birthDate - A data de nascimento fornecida pelo usuário.
 * @param {Function} setUserInfo - Função para atualizar o estado do usuário no contexto global.
 * @returns {Promise<{ success: boolean, user?: object, errors?: string[] }>} - Resultado do login.
 */
const login = async (cpf, birthDate, setUserInfo) => {
  let formattedCpf
  let formattedBirthDate

  // Validação e formatação dos inputs
  try {
    ;({ formattedCpf, formattedBirthDate } = validateInputs(cpf, birthDate))
  } catch (error) {
    return { success: false, errors: [error.message] }
  }

  let crmLoginSuccess = false
  let clientLoginSuccess = false

  let user = null
  let customerData = null

  const errors = []

  // Tentativa de login no CRM
  try {
    user = await loginCRM(formattedCpf, formattedBirthDate)

    if (user && user.access && user.refresh && user.id) {
      crmLoginSuccess = true

      await AsyncStorage.setItem('accessToken', user.access)
      await AsyncStorage.setItem('refreshToken', user.refresh)
      await AsyncStorage.setItem('userId', user.id.toString())

      setUserInfo(user)
    } else {
      errors.push('Login CRM: Resposta inválida do servidor.')
    }
  } catch (error) {
    console.log('Erro no login CRM:', error.message)
    errors.push(`CRM: ${error.message}`)
  }

  // Tentativa de login na API Client
  try {
    customerData = await loginClientAPI(formattedCpf, formattedBirthDate)
    console.log('Dados do cliente:', customerData)
    clientLoginSuccess = true

    if (customerData.access && customerData.refresh && customerData.id) {
      await AsyncStorage.setItem('accessTokenClient', customerData.access)
      await AsyncStorage.setItem('refreshTokenClient', customerData.refresh)
      await AsyncStorage.setItem('userIdClient', customerData.id.toString())
    } else {
      errors.push('Login API Client: Resposta inválida do servidor.')
    }
  } catch (error) {
    console.log('Erro no login na API Client:', error.message)
    errors.push(`API Client: ${error.message}`)
  }

  // Determina o resultado do login baseado nos sucessos
  if (crmLoginSuccess || clientLoginSuccess) {
    return {
      success: true,
      user: {
        ...user,
        customerDetails: customerData
      }
    }
  }

  return {
    success: false,
    errors: errors.length > 0 ? errors : ['Não foi possível realizar o login em nenhum dos serviços.']
  }
}

/**
 * Realiza o logout removendo os tokens armazenados.
 *
 * @param {Function} setUserInfo - Função para atualizar o estado do usuário no contexto global.
 */
const logout = async (setUserInfo) => {
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
