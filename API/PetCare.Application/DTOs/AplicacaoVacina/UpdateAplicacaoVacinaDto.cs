using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.AplicacaoVacina;

public class UpdateAplicacaoVacinaDto
{
    [Range(1, int.MaxValue, ErrorMessage = "O id do pet deve ser maior que 0.")]
    public int IdPet { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "O id da vacina deve ser maior que 0.")]
    public int IdVacina { get; set; }

    [Required(ErrorMessage = "A data da aplicação é obrigatória.")]
    public DateTime DataAplicacao { get; set; }

    [StringLength(50, ErrorMessage = "A dose deve ter no máximo 50 caracteres.")]
    public string? Dose { get; set; }

    [StringLength(50, ErrorMessage = "A observação deve ter no máximo 50 caracteres.")]
    public string? Observacao { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "O id do veterinário deve ser maior que 0.")]
    public int IdVeterinario { get; set; }
}