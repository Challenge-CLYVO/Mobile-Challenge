namespace PetCare.Application.DTOs.Responsavel;

public class ReadResponsavelDto
{
    public int IdResponsavel { get; set; }

    public int IdUsuario { get; set; }

    public string CPF { get; set; } = string.Empty;

    public DateTime DataNascimento { get; set; }
}