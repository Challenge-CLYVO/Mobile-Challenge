using PetCare.Domain.Entities;

namespace PetCare.Application.Interfaces;

public interface ISensorRepository
{
    Task<IEnumerable<Sensor>> GetAllAsync();
    Task<Sensor?> GetByIdAsync(int id);
    Task AddAsync(Sensor sensor);
    Task UpdateAsync(Sensor sensor);
    Task DeleteAsync(int id);
}