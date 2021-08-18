var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Reproductor } from './clases/Reproductor.js';
import { User } from './clases/User.js';
import menu from './menu.js';
import { Movie } from './clases/Movie.js';
var contentLista = document.getElementById('movie-lista');
var elementReproductor = document.getElementById('reproductor');
var reproductorCerrar = document.getElementById('reproductor-cerrar');
User.verificarToken().then(function (result) {
    if (result) {
        var r = result;
        var user = new User(r.user_name, r.name, r.last_name, r.email, r.role);
        menu.setInfoUser(user);
    }
});
function crearTablaInfoContenido(_a) {
    var cover = _a.cover, title = _a.title, genres = _a.genres, time = _a.time, views = _a.views, description = _a.description;
    var movieDescripcion = document.querySelector('.movieP-descripcion');
    movieDescripcion.innerHTML = description;
    return "<div class=\"movieP-img\">\n            <img src=\"" + cover + "\" alt=\"\" />\n          </div>\n          <div class=\"movieP-info\">\n            <div class=\"movieP-info-tabla\">\n              <p>Titulo</p>\n              <p class=\"movieP-titulo\">" + title + "</p>\n              <p>Generos</p>\n              <p class=\"movieP-generos\">" + genres + "</p>\n              <p>Tiempo</p>\n              <p class=\"movieP-tiempo\">" + time + " minutos</p>\n              <p>vistas</p>\n              <p class=\"movieP-vistas\">" + views + "</p>\n            </div>\n          </div>";
}
var reproductor = new Reproductor(elementReproductor);
var movie;
function reproducir(index) {
    return __awaiter(this, void 0, void 0, function () {
        var urlResponse, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, movie.obtenerVideo(index)];
                case 1:
                    urlResponse = _a.sent();
                    if (urlResponse.status == 404)
                        return [2 /*return*/, alert('debes iniciar sesion')];
                    else if (urlResponse.status == 403)
                        return [2 /*return*/, alert('Debes contratar un plan estandar o superior')];
                    return [4 /*yield*/, urlResponse.json()];
                case 2:
                    content = _a.sent();
                    reproductor.reproducir(content.url);
                    return [2 /*return*/];
            }
        });
    });
}
reproductorCerrar.addEventListener('click', function () {
    reproductor.cerrar();
});
function crearListaContenido(title, index) {
    var elementLi = document.createElement('li');
    elementLi.className = 'movie-item';
    elementLi.setAttribute('data-contentIndex', "" + index);
    elementLi.addEventListener('click', function () {
        reproducir(index);
    });
    elementLi.innerHTML = "<img src=\"/img/icon-play.svg\" alt=\"\" />\n                          <span>" + title + "</span>";
    return elementLi;
}
function pedirContenido() {
    return __awaiter(this, void 0, void 0, function () {
        var params, movieId, contenidoResponse, contenido, elementHTML, cover, title, genres, time, views, description, plan, _id, index, template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = new URLSearchParams(window.location.search);
                    movieId = params.get('movieId');
                    return [4 /*yield*/, fetch("/api/movies/" + movieId)];
                case 1:
                    contenidoResponse = _a.sent();
                    return [4 /*yield*/, contenidoResponse.json()];
                case 2:
                    contenido = _a.sent();
                    elementHTML = document.getElementById('movieP');
                    cover = contenido.cover, title = contenido.title, genres = contenido.genres, time = contenido.time, views = contenido.views, description = contenido.description, plan = contenido.plan, _id = contenido._id;
                    movie = new Movie(_id, title, genres, time, cover, description, plan, contenido.content);
                    elementHTML.innerHTML = crearTablaInfoContenido({
                        cover: cover,
                        title: title,
                        genres: genres,
                        time: time,
                        views: views,
                        description: description
                    });
                    index = 0;
                    template = document.createElement('div');
                    contenido.content.forEach(function (element) {
                        template.appendChild(crearListaContenido(element.title, index));
                        index++;
                    });
                    contentLista.appendChild(template);
                    return [2 /*return*/];
            }
        });
    });
}
pedirContenido();
