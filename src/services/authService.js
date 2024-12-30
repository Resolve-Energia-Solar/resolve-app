import { apiConfig } from '../config/apiConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

const formatCPF = cpf => {
  return cpf.replace(/[^\d]/g, '') 
}

const formatBirthDate = birthDate => {
  if (!birthDate || birthDate.split('/').length !== 3) {
    throw new Error('Data de nascimento inválida');
  }
  
  const [day, month, year] = birthDate.split('/');
  
  const formattedDay = day.padStart(2, '0');
  const formattedMonth = month.padStart(2, '0');

  return `${year}-${formattedMonth}-${formattedDay}`;
}

const validateInputs = (cpf, birthDate) => {
  const formattedCpf = formatCPF(cpf);
  if (formattedCpf.length !== 11) {
    throw new Error('CPF inválido');
  }

  const formattedBirthDate = formatBirthDate(birthDate);
  return { formattedCpf, formattedBirthDate };
}

const login = async (cpf, birthDate, setUserInfo) => {
  try {
    const { formattedCpf, formattedBirthDate } = validateInputs(cpf, birthDate);

    const formattedData = {
      first_document: formattedCpf,
      birth_date: formattedBirthDate 
    }

    const response = await fetch(apiConfig.loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData)
    });

    if (!response.ok) {
      let errorMessage = 'Erro desconhecido. Tente novamente mais tarde.';
      switch (response.status) {
        case 401:
          errorMessage = 'Credenciais inválidas. Verifique e tente novamente.';
          break;
        case 403:
          errorMessage = 'Acesso negado. Você não tem permissão para acessar este recurso.';
          break;
        case 404:
          errorMessage = 'Usuário não encontrado. Verifique o CPF ou a data de nascimento.';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          break;
      }
      throw new Error(errorMessage);
    }

    const user = await response.json();

    if (user && user.access && user.refresh && user.id) {
      await AsyncStorage.setItem('accessToken', user.access);
      await AsyncStorage.setItem('refreshToken', user.refresh);
      await AsyncStorage.setItem('userId', user.id.toString());

      setUserInfo(user);

      return { success: true, user };
    }

    throw new Error('Dados do usuário incompletos ou inválidos.');
  } catch (error) {
    console.log('Erro no login:', error.message);
    return { success: false, error: error.message };
  }
}

export default {
  login
}
