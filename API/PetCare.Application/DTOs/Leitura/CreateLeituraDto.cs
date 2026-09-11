using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Leitura;

public class CreateLeituraDto
{
    [Range(1, int.MaxValue, ErrorMessage = "O id do sensor deve ser maior que 0.")]
    public int IdSensor { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "O id da leitura deve ser maior que 0.")]
    public int IdLeitura { get; set; }

    [Required(ErrorMessage = "A data do registro é obrigatória.")]
    public DateTime DataRegistro { get; set; }

    [Required(ErrorMessage = "O valor da leitura é obrigatório.")]
    [StringLength(20, ErrorMessage = "O valor deve ter no máximo 20 caracteres.")]
    public string Valor { get; set; } = string.Empty;
}