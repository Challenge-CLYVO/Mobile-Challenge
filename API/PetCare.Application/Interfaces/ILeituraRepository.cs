using PetCare.Domain.Entities;

namespace PetCare.Application.Interfaces;

public interface ILeituraRepository
{
    Task<IEnumerable<Leitura>> GetAllAsync();
    Task<Leitura?> GetByIdAsync(int id);
    Task AddAsync(Leitura leitura);
    Task UpdateAsync(Leitura leitura);
    Task DeleteAsync(int id);
}