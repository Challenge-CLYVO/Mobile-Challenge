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
    private readonly IResponsavelRepository _responsavelRepository;
    private readonly IVeterinarioRepository _veterinarioRepository;
    private readonly IClinicaRepository _clinicaRepository;
    private readonly IConfiguration _configuration;

    public AuthService(
        IUsuarioRepository usuarioRepository,
        IResponsavelRepository responsavelRepository,
        IVeterinarioRepository veterinarioRepository,
        IClinicaRepository clinicaRepository,
        IConfiguration configuration)
    {
        _usuarioRepository = usuarioRepository;
        _responsavelRepository = responsavelRepository;
        _veterinarioRepository = veterinarioRepository;
        _clinicaRepository = clinicaRepository;
        _configuration = configuration;
    }

    // =========================================================
    // LOGIN
    // =========================================================

    public async Task<object?> LoginAsync(LoginDto dto)
    {
        var usuarios =
            (await _usuarioRepository.GetAllAsync())
            .ToList();

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

        var veterinarios =
            (await _veterinarioRepository.GetAllAsync())
            .ToList();

        var veterinario =
            veterinarios.FirstOrDefault(
                v => v.IdUsuario == usuario.IdUsuario
            );

        var responsaveis =
            (await _responsavelRepository.GetAllAsync())
            .ToList();

        var responsavel =
            responsaveis.FirstOrDefault(
                r => r.IdUsuario == usuario.IdUsuario
            );

        bool isVeterinario =
            veterinario != null;

        string role =
            isVeterinario
                ? "Veterinario"
                : "User";

        var token =
            GerarToken(
                usuario,
                role
            );

        return new
        {
            token,

            usuario = new
            {
                idUsuario = usuario.IdUsuario,
                nome = usuario.Nome,
                email = usuario.Email,
                telefone = usuario.Telefone,

                role,

                isVeterinario,

                idResponsavel =
                    responsavel?.IdResponsavel,

                idVeterinario =
                    veterinario?.IdVeterinario,

                idClinica =
                    veterinario?.IdClinica
            }
        };
    }

    // =========================================================
    // CADASTRO DE USUÁRIO
    // =========================================================

    public async Task<object?> RegisterAsync(
        RegisterDto dto)
    {
        var usuarios =
            (await _usuarioRepository.GetAllAsync())
            .ToList();

        var emailExiste =
            usuarios.Any(
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

        var novoIdUsuario =
            usuarios.Count == 0
                ? 1
                : usuarios.Max(
                    u => u.IdUsuario
                ) + 1;

        var usuario =
            new Usuario
            {
                IdUsuario = novoIdUsuario,
                Nome = dto.Nome.Trim(),
                Email = dto.Email.Trim(),
                Senha = dto.Senha,
                Telefone =
                    dto.Telefone.Trim(),
                DataCadastro =
                    DateTime.UtcNow
            };

        await _usuarioRepository.AddAsync(
            usuario
        );

        // -----------------------------------------------------
        // Cria automaticamente o RESPONSAVEL
        // -----------------------------------------------------

        var responsaveis =
            (await _responsavelRepository.GetAllAsync())
            .ToList();

        var novoIdResponsavel =
            responsaveis.Count == 0
                ? 1
                : responsaveis.Max(
                    r => r.IdResponsavel
                ) + 1;

        var responsavel =
            new Responsavel
            {
                IdResponsavel =
                    novoIdResponsavel,

                IdUsuario =
                    usuario.IdUsuario,

                CPF =
                    dto.CPF.Trim(),

                DataNascimento =
                    dto.DataNascimento
            };

        await _responsavelRepository.AddAsync(
            responsavel
        );

        var token =
            GerarToken(
                usuario,
                "User"
            );

        return new
        {
            token,

            usuario = new
            {
                idUsuario =
                    usuario.IdUsuario,

                nome =
                    usuario.Nome,

                email =
                    usuario.Email,

                telefone =
                    usuario.Telefone,

                role = "User",

                isVeterinario = false,

                idResponsavel =
                    responsavel.IdResponsavel,

                idVeterinario =
                    (int?)null,

                idClinica =
                    (int?)null
            }
        };
    }

    // =========================================================
    // CADASTRO DE VETERINÁRIO
    // =========================================================

    public async Task<object?> RegisterVeterinarioAsync(
        RegisterVeterinarioDto dto)
    {
        var usuarios =
            (await _usuarioRepository.GetAllAsync())
            .ToList();

        // -----------------------------------------------------
        // Verifica email
        // -----------------------------------------------------

        var emailExiste =
            usuarios.Any(
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

        // -----------------------------------------------------
        // Procura uma clínica existente
        // -----------------------------------------------------

        var clinicas =
            (await _clinicaRepository.GetAllAsync())
            .ToList();

        if (clinicas.Count == 0)
        {
            throw new InvalidOperationException(
                "Não existe nenhuma clínica cadastrada."
            );
        }

        // Usa a primeira clínica cadastrada.
        var clinica =
            clinicas
                .OrderBy(c => c.IdClinica)
                .First();

        // -----------------------------------------------------
        // Cria usuário
        // -----------------------------------------------------

        var novoIdUsuario =
            usuarios.Count == 0
                ? 1
                : usuarios.Max(
                    u => u.IdUsuario
                ) + 1;

        var usuario =
            new Usuario
            {
                IdUsuario =
                    novoIdUsuario,

                Nome =
                    dto.Nome.Trim(),

                Email =
                    dto.Email.Trim(),

                Senha =
                    dto.Senha,

                Telefone =
                    dto.Telefone.Trim(),

                DataCadastro =
                    DateTime.UtcNow
            };

        await _usuarioRepository.AddAsync(
            usuario
        );

        // -----------------------------------------------------
        // Cria veterinário
        // -----------------------------------------------------

        var veterinarios =
            (await _veterinarioRepository.GetAllAsync())
            .ToList();

        var novoIdVeterinario =
            veterinarios.Count == 0
                ? 1
                : veterinarios.Max(
                    v => v.IdVeterinario
                ) + 1;

        var veterinario =
            new Veterinario
            {
                IdVeterinario =
                    novoIdVeterinario,

                IdUsuario =
                    usuario.IdUsuario,

                IdClinica =
                    clinica.IdClinica,

                CRV =
                    string.IsNullOrWhiteSpace(dto.CRV)
                        ? null
                        : dto.CRV.Trim(),

                Especialidade =
                    string.IsNullOrWhiteSpace(
                        dto.Especialidade
                    )
                        ? null
                        : dto.Especialidade.Trim()
            };

        await _veterinarioRepository.AddAsync(
            veterinario
        );

        // -----------------------------------------------------
        // Token
        // -----------------------------------------------------

        var token =
            GerarToken(
                usuario,
                "Veterinario"
            );

        return new
        {
            token,

            usuario = new
            {
                idUsuario =
                    usuario.IdUsuario,

                nome =
                    usuario.Nome,

                email =
                    usuario.Email,

                telefone =
                    usuario.Telefone,

                role = "Veterinario",

                isVeterinario = true,

                idResponsavel =
                    (int?)null,

                idVeterinario =
                    veterinario.IdVeterinario,

                idClinica =
                    veterinario.IdClinica
            }
        };
    }

    // =========================================================
    // JWT
    // =========================================================

    private string GerarToken(
        Usuario usuario,
        string role)
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

        var claims =
            new[]
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
                    role
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
                expires:
                    DateTime.UtcNow.AddHours(8),
                signingCredentials:
                    credentials
            );

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}