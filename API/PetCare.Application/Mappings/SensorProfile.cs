using AutoMapper;
using PetCare.Application.DTOs.Sensor;
using PetCare.Domain.Entities;

namespace PetCare.Application.Mappings;

public class SensorProfile : Profile
{
    public SensorProfile()
    {
        CreateMap<Sensor, ReadSensorDto>();

        CreateMap<CreateSensorDto, Sensor>();

        CreateMap<UpdateSensorDto, Sensor>();
    }
}