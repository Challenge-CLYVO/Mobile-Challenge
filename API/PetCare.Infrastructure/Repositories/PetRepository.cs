using System.Data;
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
        var connection = _context.Database.GetDbConnection();
        var abriuConexao = connection.State != ConnectionState.Open;

        if (abriuConexao)
            await connection.OpenAsync();

        try
        {
            await using var command = connection.CreateCommand();
            command.CommandText = "SELECT SEQ_PET.NEXTVAL FROM DUAL";

            var result = await command.ExecuteScalarAsync();

            if (result == null || result == DBNull.Value)
                throw new InvalidOperationException(
                    "Não foi possível gerar o ID do pet."
                );

            pet.IdPet = Convert.ToInt32(result);
        }
        finally
        {
            if (abriuConexao)
                await connection.CloseAsync();
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
