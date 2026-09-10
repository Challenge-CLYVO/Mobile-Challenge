using System.ComponentModel.DataAnnotations;

namespace PetCare.Application.DTOs.HistoricoSaude;

public class CreateHistoricoSaudeDto
{
    [Range(
        1,
        int.MaxValue,
        ErrorMessage = "O id do histórico deve ser maior que 0."
    )]
    public int IdHistorico { get; set; }

    [Range(
        1,
        int.MaxValue,
        ErrorMessage = "O id do pet deve ser maior que 0."
    )]
    public int IdPet { get; set; }

    [Range(
        1,
        int.MaxValue,
        ErrorMessage = "O id da consulta deve ser maior que 0."
    )]
    public int IdConsulta { get; set; }

    [Required(
        ErrorMessage = "A data do registro é obrigatória."
    )]
    public DateTime DataRegistro { get; set; }

    [Required(
        ErrorMessage = "A descrição é obrigatória."
    )]
    [StringLength(
        255,
        ErrorMessage = "A descrição deve ter no máximo 255 caracteres."
    )]
    public string Descricao { get; set; } = string.Empty;
}