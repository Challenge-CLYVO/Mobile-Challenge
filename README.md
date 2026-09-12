# 🐾 Pet Care App

## Sprint 3

Aplicação mobile para gerenciamento de informações veterinárias, permitindo o cadastro e acompanhamento de pets, aplicações de vacinas e lembretes, além de oferecer uma área específica para veterinários acompanharem seus pacientes.

---

# 👥 Integrantes

- Lucas Rafael Solimene / RM: 565194
- Samyr Couto Oliveira / RM: 565562
- Henrique Teixeira Cesar / RM: 563088

---

# 🎥 Vídeo de apresentação

> **LINK DO VÍDEO NO YOUTUBE:**
>
> 🔗 https://www.youtube.com/watch?v=xyZoDl1N6Nc

O vídeo deverá apresentar o funcionamento da aplicação, incluindo:

- Cadastro de usuário;
- Login;
- Persistência da sessão;
- Navegação entre as telas;
- Cadastro de Pet;
- Consulta dos Pets;
- Edição de Pet;
- Exclusão de Pet;
- Cadastro de aplicação de vacina;
- Edição de aplicação de vacina;
- Exclusão de aplicação de vacina;
- Área do veterinário;
- Consulta de pacientes;
- Consulta dos Pets dos pacientes;
- Lembretes de vacinação;
- Integração entre aplicativo mobile, API e banco de dados.

---

# 📌 Sobre o projeto

O **CLYVO VET** é uma solução voltada para o gerenciamento e acompanhamento da saúde de animais de estimação.

A aplicação permite que responsáveis pelos animais mantenham informações relacionadas aos seus Pets e acompanhem suas aplicações de vacinas.

Além disso, existe uma área específica para veterinários, permitindo que profissionais visualizem pacientes, seus respectivos Pets e gerenciem aplicações de vacinas.

A aplicação foi desenvolvida utilizando uma arquitetura baseada em aplicativo mobile, API REST em .NET e banco de dados Oracle.

---

# 🎯 Problema

O acompanhamento da saúde dos Pets pode se tornar difícil quando informações como cadastro do animal, histórico de vacinação e dados do responsável ficam espalhadas ou são controladas manualmente.

Além disso, o veterinário precisa conseguir visualizar os animais relacionados aos seus pacientes e registrar informações de vacinação de maneira organizada.

O projeto busca centralizar essas informações em uma única aplicação, permitindo que responsáveis e veterinários tenham acesso às informações necessárias de acordo com seu perfil.

---

# 💡 Solução

O CLYVO VET centraliza o gerenciamento das informações veterinárias através de uma aplicação mobile integrada a uma API REST.

O sistema possui dois perfis principais:

### 👤 Usuário / Responsável

O usuário pode:

- Criar uma conta;
- Realizar login;
- Permanecer autenticado;
- Visualizar seu perfil;
- Cadastrar Pets;
- Consultar seus Pets;
- Editar Pets;
- Excluir Pets;
- Consultar aplicações de vacinas;
- Acompanhar seus lembretes.

### 🩺 Veterinário

O veterinário pode:

- Criar uma conta profissional;
- Realizar login;
- Visualizar seus pacientes;
- Visualizar os Pets dos pacientes;
- Cadastrar Pets para pacientes;
- Editar Pets;
- Consultar aplicações de vacinas;
- Cadastrar aplicações de vacinas;
- Editar aplicações;
- Excluir aplicações.

---

# 📱 Funcionalidades

## 🔐 Autenticação

O sistema possui autenticação integrada à API.

Funcionalidades:

- Login;
- Cadastro de usuário;
- Cadastro de veterinário;
- Validação dos campos;
- Mensagens de erro;
- Indicadores de carregamento;
- JWT;
- Persistência da sessão;
- Logout;
- Proteção das rotas.

O token de autenticação é armazenado localmente e enviado automaticamente nas requisições realizadas para a API.

---

# 🧭 Navegação

A aplicação possui navegação baseada em **React Navigation**, utilizando rotas reais.

---

# 📱 Fluxo da Aplicação

Login ➔ Home Veterinário ➔ Pacientes ➔ Paciente ➔ Pet ➔ Aplicações de Vacina

