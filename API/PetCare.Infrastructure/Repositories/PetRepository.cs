using Microsoft.EntityFrameworkCore;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;
using PetCare.Infrastructure.Data;

namespace PetCare.Infrastructure.Repositories;

public class PetRepository : IPetRepository
{
    private readonly AppDbContext _context;

    public PetRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Pet>> GetAllAsync()
    {
        return await _context.Pets
            .Include(p => p.Responsavel)
            .ThenInclude(r => r.Usuario)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Pet?> GetByIdAsync(int id)
    {
        return await _context.Pets
            .Include(p => p.Responsavel)
            .ThenInclude(r => r.Usuario)
            .FirstOrDefaultAsync(p => p.IdPet == id);
    }

    public async Task AddAsync(Pet pet)
    {
        // O modelo atual utiliza IDs manuais.
        // Se o ID não foi informado, gera o próximo ID disponível.
        if (pet.IdPet <= 0)
        {
            var ultimoId = await _context.Pets
                .Select(p => (int?)p.IdPet)
                .MaxAsync() ?? 0;

            pet.IdPet = ultimoId + 1;
        }

        _context.Pets.Add(pet);

        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Pet pet)
    {
        _context.Pets.Update(pet);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var pet = await _context.Pets
            .FirstOrDefaultAsync(p => p.IdPet == id);

        if (pet == null)
            return;

        _context.Pets.Remove(pet);

        await _context.SaveChangesAsync();
    }
}