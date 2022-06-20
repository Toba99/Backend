const commaNumber = require("comma-number");
type currencytype ={
	symbol: any}
const currency = <currencytype>{
	symbol: {
		ngn: "₦",
		usd: "$",
		euro: "€",
		gbp: "£",
		ksh: "K",
		cad: "C$",
	},
};
const moneyFormat = function (amount: any, symbol = "ngn", nocurrency = false) {
	try {
		const _currency = nocurrency === true ? "" : currency.symbol[symbol];
		if (!amount) {
			return _currency + "0";
		}
		amount = Math.round(amount * 100) / 100;
		return _currency + commaNumber(amount);
		// return _currency + Math.round(parseInt(amount));
	} catch (e) {
		console.log("moneyFormat::::Error=====>", e);
		return 0;
	}
};

export {
	moneyFormat,
	currency,
};
