import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const TOKEN_KEY = '@clyvo_vet_token';
const USER_KEY = '@clyvo_vet_user';

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        carregarSessao();
    }, []);

    async function carregarSessao() {
        try {
            const savedToken = await AsyncStorage.getItem(TOKEN_KEY);
            const savedUser = await AsyncStorage.getItem(USER_KEY);

            if (savedToken && savedUser) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.log('Erro ao carregar sessão:', error);
        } finally {
            setLoadingAuth(false);
        }
    }

    async function iniciarSessao(newToken, newUser) {
        await AsyncStorage.setItem(TOKEN_KEY, newToken);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));

        setToken(newToken);
        setUser(newUser);
    }

    async function sair() {
        await AsyncStorage.removeItem(TOKEN_KEY);
        await AsyncStorage.removeItem(USER_KEY);

        setToken(null);
        setUser(null);
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
    return useContext(AuthContext);
}