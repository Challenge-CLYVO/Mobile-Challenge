using PetCare.Domain.Entities;

namespace PetCare.Application.Interfaces;

public interface ILembreteRepository
{
    Task<IEnumerable<Lembrete>> GetAllAsync();
    Task<Lembrete?> GetByIdAsync(int id);
    Task AddAsync(Lembrete lembrete);
    Task UpdateAsync(Lembrete lembrete);
    Task DeleteAsync(int id);
}