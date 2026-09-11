using AutoMapper;
using PetCare.Application.DTOs.Veterinario;
using PetCare.Domain.Entities;

namespace PetCare.Application.Mappings;

public class VeterinarioProfile : Profile
{
    public VeterinarioProfile()
    {
        CreateMap<Veterinario, ReadVeterinarioDto>();

        CreateMap<CreateVeterinarioDto, Veterinario>();

        CreateMap<UpdateVeterinarioDto, Veterinario>();
    }
}