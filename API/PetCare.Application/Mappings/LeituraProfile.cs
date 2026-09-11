using AutoMapper;
using PetCare.Application.DTOs.Leitura;
using PetCare.Domain.Entities;

namespace PetCare.Application.Mappings;

public class LeituraProfile : Profile
{
    public LeituraProfile()
    {
        CreateMap<Leitura, ReadLeituraDto>();

        CreateMap<CreateLeituraDto, Leitura>();

        CreateMap<UpdateLeituraDto, Leitura>();
    }
}