
import './style.css';

import { ToDo, ToDoList } from './js/classes';
import { crearToDoHTML } from './js/componentes';



export const todoList = new ToDoList();
todoList.ToDos.forEach( crearToDoHTML ); // Cuando solo hay un(1) argumento se puede enviar unicamente la funcion a realizar.

const newTarea = new ToDo( 'Aprender JS' );

todoList.ToDos[0].imprimirClase();

console.log( 'ToDos: ', todoList.ToDos );




/******************************************************** 
todoList.addToDo( tarea );
tarea.completado = true;

crearToDoHTML( tarea );

***********************************************************/
