using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Auth;

public class RegisterDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(
        25,
        ErrorMessage = "O nome deve ter no máximo 25 caracteres."
    )]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O email é obrigatório.")]
    [EmailAddress(ErrorMessage = "Email inválido.")]
    [StringLength(
        255,
        ErrorMessage = "O email deve ter no máximo 255 caracteres."
    )]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "A senha é obrigatória.")]
    [MinLength(
        6,
        ErrorMessage = "A senha deve possuir pelo menos 6 caracteres."
    )]
    [StringLength(255)]
    public string Senha { get; set; } = string.Empty;

    [Required(ErrorMessage = "O telefone é obrigatório.")]
    [StringLength(
        11,
        ErrorMessage = "O telefone deve possuir no máximo 11 caracteres."
    )]
    public string Telefone { get; set; } = string.Empty;
}