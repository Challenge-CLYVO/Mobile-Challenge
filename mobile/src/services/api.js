import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../config/env';

const TOKEN_KEY =
  '@clyvo_vet_token';

const api =
  axios.create({
    baseURL: API_URL,

    timeout: 10000,

    headers: {
      'Content-Type':
        'application/json',

      Accept:
        'application/json',
    },
  });

// =========================================================
// TOKEN NAS REQUISIÇÕES
// =========================================================

api.interceptors.request.use(
  async (config) => {
    try {
      const token =
        await AsyncStorage.getItem(
          TOKEN_KEY
        );

      if (token) {
        config.headers =
          config.headers || {};

        config.headers.Authorization =
          `Bearer ${token}`;
      }
    } catch (error) {
      console.log(
        'Erro ao recuperar token:',
        error
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(
      error
    );
  }
);

// =========================================================
// TRATAMENTO DE ERROS
// =========================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response) {
      console.log(
        'API ERROR:',
        error.response.status,
        error.response.data
      );
    } else if (
      error.request
    ) {
      console.log(
        'API ERROR: servidor não respondeu'
      );
    } else {
      console.log(
        'API ERROR:',
        error.message
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default api;