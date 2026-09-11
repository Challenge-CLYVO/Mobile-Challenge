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

    // =========================================================
    // LOGIN
    // =========================================================

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

    // =========================================================
    // CADASTRO DE USUÁRIO
    // =========================================================

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

    // =========================================================
    // CADASTRO DE VETERINÁRIO
    // =========================================================

    [HttpPost("register-veterinario")]
    public async Task<IActionResult> RegisterVeterinario(
        [FromBody] RegisterVeterinarioDto dto)
    {
        try
        {
            var resultado =
                await _authService.RegisterVeterinarioAsync(
                    dto
                );

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
        catch (InvalidOperationException ex)
        {
            return BadRequest(
                new
                {
                    message = ex.Message
                }
            );
        }
    }
}