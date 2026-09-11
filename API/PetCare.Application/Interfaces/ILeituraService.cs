using PetCare.Application.DTOs.Leitura;

namespace PetCare.Application.Interfaces;

public interface ILeituraService
{
    Task<IEnumerable<ReadLeituraDto>> GetAllAsync();
    Task<ReadLeituraDto?> GetByIdAsync(int id);
    Task CreateAsync(CreateLeituraDto dto);
    Task UpdateAsync(int id, UpdateLeituraDto dto);
    Task DeleteAsync(int id);
}