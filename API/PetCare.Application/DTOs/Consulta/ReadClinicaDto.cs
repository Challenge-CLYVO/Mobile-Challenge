namespace PetCare.Application.DTOs.Consulta;

public class ReadConsultaDto
{
    public int IdConsulta { get; set; }

    public int IdPet { get; set; }

    public int IdVeterinario { get; set; }

    public int IdClinica { get; set; }

    public DateTime DataHora { get; set; }

    public string? Observacao { get; set; }
}