var Reproductor = /** @class */ (function () {
    function Reproductor(element) {
        this.reproductor = element;
    }
    Reproductor.prototype.reproducir = function (url) {
        document.body.className = 'reproductor-isActive';
        this.reproductor.src = url;
    };
    Reproductor.prototype.cerrar = function () {
        document.body.className = '';
        this.reproductor.src = '#';
    };
    return Reproductor;
}());
export { Reproductor };
//# sourceMappingURL=Reproductor.js.map