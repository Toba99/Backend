const { Model } = require("objection");

class Chart extends Model {
	// Table name is the only required property.
	static get tableName() {
		return "chat";
	}

	static get idColumn() {
		return "id";
	}

	// userWallet() {
	// 	return {
	// 		amount: this.amount,
	// 		created_at: this.created_at,
	// 		updated_at: this.updated_at,
	// 	};
	// }
}

export default Chart;
