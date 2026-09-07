using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Sensor;

public class UpdateSensorDto
{
    [Required(ErrorMessage = "O tipo do sensor é obrigatório.")]
    [StringLength(50, ErrorMessage = "O tipo do sensor deve ter no máximo 50 caracteres.")]
    public string Tipo { get; set; } = string.Empty;

    [Required(ErrorMessage = "A unidade do sensor é obrigatória.")]
    [StringLength(2, ErrorMessage = "A unidade deve ter no máximo 2 caracteres.")]
    public string Unidade { get; set; } = string.Empty;

    [Required(ErrorMessage = "O status do sensor é obrigatório.")]
    [StringLength(10, ErrorMessage = "O status deve ter no máximo 10 caracteres.")]
    public string Status { get; set; } = string.Empty;

    [Range(1, int.MaxValue, ErrorMessage = "O id do pet deve ser maior que 0.")]
    public int IdPet { get; set; }
}