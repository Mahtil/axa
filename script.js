const noteInput = document.getElementById('noteInput');

const saveNoteBtn = document.getElementById('saveNote');

const exportNoteBtn = document.getElementById('exportNote');

const searchInput = document.getElementById('searchInput');

const notesList = document.getElementById('notesList');

const encryptPassword = document.getElementById('encryptPassword');

const encryptNoteBtn = document.getElementById('encryptNote');

const shareNoteBtn = document.getElementById('shareNote');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Load notes from localStorage

loadNotes();

function loadNotes() {

    notesList.innerHTML = '';

    notes.forEach(note => {

        const li = document.createElement('li');

        li.textContent = note.text;

        li.dataset.note = note.text; // Store note data

        notesList.appendChild(li);

    });

}

// Save a new note

saveNoteBtn.addEventListener('click', () => {

    const noteText = noteInput.value.trim();

    if (noteText) {

        notes.push({ text: noteText });

        localStorage.setItem('notes', JSON.stringify(notes));

        loadNotes();

        noteInput.value = '';

    }

});

// Export note as TXT

exportNoteBtn.addEventListener('click', () => {

    const textBlob = new Blob([notes.map(note => note.text).join('\n')], { type: 'text/plain' });

    const link = document.createElement('a');

    link.href = URL.createObjectURL(textBlob);

    link.download = 'notes.txt';

    link.click();

});

// Search notes

searchInput.addEventListener('input', () => {

    const filter = searchInput.value.toLowerCase();

    const filteredNotes = notes.filter(note => note.text.toLowerCase().includes(filter));

    notesList.innerHTML = '';

    filteredNotes.forEach(note => {

        const li = document.createElement('li');

        li.textContent = note.text;

        notesList.appendChild(li);

    });

});

// Encrypt note

encryptNoteBtn.addEventListener('click', () => {

    const password = encryptPassword.value;

    const noteText = noteInput.value;

    if (noteText && password) {

        // Simple encryption using btoa

        const encryptedNote = btoa(noteText + password);

        notes.push({ text: encryptedNote });

        localStorage.setItem('notes', JSON.stringify(notes));

        loadNotes();

        noteInput.value = '';

        encryptPassword.value = '';

    }

});

// Share note

shareNoteBtn.addEventListener('click', () => {

    if (notes.length > 0) {

        const noteText = notes[notes.length - 1].text; // latest note to share

        const encodedNote = encodeURIComponent(noteText);

        const shareUrl = `https://example.com/share?note=${encodedNote}`;

        alert(`Share this link: ${shareUrl}`);

    }

});