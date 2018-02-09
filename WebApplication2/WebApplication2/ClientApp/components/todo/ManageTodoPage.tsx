import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as TodoState from '../../store/Todos';
import { TodoList } from '../todo/TodoList';
import { TodoForm } from '../todo/TodoForm';
import * as toastr from "react-redux-toastr";


export interface localProps {
    todo: TodoState.Todo
}

type TodoProps =
    localProps      // ... state we've requested from the Redux store
    & typeof TodoState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ id: string }>;


export interface localState {
    todo: TodoState.Todo;
    errors: string;
    saving: boolean;
    onChange: (event: any) => void;
    onSave: (event: any) => void;
    onDelete: (event: any) => void;
}


export class ManageTodoPage extends React.Component<TodoProps, localState> {

    constructor(props: TodoProps) {
        super(props);

        this.state = {
            todo: props.todo,
            errors: "",
            saving: false,
            onChange: this.onChange,
            onSave: this.saveTodo,
            onDelete: this.deleteTodo
        }; // using local state with saving option

        this.onChange = this.onChange.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);

    }

    componentWillReceiveProps(nextProps: TodoProps) {
        if (this.props.todo.id != nextProps.todo.id) {
            // Necessary to populate form when existing course is loaded directly
            this.setState({ todo: Object.assign({}, nextProps.todo) });
        }
    }




    public onChange(event: any): void {
        let todo = Object.assign({}, this.state.todo);
        switch (event.target.name) {
            case "id": {
                todo.id = event.target.value;
                break;
            }
            case "name": {
                todo.name = event.target.value;
                break;
            }
            case "isComplete": {
                todo.isComplete = event.target.value;
                break;
            }
            default: {
                break;
            }
        }
        return this.setState({ todo: todo });
    }

    formIsValid() {
        let formIsValid = true;
        //let errors = ;

        if (this.state.todo.name.length < 2) {
            let errors = 'Name must be at least 5 characters.';
            formIsValid = false;
            this.setState({ errors: errors });
        }

        return formIsValid;
    }

    saveTodo(event: any) {
        event.preventDefault();

        if (!this.formIsValid()) {
            return;
        }


        const todoId = this.props.match.params.id; // from the path 'todo/id'
        if (todoId) {
            Promise.resolve(this.props.editTodo(this.state.todo));
        }
        else {
            Promise.resolve(this.props.saveTodo(this.state.todo));
        }

       
        this.setState({ saving: false });
        this.redirect();

    }

    deleteTodo(event: any) {
        event.preventDefault();
        console.log(this.props);
        const todoId = this.props.match.params.id; // from the path 'todo/id'
        if (todoId) {
            let id = Number(this.state.todo.id);
            Promise.resolve(this.props.deleteTodo(id)).then(s => alert("Done"));
        }
        this.redirect();
    }

    redirect() {
        this.setState({ saving: false });
        this.props.history.push('/todos');
    }

    render() {
        return (
            <TodoForm
                todo={this.state.todo}
                errors={this.state.errors}
                saving={this.state.saving}
                onChange={this.onChange}
                onSave={this.saveTodo}
                onDelete={this.deleteTodo}
            />
        );
    }
};


const mapStateToProps = (state: ApplicationState, ownProps: TodoProps) => {
    const todoId = ownProps.match.params.id; // from the path 'course/id'
    console.log(todoId);
    let todo = { name: '', isComplete: false };

    if (todoId) {
        return {
            todo: state.todos.todos.filter(x => x.id === Number(ownProps.match.params.id))[0]
        }
    }

    return {
        todo: todo
    }
}

export default connect(
    mapStateToProps,
    TodoState.actionCreators                 // Selects which action creators are merged into the component's props
)(ManageTodoPage) as typeof ManageTodoPage;


