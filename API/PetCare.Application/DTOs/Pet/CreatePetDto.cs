using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Pet;

public class CreatePetDto
{
    [Required(ErrorMessage = "O nome do pet é obrigatório.")]
    [StringLength(
        25,
        ErrorMessage = "O nome do pet deve ter no máximo 25 caracteres.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O sexo do pet é obrigatório.")]
    [StringLength(
        9,
        ErrorMessage = "O sexo deve ter no máximo 9 caracteres.")]
    public string Sexo { get; set; } = string.Empty;

    [Required(ErrorMessage = "A raça do pet é obrigatória.")]
    [StringLength(
        15,
        ErrorMessage = "A raça deve ter no máximo 15 caracteres.")]
    public string Raca { get; set; } = string.Empty;

    [Required(ErrorMessage = "A espécie do pet é obrigatória.")]
    [StringLength(
        15,
        ErrorMessage = "A espécie deve ter no máximo 15 caracteres.")]
    public string Especie { get; set; } = string.Empty;

    [Required(ErrorMessage = "A data de nascimento do pet é obrigatória.")]
    public DateTime DataNascimento { get; set; }

    [Required(ErrorMessage = "O id do responsável é obrigatório.")]
    [Range(
        1,
        int.MaxValue,
        ErrorMessage = "O id do responsável deve ser maior que zero.")]
    public int IdResponsavel { get; set; }
}