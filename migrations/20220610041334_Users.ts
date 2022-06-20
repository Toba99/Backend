import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
		table.increments("id").primary();
		table.string("firstName").notNullable();
		table.string("lastName").notNullable();
		table.string("email").notNullable().unique();
		table.string("avatar");
		table.string("notification").notNullable().defaultTo(1);
		table.datetime("email_verified_at", { useTz: true, precision: 6 });
		table.string("password").notNullable();
		table.integer("login_attempts").notNullable().defaultTo(0);
		table
			.datetime("created_at", { useTz: true, precision: 6 })
			.defaultTo(knex.fn.now(6));
		table.datetime("updated_at", { useTz: true, precision: 6 });
		table.datetime("deleted_at", { useTz: true, precision: 6 });
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists("users");
}

