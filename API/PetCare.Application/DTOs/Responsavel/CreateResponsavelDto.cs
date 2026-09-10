using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Responsavel;

public class CreateResponsavelDto
{
    [Range(
        1,
        int.MaxValue,
        ErrorMessage = "O id do usuário deve ser maior que 0."
    )]
    public int IdUsuario { get; set; }

    [Range(
        1,
        int.MaxValue,
        ErrorMessage = "O id do responsável deve ser maior que 0."
    )]
    public int IdResponsavel { get; set; }

    [Required(
        ErrorMessage = "O CPF é obrigatório."
    )]
    [StringLength(
        11,
        MinimumLength = 11,
        ErrorMessage = "O CPF deve ter exatamente 11 caracteres."
    )]
    public string CPF { get; set; } = string.Empty;

    [Required(
        ErrorMessage = "A data de nascimento é obrigatória."
    )]
    public DateTime DataNascimento { get; set; }
}