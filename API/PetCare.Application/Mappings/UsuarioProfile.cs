using AutoMapper;
using PetCare.Application.DTOs.Usuario;
using PetCare.Domain.Entities;

namespace PetCare.Application.Mappings;

public class UsuarioProfile : Profile
{
    public UsuarioProfile()
    {
        CreateMap<Usuario, ReadUsuarioDto>();

        CreateMap<CreateUsuarioDto, Usuario>();

        CreateMap<UpdateUsuarioDto, Usuario>();
    }
}