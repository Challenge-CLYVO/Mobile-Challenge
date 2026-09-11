namespace PetCare.Domain.Entities;

public class Clinica
{
    public int IdClinica { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string CNPJ { get; set; } = string.Empty;

    public string Telefone { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Endereco { get; set; } = string.Empty;

    // Relacionamentos
    public ICollection<Veterinario> Veterinarios { get; set; } = new List<Veterinario>();

    public ICollection<Consulta> Consultas { get; set; } = new List<Consulta>();
}