using PetCare.Application.DTOs.Veterinario;

namespace PetCare.Application.Interfaces;

public interface IVeterinarioService
{
    Task<IEnumerable<ReadVeterinarioDto>> GetAllAsync();
    Task<ReadVeterinarioDto?> GetByIdAsync(int id);
    Task CreateAsync(CreateVeterinarioDto dto);
    Task UpdateAsync(int id, UpdateVeterinarioDto dto);
    Task DeleteAsync(int id);
}