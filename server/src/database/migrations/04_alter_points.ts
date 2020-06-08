import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.table('points', (table) => {
    table.renameColumn('city', 'compound');
    table.string('uf').notNullable().alter();
    table.renameColumn('uf', 'adress');
  });
}

export async function down(knex: Knex) {
  return knex.schema.table('points', (table) => {
    table.renameColumn('compound', 'city');
    table.string('adress', 2).notNullable().alter;
    table.renameColumn('adress', 'uf');
  });
}
