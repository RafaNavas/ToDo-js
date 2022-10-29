
import { ToDo } from "./todo.class";
const qToDos = document.querySelectorAll('strong');


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
        this.totalToDos();

    }

    deleteToDo( id ) {
        this.ToDos = this.ToDos.filter( ToDo => ToDo.id != id );
        this.saveLocalStorage();
        this.contarToDos();
        this.totalToDos();
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
        this.totalToDos();

    }

    saveLocalStorage() {
        localStorage.setItem(   'tarea', JSON.stringify( this.ToDos ) );
        localStorage.setItem( 'Total', this.totalToDos() );
        localStorage.setItem( 'Pendientes', this.contarToDos() );
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
        
        let pendientes = 0;

        this.ToDos.forEach( todo => {
            
            if( todo.completado === !true ) {
    
                pendientes++;
            }

        });

        qToDos[0].innerText = `${pendientes}`;

        return pendientes;
    }

    totalToDos() {
        // const qToDos = document.querySelectorAll('strong');
        // console.log('Los ToDos: ', this.ToDos);
       qToDos[1].innerText = (this.ToDos.length === 0)? '0' : this.ToDos.length; 

        return this.ToDos.length;
    } 

}
