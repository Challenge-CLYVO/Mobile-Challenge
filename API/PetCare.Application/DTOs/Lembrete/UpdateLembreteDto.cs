using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Lembrete;

public class UpdateLembreteDto
{
    [Range(1, int.MaxValue, ErrorMessage = "O id do pet deve ser maior que 0.")]
    public int IdPet { get; set; }

    [Required(ErrorMessage = "O título do lembrete é obrigatório.")]
    [StringLength(50, ErrorMessage = "O título deve ter no máximo 50 caracteres.")]
    public string Titulo { get; set; } = string.Empty;

    [Required(ErrorMessage = "A descrição do lembrete é obrigatória.")]
    [StringLength(50, ErrorMessage = "A descrição deve ter no máximo 50 caracteres.")]
    public string Descricao { get; set; } = string.Empty;

    [Required(ErrorMessage = "A data e hora do lembrete são obrigatórias.")]
    public DateTime DataHora { get; set; }

    [Required(ErrorMessage = "O status do lembrete é obrigatório.")]
    [StringLength(50, ErrorMessage = "O status deve ter no máximo 50 caracteres.")]
    public string Status { get; set; } = string.Empty;
}