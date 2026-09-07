namespace PetCare.Domain.Entities;

public class Sensor
{
    public int IdSensor { get; set; }

    public string Tipo { get; set; } = string.Empty;

    public string Unidade { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public int IdPet { get; set; }

    // Relacionamento
    public Pet Pet { get; set; } = null!;

    public ICollection<Leitura> Leituras { get; set; } = new List<Leitura>();
}