using Microsoft.EntityFrameworkCore;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;
using PetCare.Infrastructure.Data;

namespace PetCare.Infrastructure.Repositories;

public class ResponsavelRepository : IResponsavelRepository
{
    private readonly AppDbContext _context;

    public ResponsavelRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Responsavel>> GetAllAsync()
    {
        return await _context.Responsaveis.ToListAsync();
    }

    public async Task<Responsavel?> GetByIdAsync(int id)
    {
        return await _context.Responsaveis
            .FirstOrDefaultAsync(x => x.IdResponsavel == id);
    }

    public async Task AddAsync(Responsavel responsavel)
    {
        _context.Responsaveis.Add(responsavel);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Responsavel responsavel)
    {
        _context.Responsaveis.Update(responsavel);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var responsavel = await _context.Responsaveis.FindAsync(id);

        if (responsavel != null)
        {
            _context.Responsaveis.Remove(responsavel);
            await _context.SaveChangesAsync();
        }
    }
}