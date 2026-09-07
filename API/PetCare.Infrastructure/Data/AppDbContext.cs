using Microsoft.EntityFrameworkCore;
using PetCare.Domain.Entities;

namespace PetCare.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Responsavel> Responsaveis { get; set; }
    public DbSet<Veterinario> Veterinarios { get; set; }
    public DbSet<Clinica> Clinicas { get; set; }
    public DbSet<Pet> Pets { get; set; }
    public DbSet<Vacina> Vacinas { get; set; }
    public DbSet<AplicacaoVacina> AplicacoesVacina { get; set; }
    public DbSet<Consulta> Consultas { get; set; }
    public DbSet<HistoricoSaude> HistoricosSaude { get; set; }
    public DbSet<Lembrete> Lembretes { get; set; }
    public DbSet<Sensor> Sensores { get; set; }
    public DbSet<Leitura> Leituras { get; set; }
    public DbSet<LogErros> LogsErros { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // =====================================================
        // USUARIO
        // =====================================================

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.ToTable("USUARIO");

            entity.HasKey(e => e.IdUsuario);

            entity.Property(e => e.IdUsuario)
                .HasColumnName("ID_USUARIO")
                .ValueGeneratedNever();

            entity.Property(e => e.Nome)
                .HasColumnName("NOME")
                .HasMaxLength(25)
                .IsRequired();

            entity.Property(e => e.Email)
                .HasColumnName("EMAIL")
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.Senha)
                .HasColumnName("SENHA")
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.Telefone)
                .HasColumnName("TELEFONE")
                .HasMaxLength(11)
                .IsRequired();

            entity.Property(e => e.DataCadastro)
                .HasColumnName("DATA_CADASTRO")
                .IsRequired();
        });

        // =====================================================
        // RESPONSAVEL
        // =====================================================

        modelBuilder.Entity<Responsavel>(entity =>
        {
            entity.ToTable("RESPONSAVEL");

            entity.HasKey(e => e.IdResponsavel);

            entity.Property(e => e.IdResponsavel)
                .HasColumnName("ID_RESPONSAVEL")
                .ValueGeneratedNever();

            entity.Property(e => e.IdUsuario)
                .HasColumnName("ID_USUARIO")
                .IsRequired();

            entity.Property(e => e.CPF)
                .HasColumnName("CPF")
                .HasMaxLength(11)
                .IsRequired();

            entity.Property(e => e.DataNascimento)
                .HasColumnName("DATA_NASCIMENTO")
                .IsRequired();

            entity.HasOne(e => e.Usuario)
                .WithOne(u => u.Responsavel)
                .HasForeignKey<Responsavel>(e => e.IdUsuario)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(e => e.Pets)
                .WithOne(p => p.Responsavel)
                .HasForeignKey(p => p.IdResponsavel)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // =====================================================
        // CLINICA
        // =====================================================

        modelBuilder.Entity<Clinica>(entity =>
        {
            entity.ToTable("CLINICA");

            entity.HasKey(e => e.IdClinica);

            entity.Property(e => e.IdClinica)
                .HasColumnName("ID_CLINICA")
                .ValueGeneratedNever();

            entity.Property(e => e.Nome)
                .HasColumnName("NOME")
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(e => e.CNPJ)
                .HasColumnName("CNPJ")
                .HasMaxLength(14)
                .IsRequired();

            entity.Property(e => e.Telefone)
                .HasColumnName("TELEFONE")
                .HasMaxLength(11)
                .IsRequired();

            entity.Property(e => e.Email)
                .HasColumnName("EMAIL")
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.Endereco)
                .HasColumnName("ENDERECO")
                .HasMaxLength(50)
                .IsRequired();
        });

        // =====================================================
        // VETERINARIO
        // =====================================================

        modelBuilder.Entity<Veterinario>(entity =>
        {
            entity.ToTable("VETERINARIO");

            entity.HasKey(e => e.IdVeterinario);

            entity.Property(e => e.IdVeterinario)
                .HasColumnName("ID_VETERINARIO")
                .ValueGeneratedNever();

            entity.Property(e => e.IdUsuario)
                .HasColumnName("ID_USUARIO")
                .IsRequired();

            entity.Property(e => e.IdClinica)
                .HasColumnName("ID_CLINICA")
                .IsRequired();

            entity.Property(e => e.CRV)
                .HasColumnName("CRV")
                .HasMaxLength(20);

            entity.Property(e => e.Especialidade)
                .HasColumnName("ESPECIALIDADE")
                .HasMaxLength(100);

            entity.HasOne(e => e.Usuario)
                .WithMany(u => u.Veterinarios)
                .HasForeignKey(e => e.IdUsuario)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Clinica)
                .WithMany(c => c.Veterinarios)
                .HasForeignKey(e => e.IdClinica)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // =====================================================
        // PET
        // =====================================================

        modelBuilder.Entity<Pet>(entity =>
        {
            entity.ToTable("PET");

            entity.HasKey(e => e.IdPet);

            entity.Property(e => e.IdPet)
                .HasColumnName("ID_PET")
                .ValueGeneratedNever();

            entity.Property(e => e.Nome)
                .HasColumnName("NOME")
                .HasMaxLength(25)
                .IsRequired();

            entity.Property(e => e.Sexo)
                .HasColumnName("SEXO")
                .HasMaxLength(9)
                .IsRequired();

            entity.Property(e => e.Raca)
                .HasColumnName("RACA")
                .HasMaxLength(15)
                .IsRequired();

            entity.Property(e => e.Especie)
                .HasColumnName("ESPECIE")
                .HasMaxLength(15)
                .IsRequired();

            entity.Property(e => e.DataNascimento)
                .HasColumnName("DATA_NASCIMENTO")
                .IsRequired();

            entity.Property(e => e.IdResponsavel)
                .HasColumnName("ID_RESPONSAVEL")
                .IsRequired();

            entity.HasOne(e => e.Responsavel)
                .WithMany(r => r.Pets)
                .HasForeignKey(e => e.IdResponsavel)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // =====================================================
        // VACINA
        // =====================================================

        modelBuilder.Entity<Vacina>(entity =>
        {
            entity.ToTable("VACINA");

            entity.HasKey(e => e.IdVacina);

            entity.Property(e => e.IdVacina)
                .HasColumnName("ID_VACINA")
                .ValueGeneratedNever();

            entity.Property(e => e.Nome)
                .HasColumnName("NOME")
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(e => e.Descricao)
                .HasColumnName("DESCRICAO")
                .HasMaxLength(50);
        });

        // =====================================================
        // APLICACAO_VACINA
        // =====================================================

        modelBuilder.Entity<AplicacaoVacina>(entity =>
        {
            entity.ToTable("APLICACAO_VACINA");

            entity.HasKey(e => e.IdAplicacaoVacina);

            entity.Property(e => e.IdAplicacaoVacina)
                .HasColumnName("ID_APLICACAO_VACINA")
                .ValueGeneratedNever();

            entity.Property(e => e.IdPet)
                .HasColumnName("ID_PET")
                .IsRequired();

            entity.Property(e => e.IdVacina)
                .HasColumnName("ID_VACINA")
                .IsRequired();

            entity.Property(e => e.DataAplicacao)
                .HasColumnName("DATA_APLICACAO")
                .IsRequired();

            entity.Property(e => e.Dose)
                .HasColumnName("DOSE")
                .HasMaxLength(50);

            entity.Property(e => e.Observacao)
                .HasColumnName("OBSERVACAO")
                .HasMaxLength(50);

            entity.Property(e => e.IdVeterinario)
                .HasColumnName("ID_VETERINARIO")
                .IsRequired();

            entity.HasOne(e => e.Pet)
                .WithMany(p => p.AplicacoesVacina)
                .HasForeignKey(e => e.IdPet)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Vacina)
                .WithMany(v => v.AplicacoesVacina)
                .HasForeignKey(e => e.IdVacina)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Veterinario)
                .WithMany(v => v.AplicacoesVacina)
                .HasForeignKey(e => e.IdVeterinario)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // =====================================================
        // CONSULTA
        // =====================================================

        modelBuilder.Entity<Consulta>(entity =>
        {
            entity.ToTable("CONSULTA");

            entity.HasKey(e => e.IdConsulta);

            entity.Property(e => e.IdConsulta)
                .HasColumnName("ID_CONSULTA")
                .ValueGeneratedNever();

            entity.Property(e => e.IdPet)
                .HasColumnName("ID_PET")
                .IsRequired();

            entity.Property(e => e.IdVeterinario)
                .HasColumnName("ID_VETERINARIO")
                .IsRequired();

            entity.Property(e => e.IdClinica)
                .HasColumnName("ID_CLINICA")
                .IsRequired();

            entity.Property(e => e.DataHora)
                .HasColumnName("DATA_HORA")
                .IsRequired();

            entity.Property(e => e.Observacao)
                .HasColumnName("OBSERVACAO")
                .HasMaxLength(50);

            entity.HasOne(e => e.Pet)
                .WithMany(p => p.Consultas)
                .HasForeignKey(e => e.IdPet)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Veterinario)
                .WithMany(v => v.Consultas)
                .HasForeignKey(e => e.IdVeterinario)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Clinica)
                .WithMany(c => c.Consultas)
                .HasForeignKey(e => e.IdClinica)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // =====================================================
        // HISTORICO_SAUDE
        // =====================================================

        modelBuilder.Entity<HistoricoSaude>(entity =>
        {
            entity.ToTable("HISTORICO_SAUDE");

            entity.HasKey(e => e.IdHistorico);

            entity.Property(e => e.IdHistorico)
                .HasColumnName("ID_HISTORICO")
                .ValueGeneratedNever();

            entity.Property(e => e.IdPet)
                .HasColumnName("ID_PET")
                .IsRequired();

            entity.Property(e => e.IdConsulta)
                .HasColumnName("ID_CONSULTA")
                .IsRequired();

            entity.Property(e => e.DataRegistro)
                .HasColumnName("DATA_REGISTRO")
                .IsRequired();

            entity.Property(e => e.Descricao)
                .HasColumnName("DESCRICAO")
                .HasMaxLength(255)
                .IsRequired();

            entity.HasOne(e => e.Pet)
                .WithMany(p => p.HistoricosSaude)
                .HasForeignKey(e => e.IdPet)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Consulta)
                .WithMany(c => c.HistoricosSaude)
                .HasForeignKey(e => e.IdConsulta)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // =====================================================
        // LEMBRETE
        // =====================================================

        modelBuilder.Entity<Lembrete>(entity =>
        {
            entity.ToTable("LEMBRETE");

            entity.HasKey(e => e.IdLembrete);

            entity.Property(e => e.IdLembrete)
                .HasColumnName("ID_LEMBRETE")
                .ValueGeneratedNever();

            entity.Property(e => e.IdPet)
                .HasColumnName("ID_PET")
                .IsRequired();

            entity.Property(e => e.Titulo)
                .HasColumnName("TITULO")
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(e => e.Descricao)
                .HasColumnName("DESCRICAO")
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(e => e.DataHora)
                .HasColumnName("DATA_HORA")
                .IsRequired();

            entity.Property(e => e.Status)
                .HasColumnName("STATUS")
                .HasMaxLength(50)
                .IsRequired();

            entity.HasOne(e => e.Pet)
                .WithMany(p => p.Lembretes)
                .HasForeignKey(e => e.IdPet)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // =====================================================
        // SENSOR
        // =====================================================

        modelBuilder.Entity<Sensor>(entity =>
        {
            entity.ToTable("SENSOR");

            entity.HasKey(e => e.IdSensor);

            entity.Property(e => e.IdSensor)
                .HasColumnName("ID_SENSOR")
                .ValueGeneratedNever();

            entity.Property(e => e.Tipo)
                .HasColumnName("TIPO")
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(e => e.Unidade)
                .HasColumnName("UNIDADE")
                .HasMaxLength(2)
                .IsRequired();

            entity.Property(e => e.Status)
                .HasColumnName("STATUS")
                .HasMaxLength(10)
                .IsRequired();

            entity.Property(e => e.IdPet)
                .HasColumnName("ID_PET")
                .IsRequired();

            entity.HasOne(e => e.Pet)
                .WithMany(p => p.Sensores)
                .HasForeignKey(e => e.IdPet)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // =====================================================
        // LEITURA
        // =====================================================

        modelBuilder.Entity<Leitura>(entity =>
        {
            entity.ToTable("LEITURA");

            entity.HasKey(e => e.IdLeitura);

            entity.Property(e => e.IdLeitura)
                .HasColumnName("ID_LEITURA")
                .ValueGeneratedNever();

            entity.Property(e => e.IdSensor)
                .HasColumnName("ID_SENSOR")
                .IsRequired();

            entity.Property(e => e.DataRegistro)
                .HasColumnName("DATA_REGISTRO")
                .IsRequired();

            entity.Property(e => e.Valor)
                .HasColumnName("VALOR")
                .HasMaxLength(20)
                .IsRequired();

            entity.HasOne(e => e.Sensor)
                .WithMany(s => s.Leituras)
                .HasForeignKey(e => e.IdSensor)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // =====================================================
        // LOG_ERROS
        // =====================================================

        modelBuilder.Entity<LogErros>(entity =>
        {
            entity.ToTable("LOG_ERROS");

            entity.HasKey(e => e.IdLogErro);

            entity.Property(e => e.IdLogErro)
                .HasColumnName("ID_LOG_ERRO")
                .ValueGeneratedOnAdd();

            entity.Property(e => e.NomeProcedure)
                .HasColumnName("NOME_PROCEDURE")
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(e => e.Usuario)
                .HasColumnName("USUARIO")
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(e => e.DataErro)
                .HasColumnName("DATA_ERRO")
                .IsRequired();

            entity.Property(e => e.CodigoErro)
                .HasColumnName("CODIGO_ERRO");

            entity.Property(e => e.MensagemErro)
                .HasColumnName("MENSAGEM_ERRO")
                .HasMaxLength(100)
                .IsRequired();
        });

        base.OnModelCreating(modelBuilder);
    }
}