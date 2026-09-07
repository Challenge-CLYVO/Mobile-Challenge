namespace PetCare.Domain.Entities;

public class Pet
{
    public int IdPet { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string Sexo { get; set; } = string.Empty;

    public string Raca { get; set; } = string.Empty;

    public string Especie { get; set; } = string.Empty;

    public DateTime DataNascimento { get; set; }

    public int IdResponsavel { get; set; }

    // Relacionamentos
    public Responsavel Responsavel { get; set; } = null!;

    public ICollection<Consulta> Consultas { get; set; } = new List<Consulta>();

    public ICollection<HistoricoSaude> HistoricosSaude { get; set; } = new List<HistoricoSaude>();

    public ICollection<AplicacaoVacina> AplicacoesVacina { get; set; } = new List<AplicacaoVacina>();

    public ICollection<Lembrete> Lembretes { get; set; } = new List<Lembrete>();

    public ICollection<Sensor> Sensores { get; set; } = new List<Sensor>();
}