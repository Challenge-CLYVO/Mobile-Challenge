namespace PetCare.Domain.Entities;

public class Usuario
{
    public int IdUsuario { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Senha { get; set; } = string.Empty;

    public string Telefone { get; set; } = string.Empty;

    public DateTime DataCadastro { get; set; }

    // Relacionamentos
    public Responsavel? Responsavel { get; set; }

    public ICollection<Veterinario> Veterinarios { get; set; } = new List<Veterinario>();
}