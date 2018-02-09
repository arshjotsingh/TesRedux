import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as TodoState from '../../store/Todos';
import { TodoList } from '../todo/TodoList';
import { withRouter } from 'react-router';
import * as toastr  from 'toastr';

type TodoProps =
    TodoState.TodoState        // ... state we've requested from the Redux store
    & typeof TodoState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>;



export class TodosPage extends React.Component<TodoProps, {}> {
    constructor(props: TodoProps) {
        super(props);
    }

   
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.getTodos();
    }

    todoRow(todo: TodoState.Todo, index: any) {
        return <div key={index}> {todo.name} </div>;
    }

  
    public render() {
        return (
            <div>
                <h1>Todo List</h1>
                <Link to='/todo' className="btn btn-primary">Add Todo</Link>
                <TodoList todos={this.props.todos} />
                <button type="button" className="btn btn-warning"> {this.props.isFetching ? 'Fetching...' : 'Fetched'}</button>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.todos,
    TodoState.actionCreators
)(TodosPage) as typeof TodosPage; // two function calls

