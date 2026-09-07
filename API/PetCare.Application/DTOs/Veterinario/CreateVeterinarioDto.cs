using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Veterinario;

public class CreateVeterinarioDto
{
    [Range(1, int.MaxValue, ErrorMessage = "O id do usuário deve ser maior que 0.")]
    public int IdUsuario { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "O id da clínica deve ser maior que 0.")]
    public int IdClinica { get; set; }

    [Required(ErrorMessage = "O id do veterinário é obrigatório.")]
    [Range(1, int.MaxValue, ErrorMessage = "O id do veterinário deve ser maior que 0.")]
    public int IdVeterinario { get; set; }

    [StringLength(20, ErrorMessage = "O CRV deve ter no máximo 20 caracteres.")]
    public string? CRV { get; set; }

    [StringLength(100, ErrorMessage = "A especialidade deve ter no máximo 100 caracteres.")]
    public string? Especialidade { get; set; }
}