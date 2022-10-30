
import { ToDo } from "./todo.class";
const qToDos = document.querySelectorAll('strong');


export class ToDoList {

    constructor() {

        // this.ToDos = [];
        this.loadLocalStorage();
        this.totalToDos();
        this.pendientesToDos();
        this.completadosToDos();

    }

    addToDo( tarea ) {
        this.ToDos.push( tarea );
        this.saveLocalStorage();
        this.pendientesToDos();
        this.totalToDos();
        this.completadosToDos();


    }

    deleteToDo( id ) {
        this.ToDos = this.ToDos.filter( ToDo => ToDo.id != id );
        this.saveLocalStorage();
        this.pendientesToDos();
        this.totalToDos();
        this.completadosToDos();
        
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
        this.pendientesToDos();
        this.totalToDos();
        this.completadosToDos();
        

    }

    saveLocalStorage() {
        localStorage.setItem(   'tarea', JSON.stringify( this.ToDos ) );
        localStorage.setItem( 'Total', this.totalToDos() );
        localStorage.setItem( 'Pendientes', this.pendientesToDos() );
        localStorage.setItem( 'Pendientes', this.completadosToDos() );

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

    pendientesToDos() {
        
        let pendientes = 0;

        this.ToDos.forEach( todo => {
            
            if( todo.completado === !true ) {
    
                pendientes++;
            }

        });

        qToDos[0].innerText = `${pendientes}`;

        return pendientes;
    }

    completadosToDos() {
        
        let completados = 0;

        this.ToDos.forEach( todo => {
            
            if( todo.completado === true ) {
    
                completados++ ;
            }

        });

        qToDos[1].innerText = `${completados}`;

        return completados;
    }

    totalToDos() {
        // const qToDos = document.querySelectorAll('strong');
        // console.log('Los ToDos: ', this.ToDos);
       qToDos[2].innerText = (this.ToDos.length === 0)? '0' : this.ToDos.length; 

        return this.ToDos.length;
    } 

}
