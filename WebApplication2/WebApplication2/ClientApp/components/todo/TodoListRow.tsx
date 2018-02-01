import * as React from 'react';
import * as TodoState from '../../store/Todos'
import { NavLink, Link } from 'react-router-dom';

export interface TodoListRowProps {
    todo: TodoState.Todo;
}

export const TodoListRow: React.SFC<TodoListRowProps> = (props) => {

    const { todo } = props;

    return (
        <tr>
            <td>{todo.id}</td>
            <td><Link to={'/todo/' + todo.id}>{todo.name}</Link></td>
            <td>{todo.isComplete.toString()}</td>
        </tr>
    );
}; 
