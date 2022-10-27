

export class ToDo {

    static fromJson( { id, tarea, completado, creado } ) {

        const tempToDo = new ToDo( tarea );

        tempToDo.id         = id;
        tempToDo.completado = completado;
        tempToDo.creado     = creado;

        return tempToDo;
    }

    constructor( tarea ){

        this.tarea      = tarea;
        
        this.id         = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();

        // this.conteoToDo();
    }

    // conteoToDo = () => {
    //     if(this.ToDos.length === 0){
    //     qToDo.innerText = '0 pendiene(s)';
    //     } else {
    //         qToDo.innerText = `${this.ToDos.length} pendiente(s)`;
    //     }
    // }

    imprimirClase() {
        // console.log( `${ this.id } - ${ this.tarea }` );
    }

}
