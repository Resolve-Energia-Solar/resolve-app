import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiConfig } from '../config/apiConfig'

const getContractData = async userId => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    if (!accessToken) {
      throw new Error('Token de acesso não encontrado')
    }

    console.log('userId', userId)
    console.log('Token de acesso:', accessToken)

    const response = await fetch(
      `${apiConfig.baseUrl}/mobile_sales/?customer=${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    console.log('Status da resposta:', response.status)

    const responseText = await response.text()
    console.log('Conteúdo da resposta:', responseText)

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${responseText}`
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (err) {
      console.error('Erro ao fazer o parse do JSON:', err)
      throw new Error('Resposta não é JSON válida')
    }

    console.log('Resposta do contrato:', data)

    return data
  } catch (error) {
    console.error('Erro ao obter contrato:', error)
    throw error
  }
}

export default {
  getContractData
}
