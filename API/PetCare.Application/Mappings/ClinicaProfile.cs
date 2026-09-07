using AutoMapper;
using PetCare.Application.DTOs.Clinica;
using PetCare.Domain.Entities;

namespace PetCare.Application.Mappings;

public class ClinicaProfile : Profile
{
    public ClinicaProfile()
    {
        CreateMap<Clinica, ReadClinicaDto>();

        CreateMap<CreateClinicaDto, Clinica>();

        CreateMap<UpdateClinicaDto, Clinica>();
    }
}