using Microsoft.EntityFrameworkCore;
using PetCare.Application.Interfaces;
using PetCare.Domain.Entities;
using PetCare.Infrastructure.Data;

namespace PetCare.Infrastructure.Repositories;

public class SensorRepository : ISensorRepository
{
    private readonly AppDbContext _context;

    public SensorRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Sensor>> GetAllAsync()
    {
        return await _context.Sensores.ToListAsync();
    }

    public async Task<Sensor?> GetByIdAsync(int id)
    {
        return await _context.Sensores
            .FirstOrDefaultAsync(x => x.IdSensor == id);
    }

    public async Task AddAsync(Sensor sensor)
    {
        _context.Sensores.Add(sensor);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Sensor sensor)
    {
        _context.Sensores.Update(sensor);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var sensor = await _context.Sensores.FindAsync(id);

        if (sensor != null)
        {
            _context.Sensores.Remove(sensor);
            await _context.SaveChangesAsync();
        }
    }
}