import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("chat", (table) => {
		table.increments("id").primary();
		table.bigInteger("user_id").notNullable();
		table.bigInteger("peer_user_id").notNullable();
		table.text("message").notNullable();
		table.text("status").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists("wallets");
}

