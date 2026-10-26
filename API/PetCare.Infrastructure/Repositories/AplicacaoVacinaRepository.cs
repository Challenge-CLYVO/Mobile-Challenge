using System.Data;
using Microsoft.EntityFrameworkCore;
using PetCare.Domain.Entities;
using PetCare.Application.Interfaces;
using PetCare.Infrastructure.Data;

namespace PetCare.Infrastructure.Repositories;

public class AplicacaoVacinaRepository : IAplicacaoVacinaRepository
{
    private readonly AppDbContext _context;

    public AplicacaoVacinaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<AplicacaoVacina>> GetAllAsync()
    {
        return await _context.AplicacoesVacina.ToListAsync();
    }

    public async Task<AplicacaoVacina?> GetByIdAsync(int id)
    {
        return await _context.AplicacoesVacina.FindAsync(id);
    }

    public async Task AddAsync(AplicacaoVacina aplicacaoVacina)
    {
        var connection = _context.Database.GetDbConnection();
        var abriuConexao = connection.State != ConnectionState.Open;

        if (abriuConexao)
            await connection.OpenAsync();

        try
        {
            await using var command = connection.CreateCommand();
            command.CommandText =
                "SELECT SEQ_APLICACAO_VACINA.NEXTVAL FROM DUAL";

            var result = await command.ExecuteScalarAsync();

            if (result == null || result == DBNull.Value)
                throw new InvalidOperationException(
                    "Não foi possível gerar o ID da aplicação de vacina."
                );

            aplicacaoVacina.IdAplicacaoVacina = Convert.ToInt32(result);
        }
        finally
        {
            if (abriuConexao)
                await connection.CloseAsync();
        }

        await _context.AplicacoesVacina.AddAsync(aplicacaoVacina);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(AplicacaoVacina aplicacaoVacina)
    {
        _context.AplicacoesVacina.Update(aplicacaoVacina);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var aplicacaoVacina = await GetByIdAsync(id);

        if (aplicacaoVacina != null)
        {
            _context.AplicacoesVacina.Remove(aplicacaoVacina);
            await _context.SaveChangesAsync();
        }
    }
}
