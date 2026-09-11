using AutoMapper;
using Microsoft.Extensions.Logging;
using PetCare.Application.DTOs.Lembrete;
using PetCare.Application.Exceptions;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;

namespace PetCare.Application.Services;

public class LembreteService : ILembreteService
{
    private readonly ILembreteRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<LembreteService> _logger;

    public LembreteService(
        ILembreteRepository repository,
        IMapper mapper,
        ILogger<LembreteService> logger)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<IEnumerable<ReadLembreteDto>> GetAllAsync()
    {
        var lembretes = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ReadLembreteDto>>(lembretes);
    }

    public async Task<ReadLembreteDto?> GetByIdAsync(int id)
    {
        var lembrete = await _repository.GetByIdAsync(id);

        if (lembrete == null)
            throw new NotFoundException("Lembrete não encontrado.");

        return _mapper.Map<ReadLembreteDto>(lembrete);
    }

    public async Task CreateAsync(CreateLembreteDto dto)
    {
        var lembrete = _mapper.Map<Lembrete>(dto);

        await _repository.AddAsync(lembrete);
    }

    public async Task UpdateAsync(int id, UpdateLembreteDto dto)
    {
        var lembrete = await _repository.GetByIdAsync(id);

        if (lembrete == null)
            throw new NotFoundException("Lembrete não encontrado.");

        _mapper.Map(dto, lembrete);

        await _repository.UpdateAsync(lembrete);
    }

    public async Task DeleteAsync(int id)
    {
        var lembrete = await _repository.GetByIdAsync(id);

        if (lembrete == null)
            throw new NotFoundException("Lembrete não encontrado.");

        await _repository.DeleteAsync(id);
    }
}