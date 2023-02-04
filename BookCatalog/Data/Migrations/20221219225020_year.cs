using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookCatalog.Data.Migrations
{
    public partial class year : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Book",
                newName: "Year");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Year",
                table: "Book",
                newName: "Rating");
        }
    }
}
