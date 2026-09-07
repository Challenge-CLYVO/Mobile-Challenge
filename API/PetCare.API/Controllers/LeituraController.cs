using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetCare.Application.DTOs.Leitura;
using PetCare.Application.Interfaces;

namespace PetCare.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class LeituraController : ControllerBase
{
    private readonly ILeituraService _service;

    public LeituraController(ILeituraService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateLeituraDto dto)
    {
        await _service.CreateAsync(dto);
        return Created("", dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateLeituraDto dto)
    {
        await _service.UpdateAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}