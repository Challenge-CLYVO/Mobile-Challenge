using AutoMapper;
using PetCare.Application.DTOs.Responsavel;
using PetCare.Domain.Entities;

namespace PetCare.Application.Mappings;

public class ResponsavelProfile : Profile
{
    public ResponsavelProfile()
    {
        CreateMap<Responsavel, ReadResponsavelDto>();

        CreateMap<CreateResponsavelDto, Responsavel>();

        CreateMap<UpdateResponsavelDto, Responsavel>();
    }
}