using PetCare.Domain.Entities;

namespace PetCare.Tests.Unit.Domain.Entities;

public class ConsultaTests
{
    [Fact]
    public void Consulta_PropriedadesInformadas_MantemValores()
    {
        // Arrange
        var data = new DateTime(2026, 9, 1);

        var consulta = new Consulta
        {
            IdPet = 10,
            IdVeterinario = 20,
            IdClinica = 30,
            IdConsulta = 1,
            DataHora = data,
            Observacao = "Consulta de rotina"
        };

        // Act
        var result = consulta;

        // Assert
        Assert.Equal(10, result.IdPet);
        Assert.Equal(20, result.IdVeterinario);
        Assert.Equal(30, result.IdClinica);
        Assert.Equal(1, result.IdConsulta);
        Assert.Equal(data, result.DataHora);
        Assert.Equal("Consulta de rotina", result.Observacao);
    }
}