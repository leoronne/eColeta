import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.table('points', (table) => {
    table.decimal('latitude', 14, 10).notNullable().alter();
    table.decimal('longitude', 14, 10).notNullable().alter();
  });
}

export async function down(knex: Knex) {
  return knex.schema.table('points', (table) => {
      table.decimal('latitude').notNullable().alter();
      table.decimal('longitude').notNullable().alter();
    });
}
