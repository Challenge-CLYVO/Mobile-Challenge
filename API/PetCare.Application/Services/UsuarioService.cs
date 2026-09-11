using AutoMapper;
using Microsoft.Extensions.Logging;
using PetCare.Application.DTOs.Usuario;
using PetCare.Application.Exceptions;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;

namespace PetCare.Application.Services;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<UsuarioService> _logger;

    public UsuarioService(
        IUsuarioRepository repository,
        IMapper mapper,
        ILogger<UsuarioService> logger)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<IEnumerable<ReadUsuarioDto>> GetAllAsync()
    {
        var usuarios = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ReadUsuarioDto>>(usuarios);
    }

    public async Task<ReadUsuarioDto?> GetByIdAsync(int id)
    {
        var usuario = await _repository.GetByIdAsync(id);

        if (usuario == null)
            throw new NotFoundException("Usuário não encontrado.");

        return _mapper.Map<ReadUsuarioDto>(usuario);
    }

    public async Task CreateAsync(CreateUsuarioDto dto)
    {
        var usuario = _mapper.Map<Usuario>(dto);

        await _repository.AddAsync(usuario);

        _logger.LogInformation(
            "Usuário criado com sucesso. UsuarioId: {UsuarioId}",
            usuario.IdUsuario);
    }

    public async Task UpdateAsync(int id, UpdateUsuarioDto dto)
    {
        var usuario = await _repository.GetByIdAsync(id);

        if (usuario == null)
            throw new NotFoundException("Usuário não encontrado.");

        _mapper.Map(dto, usuario);

        await _repository.UpdateAsync(usuario);
    }

    public async Task DeleteAsync(int id)
    {
        var usuario = await _repository.GetByIdAsync(id);

        if (usuario == null)
            throw new NotFoundException("Usuário não encontrado.");

        await _repository.DeleteAsync(id);
    }
}