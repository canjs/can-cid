/*can-cid@0.0.0#can-cid*/
var namespace = require('can-namespace');
var _cid = 0;
var cid = function (object, name) {
    if (!object._cid) {
        _cid++;
        object._cid = (name || '') + _cid;
    }
    return object._cid;
};
if (namespace.cid) {
    throw new Error('You can\'t have two versions of can-cid, check your dependencies');
} else {
    module.exports = namespace.cid = cid;
}