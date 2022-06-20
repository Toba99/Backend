import { Model } from "objection"

class BlackList extends Model {
	[x: string]: any;

	static get tableName() {
		return "blacklist";
	}

	static get idColumn() {
		return "id";
	}
}

export default BlackList;
