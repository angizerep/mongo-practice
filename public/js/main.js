const API = '/users';

const form = document.getElementById('userForm');
const resp = document.getElementById('response');
const lista = document.getElementById('history');

const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editNameInput = document.getElementById('editName');
const editEmailInput = document.getElementById('editEmail');
const editAgeInput = document.getElementById('editAge');
const cancelEditBtn = document.getElementById('cancelEdit');
const closeBtn = document.querySelector('.modal .close');

const notifyModal = document.getElementById('notifyModal');
const notifyBox = document.getElementById('notifyBox');
const notifyTitle = document.getElementById('notifyTitle');
const notifyMessage = document.getElementById('notifyMessage');
const closeNotify = document.getElementById('closeNotify');

resp.style.display = 'none';

function openEditModal() {
    editModal.style.display = 'block';
}

function closeEditModal() {
    editModal.style.display = 'none';
    editForm.reset();
    delete editForm.dataset.id;
}

// Cerrar con “×”
closeBtn.addEventListener('click', closeEditModal);
// Cerrar con “Cancelar”
cancelEditBtn.addEventListener('click', closeEditModal);
// Cerrar al clicar fuera
window.addEventListener('click', e => {
    if (e.target === editModal) closeEditModal();
});

// Crear nuevo
form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = parseInt(document.getElementById('age').value, 10);

    const method = form.dataset.id ? 'PUT' : 'POST';
    const url = form.dataset.id ? `${API}/${form.dataset.id}` : API;

    try {
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, age })
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Error inesperado');

        form.reset();
        delete form.dataset.id;
        form.querySelector('button').textContent = 'Enviar';
        loadHistory();

        // Mostrar notificación de éxito
        showNotify('success', 'Usuario registrado correctamente');
    } catch (err) {
        // Mostrar notificación de error
        showNotify('error', err.message);
    }
});

// Carga todos los usuarios
async function loadHistory() {
    try {
        const res = await fetch(API);
        const usuarios = await res.json();
        lista.innerHTML = usuarios.map(u => `
        <li>
            ${u.name} — ${u.email} — ${u.age} años
            <button class="edit" data-id="${u._id}">Editar</button>
        </li>
    `).join('');

        lista.querySelectorAll('button.edit').forEach(btn => {
            btn.addEventListener('click', () => editarUsuario(btn.dataset.id));
        });
    } catch {
        lista.innerHTML = '<li>Error al cargar registros.</li>';
    }
}

async function editarUsuario(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        if (!res.ok) throw new Error('No se pudo obtener el usuario');
        const u = await res.json();

        editForm.dataset.id = u._id;
        editNameInput.value = u.name;
        editEmailInput.value = u.email;
        editAgeInput.value = u.age;
        resp.style.display = 'none';
        openEditModal();
    } catch (err) {
        alert(err.message);
    }
}

editForm.addEventListener('submit', async e => {
    e.preventDefault();
    const id = editForm.dataset.id;
    const name = editNameInput.value.trim();
    const email = editEmailInput.value.trim();
    const age = parseInt(editAgeInput.value, 10);

    try {
        const res = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, age })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al actualizar');

        closeEditModal();
        loadHistory();
        showNotify('success', 'Usuario actualizado correctamente');

    } catch (err) {
        showNotify('error', err.message);

    }
});

function showNotify(type, message) {
    notifyTitle.innerText = type === 'error' ? 'Error' : 'Éxito';
    notifyMessage.innerText = message;
    notifyBox.className = 'modal-content';
    notifyBox.classList.add(type);
    notifyModal.style.display = 'block';
}

closeNotify.addEventListener('click', () => {
    notifyModal.style.display = 'none';
});

window.addEventListener('DOMContentLoaded', loadHistory);
