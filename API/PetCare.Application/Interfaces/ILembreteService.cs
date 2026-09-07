using PetCare.Application.DTOs.Lembrete;

namespace PetCare.Application.Interfaces;

public interface ILembreteService
{
    Task<IEnumerable<ReadLembreteDto>> GetAllAsync();
    Task<ReadLembreteDto?> GetByIdAsync(int id);
    Task CreateAsync(CreateLembreteDto dto);
    Task UpdateAsync(int id, UpdateLembreteDto dto);
    Task DeleteAsync(int id);
}