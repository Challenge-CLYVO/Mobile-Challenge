namespace PetCare.Domain.Entities;

public class HistoricoSaude
{
    public int IdHistorico { get; set; }

    public int IdPet { get; set; }

    public int IdConsulta { get; set; }

    public DateTime DataRegistro { get; set; }

    public string Descricao { get; set; } = string.Empty;

    // Relacionamentos
    public Pet Pet { get; set; } = null!;

    public Consulta Consulta { get; set; } = null!;
}