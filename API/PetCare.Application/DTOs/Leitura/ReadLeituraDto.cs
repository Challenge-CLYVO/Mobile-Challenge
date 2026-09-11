namespace PetCare.Application.DTOs.Leitura;

public class ReadLeituraDto
{
    public int IdLeitura { get; set; }

    public int IdSensor { get; set; }

    public DateTime DataRegistro { get; set; }

    public string Valor { get; set; } = string.Empty;
}