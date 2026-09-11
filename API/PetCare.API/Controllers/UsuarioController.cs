using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using PetCare.Application.DTOs.Usuario;
using PetCare.Application.Interfaces;

namespace PetCare.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioService _service;

    public UsuarioController(
        IUsuarioService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(
            await _service.GetAllAsync()
        );
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
        int id)
    {
        return Ok(
            await _service.GetByIdAsync(id)
        );
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateUsuarioDto dto)
    {
        await _service.CreateAsync(dto);

        return Created("", dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateUsuarioDto dto)
    {
        await _service.UpdateAsync(
            id,
            dto
        );

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(
        int id)
    {
        await _service.DeleteAsync(id);

        return NoContent();
    }
}