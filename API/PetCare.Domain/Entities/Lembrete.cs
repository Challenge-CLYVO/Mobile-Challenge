namespace PetCare.Domain.Entities;

public class Lembrete
{
    public int IdLembrete { get; set; }

    public int IdPet { get; set; }

    public string Titulo { get; set; } = string.Empty;

    public string Descricao { get; set; } = string.Empty;

    public DateTime DataHora { get; set; }

    public string Status { get; set; } = string.Empty;

    // Relacionamento
    public Pet Pet { get; set; } = null!;
}