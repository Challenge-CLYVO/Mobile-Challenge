namespace PetCare.Application.DTOs.Veterinario;

public class ReadVeterinarioDto
{
    public int IdVeterinario { get; set; }

    public int IdUsuario { get; set; }

    public int IdClinica { get; set; }

    public string? CRV { get; set; }

    public string? Especialidade { get; set; }
}