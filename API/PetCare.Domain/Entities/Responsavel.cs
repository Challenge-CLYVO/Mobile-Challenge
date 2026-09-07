namespace PetCare.Domain.Entities;

public class Responsavel
{
    public int IdResponsavel { get; set; }

    public int IdUsuario { get; set; }

    public string CPF { get; set; } = string.Empty;

    public DateTime DataNascimento { get; set; }

    // Relacionamentos
    public Usuario Usuario { get; set; } = null!;

    public ICollection<Pet> Pets { get; set; } = new List<Pet>();
}