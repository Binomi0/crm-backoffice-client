module.exports = {
    getClients: function (response) {
        fetch('/api/clientes')
            .then(res => res.json())
            .then(clientes => response(clientes))
            .catch(err => console.log(err))
    },
    getNegocios: function (response) {
        fetch('/api/negocios')
            .then(res => res.json())
            .then(negocios => response(negocios))
    },
    getTareas: function (response) {
        fetch('/api/tareas')
            .then(res => res.json())
            .then(tareas => response(tareas))
    },
    getLlamadas: function (response) {
        fetch('/api/llamadas')
            .then(res => res.json())
            .then(llamadas => response(llamadas))
    }
};