namespace PetCare.Application.DTOs.Lembrete;

public class ReadLembreteDto
{
    public int IdLembrete { get; set; }

    public int IdPet { get; set; }

    public string Titulo { get; set; } = string.Empty;

    public string Descricao { get; set; } = string.Empty;

    public DateTime DataHora { get; set; }

    public string Status { get; set; } = string.Empty;
}