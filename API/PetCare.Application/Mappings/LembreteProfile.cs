using AutoMapper;
using PetCare.Application.DTOs.Lembrete;
using PetCare.Domain.Entities;

namespace PetCare.Application.Mappings;

public class LembreteProfile : Profile
{
    public LembreteProfile()
    {
        CreateMap<Lembrete, ReadLembreteDto>();

        CreateMap<CreateLembreteDto, Lembrete>();

        CreateMap<UpdateLembreteDto, Lembrete>();
    }
}