---

# 🐶 Gerenciamento de Pets
O sistema possui CRUD completo de Pets:

Create: Cadastro de um novo Pet através da API.

Read: Consulta dos Pets cadastrados.

Update: Alteração das informações do Pet.

Delete: Exclusão do Pet.

Os dados são obtidos diretamente da API, sem utilização de dados mockados.

---

# 💉 Gerenciamento de Aplicações de Vacinas
O sistema possui CRUD completo para aplicações de vacinas:

Create: Cadastro de uma nova aplicação.

Read: Consulta das aplicações cadastradas.

Update: Alteração de uma aplicação.

Delete: Exclusão de uma aplicação.

Cada aplicação possui informações como:

Pet

Vacina

Data da aplicação

Dose

Observação

Veterinário responsável

---

# 🔔 Lembretes

A tela de lembretes utiliza dados reais da API. As aplicações de vacina cadastradas para os Pets do usuário são consultadas e apresentadas na área de lembretes.

Fluxo de dados:

Veterinário ➔ Cadastro da aplicação ➔ API .NET ➔ Banco Oracle ➔ Aplicação Mobile ➔ Lembretes do usuário

Dessa forma, os lembretes não são informações fixas ou simuladas.

---

# 🩺 Área do Veterinário

A área do veterinário foi desenvolvida separadamente da área do usuário. O veterinário possui acesso à tela de pacientes.

Relacionamentos:
Usuário ➔ Responsável ➔ Pet ➔ Aplicações de Vacina

Dessa maneira, o veterinário consegue visualizar os Pets associados aos seus pacientes e gerenciar suas aplicações de vacina.

---

# 🏗️ Arquitetura
O projeto utiliza separação entre interface, regras de acesso aos dados e serviços.

Estrutura principal do aplicativo mobile

```text
src/
│
├── config/
│
├── context/
│
├── hooks/
│   ├── aplicacaoVacinas/
│   ├── auth/
│   ├── pets/
│   ├── usuarios/
│   ├── vacinas/
│   └── veterinarios/
│
├── navigation/
│
├── screens/
│
└── services/
```

---

## Responsabilidade das Pastas

- screens: Contém as telas da aplicação (LoginScreen.js, CadastroScreen.js, HomeScreen.js, PerfilScreen.js, LembretesScreen.js, PetVacinasScreen.js, PetCadastroScreen.js, PetEditarScreen.js, AplicacaoVacinaScreen.js, CadastroVeterinarioScreen.js, HomeVeterinarioScreen.js, PacientesScreen.js).

- services: Responsável pela comunicação com a API (api.js, authService.js, petService.js, aplicacaoVacinaService.js, vacinaService.js, usuarioService.js, responsavelService.js, veterinarioService.js, clinicaService.js). As telas não realizam diretamente chamadas HTTP.

- hooks: Concentra as operações utilizando TanStack Query (useQuery, useMutation), separando a lógica de acesso aos dados da interface.

- context: Contém o gerenciamento da autenticação e da sessão do usuário (AuthContext controla Token, Usuário autenticado, Estado de carregamento, Login, Logout e Recuperação da sessão).

- navigation: Rotas da aplicação separadas entre AuthStack, UserStack e VetStack, garantindo fluxos diferentes para usuários não autenticados, usuários comuns e veterinários.

---

# 🔄 TanStack Query
O projeto utiliza TanStack Query para gerenciamento das requisições e atualização dos dados.

## Fluxo de requisição:

Tela ➔ Hook ➔ Service ➔ Axios ➔ API .NET ➔ Oracle

Após operações de alteração, as consultas relacionadas são invalidadas para que os dados sejam atualizados automaticamente:

queryClient.invalidateQueries({
  queryKey: ['pets'],
});

Isso evita que o usuário precise reiniciar o aplicativo para visualizar alterações.

---

# 🌐 API

A aplicação mobile realiza requisições HTTP para uma API desenvolvida em ASP.NET Core.

## Principais Endpoints

### Autenticação:

- POST /api/Auth/login
- POST /api/Auth/register
- POST /api/Auth/register-veterinario

### Pets:

