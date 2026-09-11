using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Clinica;

public class CreateClinicaDto
{
    [Range(
        1,
        int.MaxValue,
        ErrorMessage = "O id da clínica deve ser maior que 0."
    )]
    public int IdClinica { get; set; }

    [Required(
        ErrorMessage = "O nome da clínica é obrigatório."
    )]
    [StringLength(
        50,
        ErrorMessage = "O nome da clínica deve ter no máximo 50 caracteres."
    )]
    public string Nome { get; set; } = string.Empty;

    [Required(
        ErrorMessage = "O CNPJ é obrigatório."
    )]
    [StringLength(
        14,
        MinimumLength = 14,
        ErrorMessage = "O CNPJ deve ter exatamente 14 caracteres."
    )]
    public string Cnpj { get; set; } = string.Empty;

    [Required(
        ErrorMessage = "O telefone é obrigatório."
    )]
    [StringLength(
        11,
        MinimumLength = 10,
        ErrorMessage = "O telefone deve ter 10 ou 11 números."
    )]
    public string Telefone { get; set; } = string.Empty;

    [Required(
        ErrorMessage = "O email é obrigatório."
    )]
    [EmailAddress(
        ErrorMessage = "Email inválido."
    )]
    [StringLength(
        255,
        ErrorMessage = "O email deve ter no máximo 255 caracteres."
    )]
    public string Email { get; set; } = string.Empty;

    [Required(
        ErrorMessage = "O endereço é obrigatório."
    )]
    [StringLength(
        50,
        ErrorMessage = "O endereço deve ter no máximo 50 caracteres."
    )]
    public string Endereco { get; set; } = string.Empty;
}