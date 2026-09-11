using PetCare.Application.DTOs.Usuario;

namespace PetCare.Application.Interfaces;

public interface IUsuarioService
{
    Task<IEnumerable<ReadUsuarioDto>> GetAllAsync();
    Task<ReadUsuarioDto?> GetByIdAsync(int id);
    Task CreateAsync(CreateUsuarioDto dto);
    Task UpdateAsync(int id, UpdateUsuarioDto dto);
    Task DeleteAsync(int id);
}