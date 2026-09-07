namespace PetCare.Domain.Entities;

public class Leitura
{
    public int IdLeitura { get; set; }

    public int IdSensor { get; set; }

    public DateTime DataRegistro { get; set; }

    public string Valor { get; set; } = string.Empty;

    // Relacionamento
    public Sensor Sensor { get; set; } = null!;
}