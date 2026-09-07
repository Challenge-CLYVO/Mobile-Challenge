using PetCare.Domain.Entities;

namespace PetCare.Application.Interfaces;

public interface IVeterinarioRepository
{
    Task<IEnumerable<Veterinario>> GetAllAsync();
    Task<Veterinario?> GetByIdAsync(int id);
    Task AddAsync(Veterinario veterinario);
    Task UpdateAsync(Veterinario veterinario);
    Task DeleteAsync(int id);
}