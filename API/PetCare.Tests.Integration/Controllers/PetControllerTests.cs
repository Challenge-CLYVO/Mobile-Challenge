using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using PetCare.Application.DTOs.Pet;
using PetCare.Domain.Entities;
using PetCare.Infrastructure.Data;
using PetCare.Tests.Integration.Fixtures;

namespace PetCare.Tests.Integration.Controllers;

[Collection("PetCare Collection")]
public class PetControllerTests
{
    private readonly HttpClient _client;
    private readonly PetCareApiFactory _factory;

    public PetControllerTests(PetCareApiFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    private async Task PrepararDadosAsync()
    {
        using var scope = _factory.Services.CreateScope();

        var context = scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

        var usuario = await context.Usuarios.FindAsync(1);

        if (usuario == null)
        {
            usuario = new Usuario
            {
                IdUsuario = 1,
                Nome = "Usuario Teste",
                Email = "teste@teste.com",
                Senha = "123456",
                Telefone = "11999999999",
                DataCadastro = DateTime.Now
            };

            context.Usuarios.Add(usuario);
        }

        var responsavel = await context.Responsaveis.FindAsync(1);

        if (responsavel == null)
        {
            responsavel = new Responsavel
            {
                IdResponsavel = 1,
                IdUsuario = 1,
                CPF = "12345678901",
                DataNascimento = new DateTime(1995, 1, 1)
            };

            context.Responsaveis.Add(responsavel);
        }

        await context.SaveChangesAsync();

        var pet = await context.Pets.FindAsync(1);

        if (pet == null)
        {
            pet = new Pet
            {
                IdPet = 1,
                Nome = "Pet Teste",
                Sexo = "Macho",
                Raca = "Labrador",
                Especie = "Cachorro",
                DataNascimento = new DateTime(2020, 1, 1),
                IdResponsavel = 1
            };

            context.Pets.Add(pet);

            await context.SaveChangesAsync();
        }
    }

    private async Task AutenticarAsync()
    {
        await PrepararDadosAsync();

        var response = await _client.PostAsync(
            "/api/Auth/login",
            null);

        response.EnsureSuccessStatusCode();

        var result = await response.Content
            .ReadFromJsonAsync<LoginResponse>();

        Assert.NotNull(result);
        Assert.False(
            string.IsNullOrWhiteSpace(result!.Token));

        _client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue(
                "Bearer",
                result.Token);
    }

    [Fact]
    public async Task GetAllAsync_RequisicaoValida_RetornaSucesso()
    {
        await AutenticarAsync();

        var response = await _client.GetAsync(
            "/api/Pet");

        Assert.Equal(
            HttpStatusCode.OK,
            response.StatusCode);
    }

    [Fact]
    public async Task GetById_PetExistente_RetornaSucesso()
    {
        await AutenticarAsync();

        var response = await _client.GetAsync(
            "/api/Pet/1");

        Assert.Equal(
            HttpStatusCode.OK,
            response.StatusCode);
    }

    [Fact]
    public async Task GetById_PetNaoExistente_RetornaNotFound()
    {
        await AutenticarAsync();

        var response = await _client.GetAsync(
            "/api/Pet/-1");

        Assert.Equal(
            HttpStatusCode.NotFound,
            response.StatusCode);
    }

    [Fact]
    public async Task Create_PetValido_RetornaCreated()
    {
        await AutenticarAsync();

        var dto = new CreatePetDto
        {
            Nome = $"Teste{Guid.NewGuid():N}".Substring(0, 15),
            Sexo = "Macho",
            Raca = "Labrador",
            Especie = "Cachorro",
            DataNascimento = new DateTime(2023, 1, 1),
            IdResponsavel = 1
        };

        var response = await _client.PostAsJsonAsync(
            "/api/Pet",
            dto);

        Assert.Equal(
            HttpStatusCode.Created,
            response.StatusCode);

        var petCriado =
            await response.Content.ReadFromJsonAsync<ReadPetDto>();

        Assert.NotNull(petCriado);
        Assert.True(petCriado!.IdPet > 0);
    }

    [Fact]
    public async Task Create_DadosInvalidos_RetornaBadRequest()
    {
        await AutenticarAsync();

        var dto = new CreatePetDto
        {
            Nome = "",
            Sexo = "",
            Raca = "",
            Especie = "",
            DataNascimento = default,
            IdResponsavel = 0
        };

        var response = await _client.PostAsJsonAsync(
            "/api/Pet",
            dto);

        Assert.Equal(
            HttpStatusCode.BadRequest,
            response.StatusCode);
    }

    [Fact]
    public async Task Update_PetExistente_RetornaNoContent()
    {
        await AutenticarAsync();

        var dto = new UpdatePetDto
        {
            Nome = "Pet Atualizado",
            Sexo = "Macho",
            Raca = "Golden",
            Especie = "Cachorro",
            DataNascimento = new DateTime(2022, 1, 1),
            IdResponsavel = 1
        };

        var response = await _client.PutAsJsonAsync(
            "/api/Pet/1",
            dto);

        Assert.Equal(
            HttpStatusCode.NoContent,
            response.StatusCode);
    }

    [Fact]
    public async Task Update_PetNaoExistente_RetornaNotFound()
    {
        await AutenticarAsync();

        var dto = new UpdatePetDto
        {
            Nome = "Pet Inexistente",
            Sexo = "Macho",
            Raca = "Labrador",
            Especie = "Cachorro",
            DataNascimento = new DateTime(2022, 1, 1),
            IdResponsavel = 1
        };

        var response = await _client.PutAsJsonAsync(
            "/api/Pet/-1",
            dto);

        Assert.Equal(
            HttpStatusCode.NotFound,
            response.StatusCode);
    }

    [Fact]
    public async Task Delete_PetExistente_RetornaNoContent()
    {
        await AutenticarAsync();

        var createDto = new CreatePetDto
        {
            Nome = $"Excluir{Guid.NewGuid():N}".Substring(0, 15),
            Sexo = "Femea",
            Raca = "Poodle",
            Especie = "Cachorro",
            DataNascimento = new DateTime(2024, 1, 1),
            IdResponsavel = 1
        };

        var createResponse =
            await _client.PostAsJsonAsync(
                "/api/Pet",
                createDto);

        Assert.Equal(
            HttpStatusCode.Created,
            createResponse.StatusCode);

        var petCriado =
            await createResponse.Content
                .ReadFromJsonAsync<ReadPetDto>();

        Assert.NotNull(petCriado);
        Assert.True(petCriado!.IdPet > 0);

        var deleteResponse =
            await _client.DeleteAsync(
                $"/api/Pet/{petCriado.IdPet}");

        Assert.Equal(
            HttpStatusCode.NoContent,
            deleteResponse.StatusCode);
    }

    [Fact]
    public async Task GetAll_SemAutenticacao_RetornaUnauthorized()
    {
        _client.DefaultRequestHeaders.Authorization = null;

        var response = await _client.GetAsync(
            "/api/Pet");

        Assert.Equal(
            HttpStatusCode.Unauthorized,
            response.StatusCode);
    }

    [Fact]
    public async Task GetAll_ComTokenInvalido_RetornaUnauthorized()
    {
        _client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue(
                "Bearer",
                "token-invalido");

        var response = await _client.GetAsync(
            "/api/Pet");

        Assert.Equal(
            HttpStatusCode.Unauthorized,
            response.StatusCode);
    }

    [Fact]
    public async Task Pet_FluxoCompleto_CriarConsultarAtualizarExcluir()
    {
        await AutenticarAsync();

        var nome = $"Fluxo{Guid.NewGuid():N}"
            .Substring(0, 15);

        var createDto = new CreatePetDto
        {
            Nome = nome,
            Sexo = "Macho",
            Raca = "Labrador",
            Especie = "Cachorro",
            DataNascimento = new DateTime(2023, 1, 1),
            IdResponsavel = 1
        };

        // =====================================================
        // CREATE
        // =====================================================

        var createResponse =
            await _client.PostAsJsonAsync(
                "/api/Pet",
                createDto);

        Assert.Equal(
            HttpStatusCode.Created,
            createResponse.StatusCode);

        var createdPet =
            await createResponse.Content
                .ReadFromJsonAsync<ReadPetDto>();

        Assert.NotNull(createdPet);
        Assert.True(createdPet!.IdPet > 0);

        var id = createdPet.IdPet;

        // =====================================================
        // GET
        // =====================================================

        var getResponse =
            await _client.GetAsync(
                $"/api/Pet/{id}");

        Assert.Equal(
            HttpStatusCode.OK,
            getResponse.StatusCode);

        // =====================================================
        // UPDATE
        // =====================================================

        var updateDto = new UpdatePetDto
        {
            Nome = $"{nome} Up",
            Sexo = "Macho",
            Raca = "Golden",
            Especie = "Cachorro",
            DataNascimento = new DateTime(2022, 1, 1),
            IdResponsavel = 1
        };

        var updateResponse =
            await _client.PutAsJsonAsync(
                $"/api/Pet/{id}",
                updateDto);

        Assert.Equal(
            HttpStatusCode.NoContent,
            updateResponse.StatusCode);

        // =====================================================
        // GET APÓS UPDATE
        // =====================================================

        var getUpdatedResponse =
            await _client.GetAsync(
                $"/api/Pet/{id}");

        Assert.Equal(
            HttpStatusCode.OK,
            getUpdatedResponse.StatusCode);

        var updatedPet =
            await getUpdatedResponse.Content
                .ReadFromJsonAsync<ReadPetDto>();

        Assert.NotNull(updatedPet);

        Assert.Equal(
            $"{nome} Up",
            updatedPet!.Nome);

        Assert.Equal(
            "Macho",
            updatedPet.Sexo);

        Assert.Equal(
            "Golden",
            updatedPet.Raca);

        // =====================================================
        // DELETE
        // =====================================================

        var deleteResponse =
            await _client.DeleteAsync(
                $"/api/Pet/{id}");

        Assert.Equal(
            HttpStatusCode.NoContent,
            deleteResponse.StatusCode);

        // =====================================================
        // GET APÓS DELETE
        // =====================================================

        var getDeletedResponse =
            await _client.GetAsync(
                $"/api/Pet/{id}");

        Assert.Equal(
            HttpStatusCode.NotFound,
            getDeletedResponse.StatusCode);
    }

    private class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
    }
}