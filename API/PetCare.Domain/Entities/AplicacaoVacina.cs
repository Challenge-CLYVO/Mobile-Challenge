namespace PetCare.Domain.Entities;

public class AplicacaoVacina
{
    public int IdAplicacaoVacina { get; set; }

    public int IdPet { get; set; }

    public int IdVacina { get; set; }

    public DateTime DataAplicacao { get; set; }

    public string? Dose { get; set; }

    public string? Observacao { get; set; }

    public int IdVeterinario { get; set; }

    // Relacionamentos
    public Pet Pet { get; set; } = null!;

    public Vacina Vacina { get; set; } = null!;

    public Veterinario Veterinario { get; set; } = null!;
}