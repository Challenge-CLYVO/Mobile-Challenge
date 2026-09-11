using PetCare.Domain.Entities;

namespace PetCare.Tests.Unit.Domain.Entities;

public class HistoricoSaudeTests
{
    [Fact]
    public void HistoricoSaude_PropriedadesInformadas_MantemValores()
    {
        // Arrange
        var data = new DateTime(2026, 9, 1);

        var historico = new HistoricoSaude
        {
            IdPet = 10,
            IdHistorico = 1,
            IdConsulta = 20,
            DataRegistro = data,
            Descricao = "Animal apresentou melhora"
        };

        // Act
        var result = historico;

        // Assert
        Assert.Equal(10, result.IdPet);
        Assert.Equal(1, result.IdHistorico);
        Assert.Equal(20, result.IdConsulta);
        Assert.Equal(data, result.DataRegistro);
        Assert.Equal("Animal apresentou melhora", result.Descricao);
    }
}