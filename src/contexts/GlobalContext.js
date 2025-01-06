import React, { createContext, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userIdClient, setUserIdClient] = useState(null)
  const [settings, setSettings] = useState(null)
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId')
        const userIdClient = await AsyncStorage.getItem('userIdClient')
        const userSettings = await AsyncStorage.getItem('settings')
        const userContract = await AsyncStorage.getItem('contract')

        if (userId) {
          setUser({ id: userId })
        }

        if (userIdClient) {
          setUserIdClient(userIdClient)
        }

        if (userSettings) {
          setSettings(JSON.parse(userSettings))
        }

        if (userContract) {
          setContract(JSON.parse(userContract))
        }
      } catch (error) {
        console.log('Erro ao carregar dados: ', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const setUserInfo = async userInfo => {
    setUser(userInfo)
    await AsyncStorage.setItem('userId', String(userInfo.id))
  }

  const setUserClientInfo = async userClientInfo => {
    setUserIdClient(userClientInfo)
    await AsyncStorage.setItem('userIdClient', String(userClientInfo))
  }

  const setAppSettings = async newSettings => {
    setSettings(newSettings)
    await AsyncStorage.setItem('settings', JSON.stringify(newSettings))
  }

  const setContractData = async contractData => {
    setContract(contractData)
    await AsyncStorage.setItem('contract', JSON.stringify(contractData))
  }

  const resetUser = async () => {
    setUser(null)
    setUserIdClient(null)
    await AsyncStorage.removeItem('userId')
    await AsyncStorage.removeItem('userIdClient')
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        userIdClient,
        settings,
        contract,
        loading,
        setUserInfo,
        setUserClientInfo,
        setAppSettings,
        setContractData,
        resetUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export { GlobalProvider, useGlobalContext }
