import { Model } from "objection"

class Pin extends Model {
	[x: string]: any;
	// Table name is the only required property.
	static get tableName() {
		return "password_resets";
	}

	static get idColumn() {
		return "id";
	}
}

export default Pin;
