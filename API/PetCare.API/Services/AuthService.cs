using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Microsoft.IdentityModel.Tokens;

using PetCare.Application.DTOs.Auth;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;

namespace PetCare.API.Services;

public class AuthService : IAuthService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IConfiguration _configuration;

    public AuthService(
        IUsuarioRepository usuarioRepository,
        IConfiguration configuration)
    {
        _usuarioRepository = usuarioRepository;
        _configuration = configuration;
    }

    public async Task<object?> LoginAsync(LoginDto dto)
    {
        var usuarios =
            await _usuarioRepository.GetAllAsync();

        var usuario = usuarios.FirstOrDefault(
            u =>
                string.Equals(
                    u.Email.Trim(),
                    dto.Email.Trim(),
                    StringComparison.OrdinalIgnoreCase
                )
        );

        if (usuario == null)
        {
            return null;
        }

        if (usuario.Senha != dto.Senha)
        {
            return null;
        }

        var token = GerarToken(usuario);

        return new
        {
            token,

            usuario = new
            {
                idUsuario = usuario.IdUsuario,
                nome = usuario.Nome,
                email = usuario.Email,
                telefone = usuario.Telefone
            }
        };
    }

    public async Task<object?> RegisterAsync(
        RegisterDto dto)
    {
        var usuarios =
            (await _usuarioRepository.GetAllAsync())
            .ToList();

        var emailExiste = usuarios.Any(
            u =>
                string.Equals(
                    u.Email.Trim(),
                    dto.Email.Trim(),
                    StringComparison.OrdinalIgnoreCase
                )
        );

        if (emailExiste)
        {
            return null;
        }

        var novoId = usuarios.Count == 0
            ? 1
            : usuarios.Max(u => u.IdUsuario) + 1;

        var usuario = new Usuario
        {
            IdUsuario = novoId,
            Nome = dto.Nome.Trim(),
            Email = dto.Email.Trim(),
            Senha = dto.Senha,
            Telefone = dto.Telefone.Trim(),
            DataCadastro = DateTime.UtcNow
        };

        await _usuarioRepository.AddAsync(usuario);

        var token = GerarToken(usuario);

        return new
        {
            token,

            usuario = new
            {
                idUsuario = usuario.IdUsuario,
                nome = usuario.Nome,
                email = usuario.Email,
                telefone = usuario.Telefone
            }
        };
    }

    private string GerarToken(
        Usuario usuario)
    {
        var key =
            _configuration["Jwt:Key"];

        var issuer =
            _configuration["Jwt:Issuer"];

        var audience =
            _configuration["Jwt:Audience"];

        if (string.IsNullOrWhiteSpace(key))
        {
            throw new InvalidOperationException(
                "Chave JWT não configurada."
            );
        }

        var claims = new[]
        {
            new Claim(
                ClaimTypes.NameIdentifier,
                usuario.IdUsuario.ToString()
            ),

            new Claim(
                ClaimTypes.Name,
                usuario.Nome
            ),

            new Claim(
                ClaimTypes.Email,
                usuario.Email
            ),

            new Claim(
                ClaimTypes.Role,
                "User"
            )
        };

        var securityKey =
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key)
            );

        var credentials =
            new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256
            );

        var token =
            new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}