using Microsoft.EntityFrameworkCore;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;
using PetCare.Infrastructure.Data;

namespace PetCare.Infrastructure.Repositories;

public class LeituraRepository : ILeituraRepository
{
    private readonly AppDbContext _context;

    public LeituraRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Leitura>> GetAllAsync()
    {
        return await _context.Leituras.ToListAsync();
    }

    public async Task<Leitura?> GetByIdAsync(int id)
    {
        return await _context.Leituras
            .FirstOrDefaultAsync(x => x.IdLeitura == id);
    }

    public async Task AddAsync(Leitura leitura)
    {
        _context.Leituras.Add(leitura);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Leitura leitura)
    {
        _context.Leituras.Update(leitura);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var leitura = await _context.Leituras.FindAsync(id);

        if (leitura != null)
        {
            _context.Leituras.Remove(leitura);
            await _context.SaveChangesAsync();
        }
    }
}