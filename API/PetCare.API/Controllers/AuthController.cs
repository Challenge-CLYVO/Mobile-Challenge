using Microsoft.AspNetCore.Mvc;

using PetCare.Application.DTOs.Auth;
using PetCare.Application.Interfaces;

namespace PetCare.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(
        IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] LoginDto dto)
    {
        var resultado =
            await _authService.LoginAsync(dto);

        if (resultado == null)
        {
            return Unauthorized(
                new
                {
                    message =
                        "Email ou senha inválidos."
                }
            );
        }

        return Ok(resultado);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        [FromBody] RegisterDto dto)
    {
        var resultado =
            await _authService.RegisterAsync(dto);

        if (resultado == null)
        {
            return Conflict(
                new
                {
                    message =
                        "Já existe um usuário com este email."
                }
            );
        }

        return Ok(resultado);
    }
}