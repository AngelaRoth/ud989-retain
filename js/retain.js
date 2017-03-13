$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    // NOTE: If we wanted to reverse the order of our notes, that functionality should go here, in the octopus. It might be tempting to put it in the Model, but note that we don't actually want to reverse the order in our stored array, we just want to display it reversed.
    //1. We don't want to mess up the data we already have
    //2. We don't actually need to change the data itself
    //3. the Octopus is where Ben wants all the real smarts live in this organizational paradigm; model and view are relatively simple (note that different organizational libraries all have different opinions about where different functionality should live, but in all of those cases, they're consistant and well thought out)
    // Here, all you have to do is add a .reverse() inside the getNotes function!
    var octopus = {
        // Add date here
        addNewNote: function(noteStr) {
            // NOTE: a lot of organizational paradigms put this kind of thing (content and date) in the model itself, because this stuff is kind of dataish. For simplicity in this example, Ben is just creating an object literal right here.
            model.add({
                content: noteStr,
                date: Date.now()
            });

            view.render();
        },

        getNotes: function() {
            /*return model.getAllNotes();*/
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        // Add date html here (class note-date !)
        // NOTE that we are making a new DATE object with the Date.now value we got, and then we're converting it to a string.
        // Other DATE methods can be used to make this more readable.
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        '<span class="note-date">' +
                        new Date(note.date).toString() +
                        '</span>' +
                        note.content +
                        '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});
