using AutoMapper;
using Microsoft.Extensions.Logging;
using PetCare.Application.DTOs.Leitura;
using PetCare.Application.Exceptions;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;

namespace PetCare.Application.Services;

public class LeituraService : ILeituraService
{
    private readonly ILeituraRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<LeituraService> _logger;

    public LeituraService(
        ILeituraRepository repository,
        IMapper mapper,
        ILogger<LeituraService> logger)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<IEnumerable<ReadLeituraDto>> GetAllAsync()
    {
        var leituras = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ReadLeituraDto>>(leituras);
    }

    public async Task<ReadLeituraDto?> GetByIdAsync(int id)
    {
        var leitura = await _repository.GetByIdAsync(id);

        if (leitura == null)
            throw new NotFoundException("Leitura não encontrada.");

        return _mapper.Map<ReadLeituraDto>(leitura);
    }

    public async Task CreateAsync(CreateLeituraDto dto)
    {
        var leitura = _mapper.Map<Leitura>(dto);

        await _repository.AddAsync(leitura);
    }

    public async Task UpdateAsync(int id, UpdateLeituraDto dto)
    {
        var leitura = await _repository.GetByIdAsync(id);

        if (leitura == null)
            throw new NotFoundException("Leitura não encontrada.");

        _mapper.Map(dto, leitura);

        await _repository.UpdateAsync(leitura);
    }

    public async Task DeleteAsync(int id)
    {
        var leitura = await _repository.GetByIdAsync(id);

        if (leitura == null)
            throw new NotFoundException("Leitura não encontrada.");

        await _repository.DeleteAsync(id);
    }
}