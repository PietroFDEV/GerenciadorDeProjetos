using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GerenciadorDeProjetos.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "loginUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserLogin = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserPass = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_loginUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "List",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PriorityList = table.Column<bool>(type: "bit", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    IdUser = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_List", x => x.Id);
                    table.ForeignKey(
                        name: "FK_List_loginUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "loginUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CardList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Text = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Deadline = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Priority = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ListId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CardList_List_ListId",
                        column: x => x.ListId,
                        principalTable: "List",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardList_loginUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "loginUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CardList_ListId",
                table: "CardList",
                column: "ListId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CardList_UserId",
                table: "CardList",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_List_UserId",
                table: "List",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CardList");

            migrationBuilder.DropTable(
                name: "List");

            migrationBuilder.DropTable(
                name: "loginUsers");
        }
    }
}
