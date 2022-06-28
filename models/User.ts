require("dotenv").config()
import { Model } from "objection"


class User extends Model {
	id: any;
	firstName: any;
	lastName: any;
	email: any;
	avatar: any;
	password: any
	email_verified_at: any
	login_attempts: any
	notification: any
	created_at: any;
	updated_at: any;
    isadmin: any;
	static theTableName() {
		return "users";
	}

	// Table name is the only required property.
	static get tableName() {
		return this.theTableName();
	}

	static get idColumn() {
		return "id";
	}

	// the tenary operator is so the body includes the field that is actually null
	// do not touch. It works. Intern leave alone
	user() {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			avatar: !this.avatar ? null : this.avatar,
			notification: this.notification !== 0,
			created_at: this.created_at,
			updated_at: this.updated_at,
		};
	}

	userSimplified() {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			avatar: !this.avatar ? null : this.avatar,
			created_at: this.created_at,
		};
	}


}

export default User;
