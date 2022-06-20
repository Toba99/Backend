export default (wallet: any) => {
	try {
		if (typeof wallet === "undefined") {
			return null;
		}

		delete wallet.id;
		delete wallet.user_id;

		return {
			amount: wallet.amount === null ? 0 : wallet.amount,
			overdraft: wallet.overdraft === null ? 0 : wallet.overdraft,
			created_at: wallet.created_at,
			updated_at: wallet.updated_at,
		};
	} catch (error) {
		return null;
	}
};
