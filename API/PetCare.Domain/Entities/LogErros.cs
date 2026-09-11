namespace PetCare.Domain.Entities;

public class LogErros
{
    public int IdLogErro { get; set; }

    public string NomeProcedure { get; set; } = string.Empty;

    public string Usuario { get; set; } = string.Empty;

    public DateTime DataErro { get; set; }

    public int? CodigoErro { get; set; }

    public string MensagemErro { get; set; } = string.Empty;
}