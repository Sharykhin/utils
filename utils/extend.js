function extend(parent, child) {
	var F = function () {};
	F.prototype = parent.prototype;
	child.prototype = new F();
	child.prototype.constructor = child;
}