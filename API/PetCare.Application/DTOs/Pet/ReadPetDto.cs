namespace PetCare.Application.DTOs.Pet;

public class ReadPetDto
{
    public int IdPet { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string Sexo { get; set; } = string.Empty;

    public string Raca { get; set; } = string.Empty;

    public string Especie { get; set; } = string.Empty;

    public DateTime DataNascimento { get; set; }

    public int IdResponsavel { get; set; }

    public string NomeResponsavel { get; set; } = string.Empty;
}