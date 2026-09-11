using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Vacina;

public class UpdateVacinaDto
{
    [Required(ErrorMessage = "O nome da vacina é obrigatório.")]
    [StringLength(50, ErrorMessage = "O nome da vacina deve ter no máximo 50 caracteres.")]
    public string Nome { get; set; } = string.Empty;

    [StringLength(50, ErrorMessage = "A descrição deve ter no máximo 50 caracteres.")]
    public string? Descricao { get; set; }
}