- GET /api/Pet
- GET /api/Pet/{id}
- POST /api/Pet
- PUT /api/Pet/{id}
- DELETE /api/Pet/{id}

### Aplicações de Vacina:

- GET /api/AplicacaoVacina
- GET /api/AplicacaoVacina/{id}
- POST /api/AplicacaoVacina
- PUT /api/AplicacaoVacina/{id}
- DELETE /api/AplicacaoVacina/{id}

### Vacinas:

- GET /api/Vacina
- GET /api/Vacina/{id}

### Usuários:

- GET /api/Usuario
- GET /api/Usuario/{id}

### Responsáveis:

- GET /api/Responsavel
- GET /api/Responsavel/{id}

### Veterinários:

- GET /api/Veterinario
- GET /api/Veterinario/{id}
- POST /api/Veterinario
- PUT /api/Veterinario/{id}
- DELETE /api/Veterinario/{id}

---

# 🔑 Autenticação JWT

Após o login, a API retorna um token JWT. O aplicativo armazena o token e o utiliza nas requisições autenticadas. O Axios possui um interceptor responsável por adicionar automaticamente o header às requisições:

Authorization: Bearer <token>

---

# 🗄️ Banco de Dados

O backend utiliza Oracle Database para persistência das informações. As principais entidades utilizadas são:

- Usuario
- Responsavel
- Pet
- Vacina
- AplicacaoVacina
- Veterinario
- Clinica
- Lembrete

Os dados cadastrados através do aplicativo são enviados para a API e persistidos no banco.

# 🛠️ Tecnologias Utilizadas

- Mobile
- React Native
- Expo
- JavaScript
- React Navigation
- TanStack Query
- Axios
- AsyncStorage
- Backend
- C#
- ASP.NET Core
- Entity Framework Core
- JWT
- AutoMapper
- Serilog
- OpenTelemetry
- Banco de Dados
- Oracle Database
- Ferramentas
- Visual Studio Code
- Visual Studio
- Git
- GitHub
- Postman
- Docker

---

# 📋 Pré-requisitos

Antes de executar o projeto, é necessário possuir:

- Node.js
- npm
- Expo
- .NET SDK
- Oracle Database ou ambiente Oracle configurado
- Git
- Android Studio ou dispositivo físico/emulador para executar o aplicativo

---

# 🚀 Como Executar o Backend

Entre na pasta do backend:

```Bash
cd Dotnet-Challenge
```

```Bash
dotnet restore
```

Compile o projeto:

```Bash
dotnet build
```

Execute a API:

```Bash
dotnet run --project PetCare.API
```

Após iniciar a API, verifique a porta exibida no terminal.

# 🚀 Como Executar o Mobile

Entre na pasta do mobile:

```bash
cd Mobile-Challenge
```

Instale as dependências:

```Bash
npm install
```

Execute o Expo:

```Bash
npm start
```

(Também pode ser utilizado: npx expo start)

Depois escolha uma das opções disponíveis:

- Android
- iOS
- Web
- Expo Go

---

# ⚙️ Configuração da API Mobile

Antes de executar o aplicativo, configure o endereço da API em:

src/config/env.js

Exemplo:

```JavaScript
export const API_URL = 'http://192.168.0.10:5100/api';
```

O endereço deve ser alterado de acordo com o IP e a porta utilizados no ambiente de execução. Quando o aplicativo estiver sendo executado em um celular físico, deve ser utilizado o IP da máquina que está executando a API, e não localhost.

# 🧪 Testes

Os testes do projeto devem validar principalmente:

- Autenticação
- Cadastro
- Login
- Persistência da sessão
- Logout
- Proteção de rotas
- Tratamento de credenciais inválidas
- Pets
- Cadastro
- Consulta
- Edição
- Exclusão
- Aplicações de Vacina
- Cadastro
- Consulta
- Edição
- Exclusão
- Integração
- Comunicação Mobile ➔ API
- Persistência no banco
- Atualização automática após alterações
- Fluxo Veterinário ➔ Paciente ➔ Pet ➔ Vacina
- Fluxo Veterinário ➔ Aplicação ➔ Lembretes do usuário
