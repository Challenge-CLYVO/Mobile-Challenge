using PetCare.Application.DTOs.Auth;

namespace PetCare.Application.Interfaces;

public interface IAuthService
{
    Task<object?> LoginAsync(LoginDto dto);

    Task<object?> RegisterAsync(RegisterDto dto);
}