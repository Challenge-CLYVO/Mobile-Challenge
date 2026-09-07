namespace PetCare.Domain.Entities;

public class Veterinario
{
    public int IdVeterinario { get; set; }

    public int IdUsuario { get; set; }

    public int IdClinica { get; set; }

    public string? CRV { get; set; }

    public string? Especialidade { get; set; }

    // Relacionamentos
    public Usuario Usuario { get; set; } = null!;

    public Clinica Clinica { get; set; } = null!;

    public ICollection<Consulta> Consultas { get; set; } = new List<Consulta>();

    public ICollection<AplicacaoVacina> AplicacoesVacina { get; set; } = new List<AplicacaoVacina>();
}