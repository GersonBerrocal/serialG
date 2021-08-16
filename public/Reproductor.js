var Reproductor = /** @class */ (function () {
    function Reproductor() {
    }
    Reproductor.prototype.reproducir = function (url, videoElement) {
        videoElement.src = url;
    };
    Reproductor.prototype.cerrar = function (videoElement) {
        var parent = videoElement.parentNode;
        parent.removeChild(videoElement);
        videoElement.src = '#';
        parent.appendChild(videoElement);
    };
    return Reproductor;
}());
export { Reproductor };
//# sourceMappingURL=Reproductor.js.map