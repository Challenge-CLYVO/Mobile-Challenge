using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetCare.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CLINICA",
                columns: table => new
                {
                    ID_CLINICA = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    NOME = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: false),
                    CNPJ = table.Column<string>(type: "NVARCHAR2(14)", maxLength: 14, nullable: false),
                    TELEFONE = table.Column<string>(type: "NVARCHAR2(11)", maxLength: 11, nullable: false),
                    EMAIL = table.Column<string>(type: "NVARCHAR2(255)", maxLength: 255, nullable: false),
                    ENDERECO = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CLINICA", x => x.ID_CLINICA);
                });

            migrationBuilder.CreateTable(
                name: "LOG_ERROS",
                columns: table => new
                {
                    ID_LOG_ERRO = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    NOME_PROCEDURE = table.Column<string>(type: "NVARCHAR2(100)", maxLength: 100, nullable: false),
                    USUARIO = table.Column<string>(type: "NVARCHAR2(100)", maxLength: 100, nullable: false),
                    DATA_ERRO = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    CODIGO_ERRO = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    MENSAGEM_ERRO = table.Column<string>(type: "NVARCHAR2(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LOG_ERROS", x => x.ID_LOG_ERRO);
                });

            migrationBuilder.CreateTable(
                name: "USUARIO",
                columns: table => new
                {
                    ID_USUARIO = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    NOME = table.Column<string>(type: "NVARCHAR2(25)", maxLength: 25, nullable: false),
                    EMAIL = table.Column<string>(type: "NVARCHAR2(255)", maxLength: 255, nullable: false),
                    SENHA = table.Column<string>(type: "NVARCHAR2(255)", maxLength: 255, nullable: false),
                    TELEFONE = table.Column<string>(type: "NVARCHAR2(11)", maxLength: 11, nullable: false),
                    DATA_CADASTRO = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USUARIO", x => x.ID_USUARIO);
                });

            migrationBuilder.CreateTable(
                name: "VACINA",
                columns: table => new
                {
                    ID_VACINA = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    NOME = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: false),
                    DESCRICAO = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VACINA", x => x.ID_VACINA);
                });

            migrationBuilder.CreateTable(
                name: "RESPONSAVEL",
                columns: table => new
                {
                    ID_RESPONSAVEL = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_USUARIO = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CPF = table.Column<string>(type: "NVARCHAR2(11)", maxLength: 11, nullable: false),
                    DATA_NASCIMENTO = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RESPONSAVEL", x => x.ID_RESPONSAVEL);
                    table.ForeignKey(
                        name: "FK_RESPONSAVEL_USUARIO_ID_USUARIO",
                        column: x => x.ID_USUARIO,
                        principalTable: "USUARIO",
                        principalColumn: "ID_USUARIO",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VETERINARIO",
                columns: table => new
                {
                    ID_VETERINARIO = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_USUARIO = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_CLINICA = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CRV = table.Column<string>(type: "NVARCHAR2(20)", maxLength: 20, nullable: true),
                    ESPECIALIDADE = table.Column<string>(type: "NVARCHAR2(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VETERINARIO", x => x.ID_VETERINARIO);
                    table.ForeignKey(
                        name: "FK_VETERINARIO_CLINICA_ID_CLINICA",
                        column: x => x.ID_CLINICA,
                        principalTable: "CLINICA",
                        principalColumn: "ID_CLINICA",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VETERINARIO_USUARIO_ID_USUARIO",
                        column: x => x.ID_USUARIO,
                        principalTable: "USUARIO",
                        principalColumn: "ID_USUARIO",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PET",
                columns: table => new
                {
                    ID_PET = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    NOME = table.Column<string>(type: "NVARCHAR2(25)", maxLength: 25, nullable: false),
                    SEXO = table.Column<string>(type: "NVARCHAR2(9)", maxLength: 9, nullable: false),
                    RACA = table.Column<string>(type: "NVARCHAR2(15)", maxLength: 15, nullable: false),
                    ESPECIE = table.Column<string>(type: "NVARCHAR2(15)", maxLength: 15, nullable: false),
                    DATA_NASCIMENTO = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    ID_RESPONSAVEL = table.Column<int>(type: "NUMBER(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PET", x => x.ID_PET);
                    table.ForeignKey(
                        name: "FK_PET_RESPONSAVEL_ID_RESPONSAVEL",
                        column: x => x.ID_RESPONSAVEL,
                        principalTable: "RESPONSAVEL",
                        principalColumn: "ID_RESPONSAVEL",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "APLICACAO_VACINA",
                columns: table => new
                {
                    ID_APLICACAO_VACINA = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_PET = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_VACINA = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DATA_APLICACAO = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    DOSE = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: true),
                    OBSERVACAO = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: true),
                    ID_VETERINARIO = table.Column<int>(type: "NUMBER(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_APLICACAO_VACINA", x => x.ID_APLICACAO_VACINA);
                    table.ForeignKey(
                        name: "FK_APLICACAO_VACINA_PET_ID_PET",
                        column: x => x.ID_PET,
                        principalTable: "PET",
                        principalColumn: "ID_PET",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_APLICACAO_VACINA_VACINA_ID_VACINA",
                        column: x => x.ID_VACINA,
                        principalTable: "VACINA",
                        principalColumn: "ID_VACINA",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_APLICACAO_VACINA_VETERINARIO_ID_VETERINARIO",
                        column: x => x.ID_VETERINARIO,
                        principalTable: "VETERINARIO",
                        principalColumn: "ID_VETERINARIO",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CONSULTA",
                columns: table => new
                {
                    ID_CONSULTA = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_PET = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_VETERINARIO = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_CLINICA = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DATA_HORA = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    OBSERVACAO = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CONSULTA", x => x.ID_CONSULTA);
                    table.ForeignKey(
                        name: "FK_CONSULTA_CLINICA_ID_CLINICA",
                        column: x => x.ID_CLINICA,
                        principalTable: "CLINICA",
                        principalColumn: "ID_CLINICA",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CONSULTA_PET_ID_PET",
                        column: x => x.ID_PET,
                        principalTable: "PET",
                        principalColumn: "ID_PET",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CONSULTA_VETERINARIO_ID_VETERINARIO",
                        column: x => x.ID_VETERINARIO,
                        principalTable: "VETERINARIO",
                        principalColumn: "ID_VETERINARIO",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LEMBRETE",
                columns: table => new
                {
                    ID_LEMBRETE = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_PET = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    TITULO = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: false),
                    DESCRICAO = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: false),
                    DATA_HORA = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    STATUS = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LEMBRETE", x => x.ID_LEMBRETE);
                    table.ForeignKey(
                        name: "FK_LEMBRETE_PET_ID_PET",
                        column: x => x.ID_PET,
                        principalTable: "PET",
                        principalColumn: "ID_PET",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SENSOR",
                columns: table => new
                {
                    ID_SENSOR = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    TIPO = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: false),
                    UNIDADE = table.Column<string>(type: "NVARCHAR2(2)", maxLength: 2, nullable: false),
                    STATUS = table.Column<string>(type: "NVARCHAR2(10)", maxLength: 10, nullable: false),
                    ID_PET = table.Column<int>(type: "NUMBER(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SENSOR", x => x.ID_SENSOR);
                    table.ForeignKey(
                        name: "FK_SENSOR_PET_ID_PET",
                        column: x => x.ID_PET,
                        principalTable: "PET",
                        principalColumn: "ID_PET",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HISTORICO_SAUDE",
                columns: table => new
                {
                    ID_HISTORICO = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_PET = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_CONSULTA = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DATA_REGISTRO = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    DESCRICAO = table.Column<string>(type: "NVARCHAR2(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HISTORICO_SAUDE", x => x.ID_HISTORICO);
                    table.ForeignKey(
                        name: "FK_HISTORICO_SAUDE_CONSULTA_ID_CONSULTA",
                        column: x => x.ID_CONSULTA,
                        principalTable: "CONSULTA",
                        principalColumn: "ID_CONSULTA",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HISTORICO_SAUDE_PET_ID_PET",
                        column: x => x.ID_PET,
                        principalTable: "PET",
                        principalColumn: "ID_PET",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LEITURA",
                columns: table => new
                {
                    ID_LEITURA = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ID_SENSOR = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DATA_REGISTRO = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    VALOR = table.Column<string>(type: "NVARCHAR2(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LEITURA", x => x.ID_LEITURA);
                    table.ForeignKey(
                        name: "FK_LEITURA_SENSOR_ID_SENSOR",
                        column: x => x.ID_SENSOR,
                        principalTable: "SENSOR",
                        principalColumn: "ID_SENSOR",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_APLICACAO_VACINA_ID_PET",
                table: "APLICACAO_VACINA",
                column: "ID_PET");

            migrationBuilder.CreateIndex(
                name: "IX_APLICACAO_VACINA_ID_VACINA",
                table: "APLICACAO_VACINA",
                column: "ID_VACINA");

            migrationBuilder.CreateIndex(
                name: "IX_APLICACAO_VACINA_ID_VETERINARIO",
                table: "APLICACAO_VACINA",
                column: "ID_VETERINARIO");

            migrationBuilder.CreateIndex(
                name: "IX_CONSULTA_ID_CLINICA",
                table: "CONSULTA",
                column: "ID_CLINICA");

            migrationBuilder.CreateIndex(
                name: "IX_CONSULTA_ID_PET",
                table: "CONSULTA",
                column: "ID_PET");

            migrationBuilder.CreateIndex(
                name: "IX_CONSULTA_ID_VETERINARIO",
                table: "CONSULTA",
                column: "ID_VETERINARIO");

            migrationBuilder.CreateIndex(
                name: "IX_HISTORICO_SAUDE_ID_CONSULTA",
                table: "HISTORICO_SAUDE",
                column: "ID_CONSULTA");

            migrationBuilder.CreateIndex(
                name: "IX_HISTORICO_SAUDE_ID_PET",
                table: "HISTORICO_SAUDE",
                column: "ID_PET");

            migrationBuilder.CreateIndex(
                name: "IX_LEITURA_ID_SENSOR",
                table: "LEITURA",
                column: "ID_SENSOR");

            migrationBuilder.CreateIndex(
                name: "IX_LEMBRETE_ID_PET",
                table: "LEMBRETE",
                column: "ID_PET");

            migrationBuilder.CreateIndex(
                name: "IX_PET_ID_RESPONSAVEL",
                table: "PET",
                column: "ID_RESPONSAVEL");

            migrationBuilder.CreateIndex(
                name: "IX_RESPONSAVEL_ID_USUARIO",
                table: "RESPONSAVEL",
                column: "ID_USUARIO",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SENSOR_ID_PET",
                table: "SENSOR",
                column: "ID_PET");

            migrationBuilder.CreateIndex(
                name: "IX_VETERINARIO_ID_CLINICA",
                table: "VETERINARIO",
                column: "ID_CLINICA");

            migrationBuilder.CreateIndex(
                name: "IX_VETERINARIO_ID_USUARIO",
                table: "VETERINARIO",
                column: "ID_USUARIO");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "APLICACAO_VACINA");

            migrationBuilder.DropTable(
                name: "HISTORICO_SAUDE");

            migrationBuilder.DropTable(
                name: "LEITURA");

            migrationBuilder.DropTable(
                name: "LEMBRETE");

            migrationBuilder.DropTable(
                name: "LOG_ERROS");

            migrationBuilder.DropTable(
                name: "VACINA");

            migrationBuilder.DropTable(
                name: "CONSULTA");

            migrationBuilder.DropTable(
                name: "SENSOR");

            migrationBuilder.DropTable(
                name: "VETERINARIO");

            migrationBuilder.DropTable(
                name: "PET");

            migrationBuilder.DropTable(
                name: "CLINICA");

            migrationBuilder.DropTable(
                name: "RESPONSAVEL");

            migrationBuilder.DropTable(
                name: "USUARIO");
        }
    }
}
