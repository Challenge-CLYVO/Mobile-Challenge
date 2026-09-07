using AutoMapper;
using Microsoft.Extensions.Logging;
using PetCare.Application.DTOs.Responsavel;
using PetCare.Application.Exceptions;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;

namespace PetCare.Application.Services;

public class ResponsavelService : IResponsavelService
{
    private readonly IResponsavelRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<ResponsavelService> _logger;

    public ResponsavelService(
        IResponsavelRepository repository,
        IMapper mapper,
        ILogger<ResponsavelService> logger)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<IEnumerable<ReadResponsavelDto>> GetAllAsync()
    {
        var responsaveis = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ReadResponsavelDto>>(responsaveis);
    }

    public async Task<ReadResponsavelDto?> GetByIdAsync(int id)
    {
        var responsavel = await _repository.GetByIdAsync(id);

        if (responsavel == null)
            throw new NotFoundException("Responsável não encontrado.");

        return _mapper.Map<ReadResponsavelDto>(responsavel);
    }

    public async Task CreateAsync(CreateResponsavelDto dto)
    {
        var responsavel = _mapper.Map<Responsavel>(dto);

        await _repository.AddAsync(responsavel);
    }

    public async Task UpdateAsync(int id, UpdateResponsavelDto dto)
    {
        var responsavel = await _repository.GetByIdAsync(id);

        if (responsavel == null)
            throw new NotFoundException("Responsável não encontrado.");

        _mapper.Map(dto, responsavel);

        await _repository.UpdateAsync(responsavel);
    }

    public async Task DeleteAsync(int id)
    {
        var responsavel = await _repository.GetByIdAsync(id);

        if (responsavel == null)
            throw new NotFoundException("Responsável não encontrado.");

        await _repository.DeleteAsync(id);
    }
}