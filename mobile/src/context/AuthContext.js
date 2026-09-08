import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

const TOKEN_KEY = '@clyvo_vet_token';
const USER_KEY = '@clyvo_vet_user';

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const [loadingAuth, setLoadingAuth] =
        useState(true);

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
                setUser(
                    JSON.parse(usuarioSalvo)
                );
            }
        } catch (error) {
            console.log(
                'Erro ao carregar sessão:',
                error
            );
        } finally {
            setLoadingAuth(false);
        }
    }

    async function iniciarSessao(
        dados
    ) {
        try {
            await AsyncStorage.setItem(
                TOKEN_KEY,
                dados.token
            );

            await AsyncStorage.setItem(
                USER_KEY,
                JSON.stringify(dados.usuario)
            );

            setToken(dados.token);
            setUser(dados.usuario);
        } catch (error) {
            console.log(
                'Erro ao salvar sessão:',
                error
            );

            throw error;
        }
    }

    async function sair() {
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
                loadingAuth,
                iniciarSessao,
                sair,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth deve ser usado dentro de AuthProvider.'
        );
    }

    return context;
}