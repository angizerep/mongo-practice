const API = '/api/users';
const form = document.getElementById('userForm');
const tableBody = document.getElementById('usersTable');

async function fetchUsers() {
    const res = await fetch(API);
    const users = await res.json();
    tableBody.innerHTML = users.map(u => `
    <tr>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td>${u.edad}</td>
        <td>
            <button onclick="editUser('${u._id}')">Editar</button>
        </td>
    </tr>
    `).join('');
}

// Crear o actualizar
form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
        nombre: form.nombre.value,
        email: form.email.value,
        edad: form.edad.value
    };

    const id = form.dataset.id;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API}/${id}` : API;

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    form.reset();
    delete form.dataset.id;
    fetchUsers();
});

function editUser(id) {
    // Traer datos del usuario, rellenar formulario y poner data-id
    fetch(`${API}/${id}`)
        .then(r => r.json())
        .then(u => {
            form.nombre.value = u.nombre;
            form.email.value = u.email;
            form.edad.value = u.edad;
            form.dataset.id = u._id;
        });
}

// Carga inicial
fetchUsers();
