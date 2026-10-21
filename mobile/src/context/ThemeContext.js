import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = '@clyvo_vet_theme';

const themes = {
    light: {
        mode: 'light',
        isDark: false,
        colors: {
            background: '#F5F7F5',
            surface: '#FFFFFF',
            surfaceSecondary: '#EAF2EA',
            text: '#202720',
            textSecondary: '#657065',
            border: '#D7DED7',
            primary: '#2E7D32',
            primaryText: '#FFFFFF',
            secondary: '#1565C0',
            danger: '#C62828',
            inputBackground: '#FFFFFF',
            placeholder: '#777777',
            disabled: '#A5B5A5',
            statusBar: 'dark',
        },
    },

    dark: {
        mode: 'dark',
        isDark: true,
        colors: {
            background: '#121712',
            surface: '#1E261F',
            surfaceSecondary: '#29362B',
            text: '#F1F5F1',
            textSecondary: '#B2BDB2',
            border: '#465347',
            primary: '#81C784',
            primaryText: '#102010',
            secondary: '#90CAF9',
            danger: '#FF8A80',
            inputBackground: '#202A21',
            placeholder: '#A7B0A7',
            disabled: '#596659',
            statusBar: 'light',
        },
    },
};

export function ThemeProvider({ children }) {
    const [mode, setMode] = useState('light');
    const [loadingTheme, setLoadingTheme] = useState(true);

    useEffect(() => {
        async function loadTheme() {
            try {
                const savedTheme = await AsyncStorage.getItem(
                    THEME_STORAGE_KEY
                );

                if (savedTheme === 'light' || savedTheme === 'dark') {
                    setMode(savedTheme);
                }
            } catch (error) {
                console.warn('Não foi possível carregar o tema salvo.');
            } finally {
                setLoadingTheme(false);
            }
        }

        loadTheme();
    }, []);

    async function changeTheme(nextMode) {
        if (nextMode !== 'light' && nextMode !== 'dark') {
            return;
        }

        try {
            await AsyncStorage.setItem(
                THEME_STORAGE_KEY,
                nextMode
            );

            setMode(nextMode);
        } catch (error) {
            console.warn('Não foi possível salvar o tema.');
        }
    }

    async function toggleTheme() {
        await changeTheme(mode === 'light' ? 'dark' : 'light');
    }

    const theme = themes[mode];

    return (
        <ThemeContext.Provider
            value={{
                mode,
                theme,
                colors: theme.colors,
                isDark: theme.isDark,
                loadingTheme,
                changeTheme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'useTheme deve ser usado dentro de ThemeProvider.'
        );
    }

    return context;
}
