var expando = "can" + new Date();
var uuid = 0;

module.exports = {
	expando: expando,
	getCid: function () {
		return this[expando];
	},
	cid: function () {
		return this[expando] || (this[expando] = ++uuid);
	}
};
