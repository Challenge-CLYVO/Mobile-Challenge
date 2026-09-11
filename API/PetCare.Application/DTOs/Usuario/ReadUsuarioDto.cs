namespace PetCare.Application.DTOs.Usuario;

public class ReadUsuarioDto
{
    public int IdUsuario { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Telefone { get; set; } = string.Empty;

    public DateTime DataCadastro { get; set; }
}