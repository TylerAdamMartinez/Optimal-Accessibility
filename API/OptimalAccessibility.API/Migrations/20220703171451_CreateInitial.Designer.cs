﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OptimalAccessibility.API;

#nullable disable

namespace OptimalAccessibility.API.Migrations
{
    [DbContext(typeof(OptimalAccessibilityContext))]
    [Migration("20220703171451_CreateInitial")]
    partial class CreateInitial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.6");

            modelBuilder.Entity("OptimalAccessibility.Domain.Models.Database.AccessibilityScore", b =>
                {
                    b.Property<Guid>("accessibilityScoreId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("ColorRating")
                        .HasColumnType("INTEGER");

                    b.Property<int>("StructureRating")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TextRating")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("posterId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("userId")
                        .HasColumnType("TEXT");

                    b.HasKey("accessibilityScoreId");

                    b.HasIndex("userId")
                        .IsUnique();

                    b.ToTable("AccessibilityScores");
                });

            modelBuilder.Entity("OptimalAccessibility.Domain.Models.Database.Poster", b =>
                {
                    b.Property<Guid>("posterId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("PosterImageData")
                        .HasColumnType("BLOB");

                    b.Property<string>("PosterImageTitle")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PosterName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("accessibilityScoreId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("userId")
                        .HasColumnType("TEXT");

                    b.HasKey("posterId");

                    b.ToTable("Posters");
                });

            modelBuilder.Entity("OptimalAccessibility.Domain.Models.Database.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Birthday")
                        .HasColumnType("TEXT");

                    b.Property<int>("Classfication")
                        .HasColumnType("INTEGER");

                    b.Property<string>("EUID")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Gender")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<char?>("MiddleInitial")
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("passwordHash")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("passwordSalt")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("OptimalAccessibility.Domain.Models.Database.AccessibilityScore", b =>
                {
                    b.HasOne("OptimalAccessibility.Domain.Models.Database.User", null)
                        .WithOne("accessibilityScore")
                        .HasForeignKey("OptimalAccessibility.Domain.Models.Database.AccessibilityScore", "userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("OptimalAccessibility.Domain.Models.Database.User", b =>
                {
                    b.Navigation("accessibilityScore");
                });
#pragma warning restore 612, 618
        }
    }
}
