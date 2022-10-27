
import { ToDo } from "./todo.class";


export class ToDoList {

    constructor() {

        // this.ToDos = [];
        this.loadLocalStorage();

        this.contarToDos();

    }

    addToDo( tarea ) {
        this.ToDos.push( tarea );
        this.saveLocalStorage();
        this.contarToDos();

    }

    deleteToDo( id ) {
        this.ToDos = this.ToDos.filter( ToDo => ToDo.id != id );
        this.saveLocalStorage();
        this.contarToDos();
    }

    marckToDo( id ) {
        for( const todo of this.ToDos ) {
            if( todo.id == id ) {
                todo.completado = !todo.completado;
                this.saveLocalStorage();
                break;
            }  
        }
    }

    deleteCompletedToDos() {
        this.ToDos = this.ToDos.filter( todo => !todo.completado );
        this.saveLocalStorage();
        this.contarToDos();

    }

    saveLocalStorage() {
        localStorage.setItem('tarea', JSON.stringify( this.ToDos ) );
    }

    loadLocalStorage() {

        this.ToDos = ( localStorage.getItem('tarea') )
            ? JSON.parse( localStorage.getItem('tarea') ) 
            : [] ; 

        this.ToDos = this.ToDos.map( obj => ToDo.fromJson( obj ) );

        // if( localStorage.getItem('tarea') ) {

        //     this.ToDos = JSON.parse( localStorage.getItem('tarea') );
        //     console.log( 'cargaLocal:', this.ToDos );

        // } else {
        //     this.ToDos = [];
    }

    contarToDos() {
        const qToDos = document.querySelector('strong');
        // console.log('Los ToDos: ', this.ToDos);
        qToDos.innerText = (this.ToDos.length === 0)? '0' : this.ToDos.length; 
    }

}
