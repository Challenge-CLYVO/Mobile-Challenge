using PetCare.Domain.Entities;

namespace PetCare.Application.Interfaces;

public interface IResponsavelRepository
{
    Task<IEnumerable<Responsavel>> GetAllAsync();
    Task<Responsavel?> GetByIdAsync(int id);
    Task AddAsync(Responsavel responsavel);
    Task UpdateAsync(Responsavel responsavel);
    Task DeleteAsync(int id);
}