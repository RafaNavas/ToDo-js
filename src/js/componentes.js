import { ToDo } from "./classes";
import { todoList } from "../index";

// Referencias en el HTML
const divToDoList = document.querySelector('.todo-list');
const txtImputToDo = document.querySelector( '.new-todo' );
const btnDelCompletados = document.querySelector( '.clear-completed' );
const ulFilters = document.querySelector('.filters');
const aFiltros = document.querySelectorAll('.filtro');
const qToDos = document.querySelector('strong');



export const crearToDoHTML = ( tarea )=> {
    const ToDoHTML = `
        <li class="${ ( tarea.completado )? 'completed': ''}" data-id="${ tarea.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (tarea.completado)? 'checked': ''}>
                <label>${ tarea.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Rule the web">
        </li>`;

    const divToDo = document.createElement('div');
    divToDo.innerHTML = ToDoHTML;
    
    divToDoList.append( divToDo.firstElementChild );

    return divToDo.firstElementChild; 
        
}


// Eventos
txtImputToDo.addEventListener( 'keyup', ( event )=> {

    if ( event.keyCode === 13 && txtImputToDo.value.length > 0 ) {
        console.log( txtImputToDo.value );
        const nuevoToDo = new ToDo( txtImputToDo.value );
        todoList.addToDo( nuevoToDo );

        console.log(todoList); 

        crearToDoHTML( nuevoToDo ); 
        txtImputToDo.value = '';

        qToDos.innerText = this.ToDos.length;

    }

    // if( this.ToDos.length === 0 ) {
    //     qToDos.innerText =  '0';

    // } else {
    //     qToDos.innerText = this.ToDos.length;
    // }
   
});


divToDoList.addEventListener('click', ( event ) =>{
    // console.log( 'click' );
    // console.log( event.target.localName );
    const nombreElemento = event.target.localName; // label o button o input.
    const todoElemento =  event.target.parentElement.parentElement;
    const todoId       =  todoElemento.getAttribute( 'data-id' );

    // console.log( todoElemento );
    // console.log( todoId );

    if( nombreElemento.includes( 'input' ) ) { //click en el check.
        todoList.marckToDo( todoId );
        todoElemento.classList.toggle( 'completed' ); // classList para la lista de clases; toggle para quitar o poner una clases.
    } else if ( nombreElemento.includes( 'button' ) ) {  // Hay que borrar la tarea.

        todoList.deleteToDo( todoId ); // Elimina el registro del ToDo.
        divToDoList.removeChild( todoElemento ); // Elimina la tarea del html.

    }

    console.log( todoList );
});


btnDelCompletados.addEventListener('click', () => {

    todoList.deleteCompletedToDos();

    for( let i = divToDoList.children.length-1; i >= 0 ; i--) {

       const element = divToDoList.children[i];

       if ( element.classList.contains('completed') ) {
           divToDoList.removeChild( element );
       }
    }
});

ulFilters.addEventListener( 'click', ( event )=>{
    //console.log( event.target.text )

    const filtro = event.target.text; // Pendientes, completados o todos.
    if(!filtro) { return; };

    aFiltros.forEach(element => element.classList.remove('selected') );
    event.target.classList.add('selected');


    for( const elemento of divToDoList.children ) {
        // console.log( elemento );

        elemento.classList.remove( 'hidden' );

        const completado = elemento.classList.contains( 'completed' );

        switch( filtro ) {
            case 'Pendientes':
            if(completado) {
                elemento.classList.add('hidden');
            }
             break;
            
            case 'Completados':
            if( !completado ) {
                elemento.classList.add('hidden');
            }
            break;
        }

    }
})


