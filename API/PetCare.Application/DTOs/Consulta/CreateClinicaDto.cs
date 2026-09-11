using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.Consulta;

public class CreateConsultaDto
{
    [Range(1, int.MaxValue, ErrorMessage = "O id do pet deve ser maior que 0.")]
    public int IdPet { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "O id do veterinário deve ser maior que 0.")]
    public int IdVeterinario { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "O id da clínica deve ser maior que 0.")]
    public int IdClinica { get; set; }

    [Required(ErrorMessage = "O id da consulta é obrigatório.")]
    [Range(1, int.MaxValue, ErrorMessage = "O id da consulta deve ser maior que 0.")]
    public int IdConsulta { get; set; }

    [Required(ErrorMessage = "A data e hora da consulta são obrigatórias.")]
    public DateTime DataHora { get; set; }

    [StringLength(50, ErrorMessage = "A observação deve ter no máximo 50 caracteres.")]
    public string? Observacao { get; set; }
}