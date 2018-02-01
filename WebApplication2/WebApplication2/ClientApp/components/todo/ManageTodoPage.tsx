import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as TodoState from '../../store/Todos';
import { TodoList } from '../todo/TodoList';
import { TodoForm } from '../todo/TodoForm';


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
}


export class ManageTodoPage extends React.Component<TodoProps, localState> {

    constructor(props: TodoProps) {
        super(props);

        this.state = {
            todo: props.todo,
            errors: "",
            saving: false,
            onChange: this.onChange,
            onSave: this.saveTodo
        }; // using local state with saving option

        this.onChange = this.onChange.bind(this);
        this.saveTodo = this.saveTodo.bind(this);

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

    courseFormIsValid() {
        let formIsValid = true;
        //let errors = ;

        if (this.state.todo.name.length < 5) {
            let errors = 'Name must be at least 5 characters.';
            formIsValid = false;
            this.setState({ errors: errors });
        }

        return formIsValid;
    }

    saveTodo(event: any) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }


        this.props.saveTodo(this.state.todo);
        this.setState({ saving: false });


    }

    redirect() {
        //this.setState({ saving: false });
        //toastr.success('Course Saved');
        //this.context.router.push('/courses');
    }

    render() {
        return (
            <TodoForm
                todo={this.state.todo}
                errors={this.state.errors}
                saving={this.state.saving}
                onChange={this.onChange}
                onSave={this.saveTodo}
            />
        );
    }
};

export default connect(
    (state: ApplicationState, ownProps: TodoProps) => ({ todo: state.todos.todos.filter(x => x.id === Number(ownProps.match.params.id))[0] }), // Selects which state properties are merged into the component's props
    TodoState.actionCreators                 // Selects which action creators are merged into the component's props
)(ManageTodoPage) as typeof ManageTodoPage;


