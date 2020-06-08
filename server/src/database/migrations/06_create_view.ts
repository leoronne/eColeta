import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.raw(`CREATE VIEW points_with_itens AS SELECT PI.POINT_ID,
  P.NAME, P.EMAIL, P.WHATSAPP,
  P.LATITUDE, P.LONGITUDE, P.COMPOUND, P.ADDRESS,
  P.IMAGE,
  ARRAY_TO_STRING(ARRAY_AGG(DISTINCT PI.ITEM_ID),',') AS ITENS
  FROM POINT_ITEMS PI
  LEFT JOIN POINTS P ON P.ID=PI.POINT_ID
  GROUP BY PI.POINT_ID, P.ID;`);
}

export async function down(knex: Knex) {
      return knex.raw(`DROP VIEW points_with_itens;`);
}
