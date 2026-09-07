using PetCare.Domain.Entities;

namespace PetCare.Tests.Unit.Domain.Entities;

public class AplicacaoVacinaTests
{
    [Fact]
    public void AplicacaoVacina_PropriedadesInformadas_MantemValores()
    {
        // Arrange
        var data = new DateTime(2026, 9, 1);

        var aplicacao = new AplicacaoVacina
        {
            IdPet = 10,
            IdAplicacaoVacina = 1,
            IdVacina = 5,
            DataAplicacao = data,
            Dose = "1ª dose",
            Observacao = "Aplicação normal",
            IdVeterinario = 20
        };

        // Act
        var result = aplicacao;

        // Assert
        Assert.Equal(10, result.IdPet);
        Assert.Equal(1, result.IdAplicacaoVacina);
        Assert.Equal(5, result.IdVacina);
        Assert.Equal(data, result.DataAplicacao);
        Assert.Equal("1ª dose", result.Dose);
        Assert.Equal("Aplicação normal", result.Observacao);
        Assert.Equal(20, result.IdVeterinario);
    }
}