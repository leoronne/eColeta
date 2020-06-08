import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.table('points', (table) => {
    table.renameColumn('adress', 'address');
  });
}

export async function down(knex: Knex) {
  return knex.schema.table('points', (table) => {
    table.renameColumn('address', 'adress');
  });
}
