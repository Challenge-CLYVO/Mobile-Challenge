# CLYVO VET — Aplicativo de Saúde e Cuidados para Pets

Aplicativo mobile desenvolvido como parte do Challenge acadêmico, com o objetivo de facilitar o gerenciamento de informações dos animais de estimação, o acompanhamento de vacinas e a organização dos cuidados veterinários.

---

# 👥 Integrantes

- Lucas Rafael Solimene / RM: 565194
- Samyr Couto Oliveira / RM: 565562
- Henrique Teixeira Cesar / RM: 563088

---

## Sobre o projeto

O CLYVO VET permite que tutores e veterinários utilizem funcionalidades voltadas ao acompanhamento dos pets, com foco na organização das informações e no acesso facilitado pelo celular.

Este projeto foi desenvolvido com React Native e Expo, utilizando uma API em .NET para integração com os dados da aplicação.

---

## Funcionalidades

- Autenticação e cadastro de usuários.
- Navegação conforme o perfil de acesso.
- Cadastro, consulta e edição de pets.
- Gerenciamento de aplicações de vacinas.
- Cadastro e consulta de veterinários.
- Visualização de pacientes.
- Lembretes relacionados às vacinas.
- Organização de informações de saúde e cuidados dos animais.
- Alternância entre tema claro e tema escuro.
- Persistência da preferência de tema no dispositivo.
- Distribuição do aplicativo Android para testes pelo Firebase App Distribution.

---

## Tecnologias utilizadas

### Aplicativo mobile

- React Native
- Expo
- JavaScript
- React Navigation
- React Context API
- AsyncStorage
- React Native Community DateTimePicker

### Backend

- C#
- .NET 9
- ASP.NET Core Web API
- Oracle Database
- Entity Framework Core

### Ferramentas e serviços

- Git e GitHub
- Expo Application Services (EAS)
- Firebase App Distribution
- Visual Studio Code

---

## Tema claro e tema escuro

O aplicativo conta com suporte aos temas claro e escuro, proporcionando uma experiência visual adaptável à preferência do usuário.

A implementação utiliza um contexto compartilhado para disponibilizar as cores do tema às telas da aplicação.

### Características

- Alternância entre tema claro e escuro.
- Cores dinâmicas para fundos, textos, campos, bordas e componentes.
- Aplicação das cores do tema à navegação.
- Persistência da preferência utilizando AsyncStorage.
- Recuperação da preferência salva ao abrir novamente o aplicativo.

A implementação está centralizada no contexto `ThemeContext`, permitindo reutilizar a configuração visual em diferentes telas.

---

## Estrutura do projeto

A estrutura principal está organizada em duas partes:

```text
Mobile-Challenge/
├── API/
│   ├── PetCare.API/
│   ├── PetCare.Application/
│   ├── PetCare.Domain/
│   ├── PetCare.Infrastructure/
│   └── projetos de testes
│
└── Mobile/
    └── mobile/
        ├── src/
        │   ├── context/
        │   ├── hooks/
        │   ├── screens/
        │   └── ...
        ├── App.js
        ├── AppNavigator.js
        ├── app.json
        └── package.json
```

A estrutura apresentada é ilustrativa. Os nomes das pastas e arquivos devem corresponder à versão final publicada no repositório.

---

## Pré-requisitos

Para executar o aplicativo em ambiente de desenvolvimento, são necessários:

- Node.js e npm.
- Expo CLI/EAS CLI, conforme as operações realizadas.
- Aplicativo Expo Go ou dispositivo Android compatível, conforme a configuração do projeto.
- API do PetCare configurada e acessível para as funcionalidades que dependem do backend.

---

## Como executar o aplicativo

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do aplicativo mobile:

```bash
cd Mobile/mobile
```

Ajuste o caminho conforme a organização do repositório clonado.

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar a API

Configure a URL base da API de acordo com o ambiente utilizado.

Em um dispositivo físico, `localhost` normalmente aponta para o próprio dispositivo, não para o computador que executa a API. Por isso, utilize o endereço de rede do computador quando necessário e garanta que o dispositivo consiga alcançá-lo.

Não publique senhas, tokens, chaves privadas ou outros dados sensíveis no repositório.

### 4. Iniciar o aplicativo

```bash
npx expo start
```

Siga as instruções apresentadas no terminal para abrir o aplicativo no ambiente desejado.

---

## Como gerar o APK Android

O projeto utiliza Expo Application Services (EAS) para gerar o aplicativo Android.

### 1. Instalar ou utilizar o EAS CLI

```bash
npm install -g eas-cli
```

### 2. Autenticar na conta Expo

```bash
eas login
```

### 3. Verificar a configuração de build

Confira o `eas.json`, o `app.json` e as configurações Android do projeto antes de iniciar uma nova compilação.

### 4. Gerar o APK

O perfil utilizado deve estar configurado para gerar um APK instalável. Quando o perfil de build estiver configurado adequadamente, execute:

```bash
eas build --platform android --profile preview
```

O comando depende da existência de um perfil `preview` compatível no `eas.json`.

Após a conclusão, o EAS disponibiliza o artefato para download.

---

## Distribuição pelo Firebase App Distribution

O Firebase App Distribution é utilizado para disponibilizar versões de teste do aplicativo Android aos testadores autorizados.

### Etapas realizadas

1. Conferir ou cadastrar o aplicativo Android no projeto Firebase.
2. Enviar o APK para o Firebase App Distribution.
3. Adicionar o professor como testador utilizando seu e-mail institucional.
4. Distribuir a versão para os testadores selecionados.
5. Confirmar o recebimento do convite e o acesso ao aplicativo.

O acesso depende da aceitação do convite e das instruções apresentadas ao testador pelo serviço.

---

## Vídeo de demonstração

**Link do vídeo:** 

```text
https://www.youtube.com/watch?v=VG5TI5JXlTo
```