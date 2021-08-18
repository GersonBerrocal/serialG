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
var _this = this;
var form = document.getElementById('formulario-pelicula');
var htmlLista = document.getElementById('peliculas-lista');
var linkAgregar = document.getElementById('agregar-content');
var contenedorFormulario = document.getElementById('contenedor-formulario');
var cerrarForm = document.getElementById('cerrarForm');
function listarContenido(_id, title) {
    return "<div class=\"pelicula\" data-idMovie=\"" + _id + "\">\n          <span>" + title + "</span>\n          <span><img class=\"pel-editar\" src=\"/img/icon-editar.svg\" alt=\"\" />\n          <img class=\"pel-eliminar\" src=\"/img/icon-eliminar.svg\"\n              alt=\"\"\n          /></span>\n        </div>";
}
function mostrarFormulario() {
    contenedorFormulario.classList.add('contenedor-formulario-isActive');
}
function cerrarFormulario() {
    contenedorFormulario.classList.remove('contenedor-formulario-isActive');
    limpiarDatos();
}
function obtenerLista() {
    return __awaiter(this, void 0, void 0, function () {
        var contenidoResponse, contenido, cnt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/api/movies/list', { method: 'GET' })];
                case 1:
                    contenidoResponse = _a.sent();
                    return [4 /*yield*/, contenidoResponse.json()];
                case 2:
                    contenido = _a.sent();
                    cnt = '';
                    contenido.forEach(function (element) {
                        cnt += listarContenido(element._id, element.title);
                    });
                    htmlLista.innerHTML = cnt;
                    return [2 /*return*/];
            }
        });
    });
}
obtenerLista();
function obtenerDatos() {
    if (formTipo.method == 'POST') {
        var jsonContent = form['contenido'].value;
        var fd = new FormData();
        fd.append('title', form['titulo'].value);
        fd.append('genres', form['generos'].value.split(','));
        fd.append('description', form['descripcion'].value);
        fd.append('time', form['tiempo'].value);
        fd.append('plan', form['plan'].value);
        fd.append('cover', form['cover'].files[0]);
        fd.append('content', jsonContent);
        return fd;
    }
    else if (formTipo.method == 'PUT') {
        var jsonContent = form['contenido'].value;
        var user = {
            title: form['titulo'].value,
            genres: form['generos'].value.split(','),
            time: Number(form['tiempo'].value),
            description: form['descripcion'].value,
            plan: form['plan'].value,
            content: JSON.parse(jsonContent)
        };
        return user;
    }
}
function setearDatos(_a) {
    var title = _a.title, genres = _a.genres, time = _a.time, description = _a.description, plan = _a.plan, content = _a.content;
    form['titulo'].value = title;
    form['generos'].value = genres;
    form['tiempo'].value = time;
    form['descripcion'].value = description;
    form['plan'].value = plan;
    form['contenido'].value = content;
}
function limpiarDatos() {
    form['titulo'].value = '';
    form['generos'].value = '';
    form['tiempo'].value = '';
    form['descripcion'].value = '';
    form['plan'].value = '';
    form['contenido'].value = '';
    form['cover'].value = '';
}
var formTipo = { ruta: '/api/movies', method: 'POST' };
form.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var movie, requestMovie, createMovie, create;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                movie = obtenerDatos();
                requestMovie = {};
                if (formTipo.method == 'PUT') {
                    requestMovie = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(movie)
                    };
                }
                else if (formTipo.method == 'POST') {
                    requestMovie = {
                        method: 'POST',
                        body: movie,
                        redirect: 'follow'
                    };
                }
                else
                    requestMovie = {};
                return [4 /*yield*/, fetch("" + formTipo.ruta, requestMovie)];
            case 1:
                createMovie = _a.sent();
                if (createMovie.status != 200)
                    return [2 /*return*/, alert('Error verifique el esquema')];
                return [4 /*yield*/, createMovie.json()];
            case 2:
                create = _a.sent();
                formTipo.method == 'POST'
                    ? alert('Contenido creado')
                    : alert('contenido actualizado');
                limpiarDatos();
                return [2 /*return*/];
        }
    });
}); });
htmlLista.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var ele, idMovie, deleteResponse, idMovie, getMovie, movie, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ele = e.target;
                if (!(ele.className == 'pel-eliminar')) return [3 /*break*/, 2];
                idMovie = ele.parentNode.parentNode.getAttribute('data-idMovie');
                return [4 /*yield*/, fetch("/api/movies/" + idMovie, {
                        method: 'DELETE'
                    })];
            case 1:
                deleteResponse = _a.sent();
                if (deleteResponse.status == 200)
                    location.href = '/admin';
                else
                    alert('ocurrio un error');
                return [3 /*break*/, 5];
            case 2:
                if (!(ele.className == 'pel-editar')) return [3 /*break*/, 5];
                idMovie = ele.parentNode.parentNode.getAttribute('data-idMovie');
                return [4 /*yield*/, fetch("/api/movies/" + idMovie, {
                        method: 'GET'
                    })];
            case 3:
                getMovie = _a.sent();
                if (getMovie.status != 200)
                    return [2 /*return*/, alert('ocurrio un error')];
                return [4 /*yield*/, getMovie.json()];
            case 4:
                movie = _a.sent();
                data = {
                    title: movie.title,
                    genres: movie.genres,
                    time: movie.time,
                    description: movie.description,
                    plan: movie.plan,
                    content: JSON.stringify(movie.content)
                };
                setearDatos(data);
                mostrarFormulario();
                formTipo = { method: 'PUT', ruta: "/api/movies/" + movie._id };
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
linkAgregar.addEventListener('click', function () {
    formTipo = { method: 'POST', ruta: '/api/movies' };
    mostrarFormulario();
});
cerrarForm.addEventListener('click', cerrarFormulario);
