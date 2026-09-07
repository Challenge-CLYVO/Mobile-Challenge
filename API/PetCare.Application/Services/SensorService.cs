using AutoMapper;
using Microsoft.Extensions.Logging;
using PetCare.Application.DTOs.Sensor;
using PetCare.Application.Exceptions;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;

namespace PetCare.Application.Services;

public class SensorService : ISensorService
{
    private readonly ISensorRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<SensorService> _logger;

    public SensorService(
        ISensorRepository repository,
        IMapper mapper,
        ILogger<SensorService> logger)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<IEnumerable<ReadSensorDto>> GetAllAsync()
    {
        var sensores = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ReadSensorDto>>(sensores);
    }

    public async Task<ReadSensorDto?> GetByIdAsync(int id)
    {
        var sensor = await _repository.GetByIdAsync(id);

        if (sensor == null)
            throw new NotFoundException("Sensor não encontrado.");

        return _mapper.Map<ReadSensorDto>(sensor);
    }

    public async Task CreateAsync(CreateSensorDto dto)
    {
        var sensor = _mapper.Map<Sensor>(dto);

        await _repository.AddAsync(sensor);
    }

    public async Task UpdateAsync(int id, UpdateSensorDto dto)
    {
        var sensor = await _repository.GetByIdAsync(id);

        if (sensor == null)
            throw new NotFoundException("Sensor não encontrado.");

        _mapper.Map(dto, sensor);

        await _repository.UpdateAsync(sensor);
    }

    public async Task DeleteAsync(int id)
    {
        var sensor = await _repository.GetByIdAsync(id);

        if (sensor == null)
            throw new NotFoundException("Sensor não encontrado.");

        await _repository.DeleteAsync(id);
    }
}