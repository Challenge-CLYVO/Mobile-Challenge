namespace PetCare.Application.DTOs.Sensor;

public class ReadSensorDto
{
    public int IdSensor { get; set; }

    public string Tipo { get; set; } = string.Empty;

    public string Unidade { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public int IdPet { get; set; }
}