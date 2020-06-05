import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Lamps', image: 'lamps.svg' },
    { title: 'Battery', image: 'battery.svg' },
    { title: 'Papers', image: 'papers.svg' },
    { title: 'Electronic Waste', image: 'electronic.svg' },
    { title: 'Organic Waste', image: 'organic.svg' },
    { title: 'Kitchen Oil', image: 'oil.svg' },
  ]);
}
