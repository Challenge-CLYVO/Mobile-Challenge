using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetCare.Application.DTOs.Pet;
using PetCare.Application.Interfaces;

namespace PetCare.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PetController : ControllerBase
{
    private readonly IPetService _service;

    public PetController(IPetService service)
    {
        _service = service;
    }

    /// <summary>
    /// Retorna todos os pets cadastrados.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var pets = await _service.GetAllAsync();

        return Ok(pets);
    }

    /// <summary>
    /// Busca um pet pelo ID.
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var pet = await _service.GetByIdAsync(id);

        return Ok(pet);
    }

    /// <summary>
    /// Cria um novo pet.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreatePetDto dto)
    {
        var pet = await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = pet.IdPet },
            pet);
    }

    /// <summary>
    /// Atualiza um pet existente.
    /// </summary>
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] UpdatePetDto dto)
    {
        await _service.UpdateAsync(id, dto);

        return NoContent();
    }

    /// <summary>
    /// Remove um pet.
    /// </summary>
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);

        return NoContent();
    }
}