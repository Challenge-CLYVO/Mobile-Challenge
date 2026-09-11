using Microsoft.EntityFrameworkCore;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;
using PetCare.Infrastructure.Data;

namespace PetCare.Infrastructure.Repositories;

public class LembreteRepository : ILembreteRepository
{
    private readonly AppDbContext _context;

    public LembreteRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Lembrete>> GetAllAsync()
    {
        return await _context.Lembretes.ToListAsync();
    }

    public async Task<Lembrete?> GetByIdAsync(int id)
    {
        return await _context.Lembretes
            .FirstOrDefaultAsync(x => x.IdLembrete == id);
    }

    public async Task AddAsync(Lembrete lembrete)
    {
        _context.Lembretes.Add(lembrete);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Lembrete lembrete)
    {
        _context.Lembretes.Update(lembrete);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var lembrete = await _context.Lembretes.FindAsync(id);

        if (lembrete != null)
        {
            _context.Lembretes.Remove(lembrete);
            await _context.SaveChangesAsync();
        }
    }
}