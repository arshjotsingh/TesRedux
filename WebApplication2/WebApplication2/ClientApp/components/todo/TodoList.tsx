import * as React from 'react';
import { TodoListRow } from './TodoListRow';
import * as TodoState from '../../store/Todos'

export interface TodoProps {
    todos: TodoState.Todo[]
}

export const TodoList: React.SFC<TodoProps> = (props) => {

    const { todos } = props;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>IsComplete</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo =>
                    <TodoListRow key={todo.id} todo={todo} />
                )}
            </tbody>
        </table>
    );
};


