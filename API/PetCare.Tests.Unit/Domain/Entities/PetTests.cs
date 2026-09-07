using PetCare.Domain.Entities;

namespace PetCare.Tests.Unit.Domain.Entities;

public class PetTests
{
    [Fact]
    public void Pet_Instanciado_InicializaColecoes()
    {
        // Arrange

        // Act
        var pet = new Pet();

        // Assert
        Assert.NotNull(pet.Consultas);
        Assert.NotNull(pet.HistoricosSaude);
        Assert.NotNull(pet.AplicacoesVacina);
    }

    [Fact]
    public void Pet_PropriedadesInformadas_MantemValores()
    {
        // Arrange
        var dataNascimento = new DateTime(2022, 5, 10);

        var pet = new Pet
        {
            IdPet = 1,
            Nome = "Rex",
            Sexo = "Macho",
            Raca = "Labrador",
            Especie = "Cachorro",
            DataNascimento = dataNascimento,
            IdResponsavel = 10
        };

        // Act
        var result = pet;

        // Assert
        Assert.Equal(1, result.IdPet);
        Assert.Equal("Rex", result.Nome);
        Assert.Equal("Macho", result.Sexo);
        Assert.Equal("Labrador", result.Raca);
        Assert.Equal("Cachorro", result.Especie);
        Assert.Equal(dataNascimento, result.DataNascimento);
        Assert.Equal(10, result.IdResponsavel);
    }
}