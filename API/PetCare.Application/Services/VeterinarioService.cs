using AutoMapper;
using Microsoft.Extensions.Logging;
using PetCare.Application.DTOs.Veterinario;
using PetCare.Application.Exceptions;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;

namespace PetCare.Application.Services;

public class VeterinarioService : IVeterinarioService
{
    private readonly IVeterinarioRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<VeterinarioService> _logger;

    public VeterinarioService(
        IVeterinarioRepository repository,
        IMapper mapper,
        ILogger<VeterinarioService> logger)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<IEnumerable<ReadVeterinarioDto>> GetAllAsync()
    {
        var veterinarios = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ReadVeterinarioDto>>(veterinarios);
    }

    public async Task<ReadVeterinarioDto?> GetByIdAsync(int id)
    {
        var veterinario = await _repository.GetByIdAsync(id);

        if (veterinario == null)
            throw new NotFoundException("Veterinário não encontrado.");

        return _mapper.Map<ReadVeterinarioDto>(veterinario);
    }

    public async Task CreateAsync(CreateVeterinarioDto dto)
    {
        var veterinario = _mapper.Map<Veterinario>(dto);

        await _repository.AddAsync(veterinario);
    }

    public async Task UpdateAsync(int id, UpdateVeterinarioDto dto)
    {
        var veterinario = await _repository.GetByIdAsync(id);

        if (veterinario == null)
            throw new NotFoundException("Veterinário não encontrado.");

        _mapper.Map(dto, veterinario);

        await _repository.UpdateAsync(veterinario);
    }

    public async Task DeleteAsync(int id)
    {
        var veterinario = await _repository.GetByIdAsync(id);

        if (veterinario == null)
            throw new NotFoundException("Veterinário não encontrado.");

        await _repository.DeleteAsync(id);
    }
}