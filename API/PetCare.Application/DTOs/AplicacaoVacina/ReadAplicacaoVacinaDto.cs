namespace PetCare.Application.DTOs.AplicacaoVacina;

public class ReadAplicacaoVacinaDto
{
    public int IdAplicacaoVacina { get; set; }

    public int IdPet { get; set; }

    public int IdVacina { get; set; }

    public DateTime DataAplicacao { get; set; }

    public string? Dose { get; set; }

    public string? Observacao { get; set; }

    public int IdVeterinario { get; set; }
}