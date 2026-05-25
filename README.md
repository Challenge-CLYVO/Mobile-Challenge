# 🐾 Pet Care App

Aplicativo mobile desenvolvido em **Mobile Challenge com Expo**, com o objetivo de gerenciar pets e lembretes de cuidados, utilizando armazenamento local com AsyncStorage.

---

## 👥 Integrantes

* Lucas Rafael Solimene — RM: 565194
* Samyr Couto Oliveira — RM: 565562
* Henrique Teixeira Cesar — RM: 563088

---

## 🎯 Objetivo do Projeto

O aplicativo permite ao usuário:

* Cadastrar pets 🐶
* Visualizar lista de pets 📋
* Remover pets cadastrados ❌
* Criar lembretes de cuidados ⏰
* Excluir lembretes 🗑️

Todos os dados são armazenados localmente utilizando **AsyncStorage**, garantindo persistência mesmo após fechar o aplicativo.

---

## 📱 Funcionalidades

### 🐾 Pets

* Cadastro de pet (nome e idade)
* Listagem dinâmica
* Remoção de pet
* Persistência de dados

### ⏰ Lembretes

* Criação de lembretes (título e data)
* Listagem dinâmica
* Remoção de lembretes
* Persistência de dados

### 🔄 Navegação

* Navegação entre telas utilizando React Navigation

---

## 🛠️ Tecnologias Utilizadas

* React Native
* Expo
* AsyncStorage
* React Navigation

---

## 📂 Estrutura do Projeto

/src

  /screens

    Home.js

    CadastroPetScreen.js

    ListaPetsScreen.js

    LembretesScreen.js

    PerfilScreen.js

  /services

    petsStorage.js

    lembretesStorage.js

App.js

---

## ▶️ Como Executar o Projeto

1. Instale as dependências:

```
npm install
```

2. Inicie o projeto:

```
npx expo start
```

3. Abra no:

* Emulador Android/iOS
* Ou aplicativo Expo Go no celular

---

## 🎥 Vídeo de Demonstração

👉 Insira aqui o link do vídeo no YouTube:

https://www.youtube.com/watch?v=5wDSF58k9wo

---

## 📌 Status do Projeto

✅ Concluído e funcional
