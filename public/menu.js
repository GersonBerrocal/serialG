function setInfoUser(user) {
    menuAgregarUsuario(user.user_name);
    document.querySelector('.menu-user-cerrar').addEventListener('click', function () {
        user.cerrarSesion();
        menuCerrarUsuario();
    });
}
function menuAgregarUsuario(user_name) {
    document.querySelector('.menu-user').classList.add('menu-user-isActive');
    document.querySelector('.menu-user-name').innerHTML = user_name;
}
function menuCerrarUsuario() {
    document.querySelector('.menu-user').classList.remove('menu-user-isActive');
    document.querySelector('.menu-user-name').innerHTML = 'userName';
}
export default { setInfoUser: setInfoUser };
//# sourceMappingURL=menu.js.map