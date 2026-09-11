using PetCare.Application.DTOs.Responsavel;

namespace PetCare.Application.Interfaces;

public interface IResponsavelService
{
    Task<IEnumerable<ReadResponsavelDto>> GetAllAsync();
    Task<ReadResponsavelDto?> GetByIdAsync(int id);
    Task CreateAsync(CreateResponsavelDto dto);
    Task UpdateAsync(int id, UpdateResponsavelDto dto);
    Task DeleteAsync(int id);
}