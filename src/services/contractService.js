import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiConfig } from '../config/apiConfig'

const getContractData = async (userId = null, userIdClient = null) => {
  console.log('Iniciando a busca dos dados do contrato...')

  try {
    if (!userId) {
      userId = await AsyncStorage.getItem('userId')
      console.log('userId recuperado do AsyncStorage:', userId)
    }

    if (!userId) {
      console.log(
        'ID do usuário não fornecido, a busca de contrato continuará sem o userId.'
      )
    }

    const accessTokenCRM = await AsyncStorage.getItem('accessToken')
    if (!accessTokenCRM) {
      throw new Error(
        'Token de acesso CRM não encontrado. Por favor, faça login.'
      )
    }

    let results = null
    let customerDetails = null

    try {
      if (userId) {
        const salesResponse = await fetch(
          `${apiConfig.crm.mobileSalesUrl}?customer=${userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessTokenCRM}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (salesResponse.ok) {
          results = await salesResponse.json()
          console.log('Dados da requisição de vendas:', results)
        } else {
          console.warn(
            'Erro na requisição de vendas:',
            salesResponse.statusText
          )
        }
      } else {
        console.warn('Sem userId, a requisição de vendas não será feita.')
      }
    } catch (error) {
      console.warn('Erro na requisição de vendas:', error.message)
    }

    if (!userIdClient) {
      userIdClient = await AsyncStorage.getItem('userIdClient')
      console.log('userIdClient recuperado do AsyncStorage:', userIdClient)
    }

    try {
      const customerResponse = await fetch(
        `${apiConfig.client.customerDetails(userIdClient)}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'PAYSANDU2024',
            'Content-Type': 'application/json'
          }
        }
      )

      if (customerResponse.ok) {
        customerDetails = await customerResponse.json()
        console.log(
          'Dados da requisição de detalhes do cliente:',
          customerDetails
        )
      } else {
        console.warn(
          'Erro na requisição de detalhes do cliente:',
          customerResponse.statusText
        )
      }
    } catch (error) {
      console.warn('Erro na requisição de detalhes do cliente:', error.message)
    }

    if (results && Array.isArray(results.results)) {
      console.log('SalesData:', JSON.stringify(results.results, null, 2))
      return { results: results.results, customerDetails }
    } else {
      console.log('Nenhum dado de vendas encontrado.')
    }

    console.log('results: ', results)

    return { results: [], customerDetails }
  } catch (error) {
    console.error('Erro ao obter dados:', error.message)
    throw error
  }
}


const previewContract = async (saleId) => {
  console.log('Iniciando a busca de dados do contrato...');

  try {
    const accessTokenCRM = await AsyncStorage.getItem('accessToken');
    if (!accessTokenCRM) {
      throw new Error('Token de acesso CRM não encontrado. Por favor, faça login.');
    }

    const response = await fetch(
      `https://api.resolvenergiasolar.com/api/generate-contract/?preview=true`,
      {
        method: 'POST', // Método POST para enviar o sale_id no body
        headers: {
          Authorization: `Bearer ${accessTokenCRM}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sale_id: saleId }), // Envia o sale_id no body
      }
    );

    console.log('Resposta da requisição de contrato: ', response);

    if (response.ok) {
      // Converte a resposta para um Blob (arquivo binário)
      const blob = await response.blob();

      // Converte o Blob para Base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Remove o prefixo "data:application/pdf;base64," da string Base64
          const base64Data = reader.result.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob); // Converte o Blob para Base64
      });

      return base64; // Retorna o PDF em Base64
    } 
    return null;
  } catch (error) {
    console.error('Erro ao buscar dados do contrato:', error.message);
    throw error;
  }
};



export default {
  getContractData,
  previewContract
}
