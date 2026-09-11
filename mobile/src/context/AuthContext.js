import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext =
  createContext(null);

const TOKEN_KEY =
  '@clyvo_vet_token';

const USER_KEY =
  '@clyvo_vet_user';

export function AuthProvider({
  children,
}) {
  const [token, setToken] =
    useState(null);

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================================================
  // CARREGAR SESSÃO SALVA
  // =========================================================

  useEffect(() => {
    carregarSessao();
  }, []);

  async function carregarSessao() {
    try {
      const tokenSalvo =
        await AsyncStorage.getItem(
          TOKEN_KEY
        );

      const usuarioSalvo =
        await AsyncStorage.getItem(
          USER_KEY
        );

      if (tokenSalvo) {
        setToken(tokenSalvo);
      }

      if (usuarioSalvo) {
        try {
          setUser(
            JSON.parse(usuarioSalvo)
          );
        } catch {
          await AsyncStorage.removeItem(
            USER_KEY
          );
        }
      }
    } catch (error) {
      console.log(
        'Erro ao carregar sessão:',
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // INICIAR SESSÃO
  // =========================================================

  async function iniciarSessao(
    resposta
  ) {
    try {
      console.log(
        'Resposta da autenticação:',
        resposta
      );

      if (
        !resposta ||
        !resposta.token
      ) {
        throw new Error(
          'A API não retornou um token.'
        );
      }

      const novoToken =
        resposta.token;

      const novoUsuario =
        resposta.usuario || null;

      // IMPORTANTE:
      // AsyncStorage só recebe strings.
      await AsyncStorage.setItem(
        TOKEN_KEY,
        String(novoToken)
      );

      if (novoUsuario) {
        await AsyncStorage.setItem(
          USER_KEY,
          JSON.stringify(novoUsuario)
        );
      } else {
        await AsyncStorage.removeItem(
          USER_KEY
        );
      }

      setToken(
        String(novoToken)
      );

      setUser(
        novoUsuario
      );

      console.log(
        'Sessão iniciada com sucesso.'
      );
    } catch (error) {
      console.log(
        'Erro ao iniciar sessão:',
        error
      );

      throw error;
    }
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  async function logout() {
    try {
      await AsyncStorage.removeItem(
        TOKEN_KEY
      );

      await AsyncStorage.removeItem(
        USER_KEY
      );

      setToken(null);
      setUser(null);
    } catch (error) {
      console.log(
        'Erro ao sair:',
        error
      );
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        iniciarSessao,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}