namespace PetCare.Domain.Entities;

public class Consulta
{
    public int IdConsulta { get; set; }

    public int IdPet { get; set; }

    public int IdVeterinario { get; set; }

    public int IdClinica { get; set; }

    public DateTime DataHora { get; set; }

    public string? Observacao { get; set; }

    // Relacionamentos
    public Pet Pet { get; set; } = null!;

    public Veterinario Veterinario { get; set; } = null!;

    public Clinica Clinica { get; set; } = null!;

    public ICollection<HistoricoSaude> HistoricosSaude { get; set; } = new List<HistoricoSaude>();
}