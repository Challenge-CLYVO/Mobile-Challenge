using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Usuario;

public class CreateUsuarioDto
{
    [Required(ErrorMessage = "O nome do usuário é obrigatório.")]
    [StringLength(25, ErrorMessage = "O nome do usuário deve ter no máximo 25 caracteres.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O email é obrigatório.")]
    [EmailAddress(ErrorMessage = "Email inválido.")]
    [StringLength(255, ErrorMessage = "O email deve ter no máximo 255 caracteres.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "A senha é obrigatória.")]
    [StringLength(255, ErrorMessage = "A senha deve ter no máximo 255 caracteres.")]
    public string Senha { get; set; } = string.Empty;

    [Required(ErrorMessage = "O telefone é obrigatório.")]
    [Phone(ErrorMessage = "Telefone inválido.")]
    [StringLength(11, ErrorMessage = "O telefone deve ter no máximo 11 caracteres.")]
    public string Telefone { get; set; } = string.Empty;

    [Required(ErrorMessage = "A data de cadastro é obrigatória.")]
    public DateTime DataCadastro { get; set; }
}