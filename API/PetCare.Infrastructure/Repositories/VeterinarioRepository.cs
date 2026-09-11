using Microsoft.EntityFrameworkCore;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;
using PetCare.Infrastructure.Data;

namespace PetCare.Infrastructure.Repositories;

public class VeterinarioRepository : IVeterinarioRepository
{
    private readonly AppDbContext _context;

    public VeterinarioRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Veterinario>> GetAllAsync()
    {
        return await _context.Veterinarios.ToListAsync();
    }

    public async Task<Veterinario?> GetByIdAsync(int id)
    {
        return await _context.Veterinarios
            .FirstOrDefaultAsync(x => x.IdVeterinario == id);
    }

    public async Task AddAsync(Veterinario veterinario)
    {
        _context.Veterinarios.Add(veterinario);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Veterinario veterinario)
    {
        _context.Veterinarios.Update(veterinario);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var veterinario = await _context.Veterinarios.FindAsync(id);

        if (veterinario != null)
        {
            _context.Veterinarios.Remove(veterinario);
            await _context.SaveChangesAsync();
        }
    }
}