"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Inserir os Tipos obrigatórios
    await queryInterface.bulkInsert("tipos", [
      {
        id: 1,
        descricao: "Entrada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        descricao: "Saída",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 2. Inserir algumas Categorias padrão de Mock
    await queryInterface.bulkInsert("categorias", [
      {
        id: 1,
        descricao: "Alimentação",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        descricao: "Salário",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        descricao: "Consumo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        descricao: "Vendas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 3. Inserir algumas Movimentações de teste casando com os IDs acima
    await queryInterface.bulkInsert("movimentacoes", [
      {
        descricao: "Salário Mensal Green",
        valor: 5000.0,
        data: new Date("2026-06-05"),
        paga: true,
        idTipo: 1, // Entrada
        idCategoria: 2, // Salário
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Supermercado da Semana",
        valor: 350.5,
        data: new Date("2026-06-10"),
        paga: true,
        idTipo: 2, // Saída
        idCategoria: 1, // Alimentação
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descricao: "Conta de Energia",
        valor: 180.0,
        data: new Date("2026-06-20"),
        paga: false, // Ainda não venceu/foi paga
        idTipo: 2, // Saída
        idCategoria: 3, // Consumo
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("movimentacoes", null, {});
    await queryInterface.bulkDelete("categorias", null, {});
    await queryInterface.bulkDelete("tipos", null, {});
  },
};
