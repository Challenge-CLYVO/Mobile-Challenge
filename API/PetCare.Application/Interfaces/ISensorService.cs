using PetCare.Application.DTOs.Sensor;

namespace PetCare.Application.Interfaces;

public interface ISensorService
{
    Task<IEnumerable<ReadSensorDto>> GetAllAsync();
    Task<ReadSensorDto?> GetByIdAsync(int id);
    Task CreateAsync(CreateSensorDto dto);
    Task UpdateAsync(int id, UpdateSensorDto dto);
    Task DeleteAsync(int id);
}