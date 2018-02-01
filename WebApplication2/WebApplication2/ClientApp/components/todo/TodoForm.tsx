import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { TextInput } from '../common/TextInput';
//import { SelectInput } from '../common/SelectInput';
import * as TodoState from '../../store/Todos';
//import toastr from 'toastr';

export interface TodoProps {
    todo: TodoState.Todo;
    errors: any;
    saving: boolean;
    onChange: (event: any) => void;
    onSave: (event: any) => void;
}

export class TodoForm extends React.Component<TodoProps, {}> {
    public render() {
        return (
            <form>
                <h1>Manage Course</h1>
                <label htmlFor="id">Id : {this.props.todo.id}</label>
                <TextInput
                    name="name"
                    label="Name"
                    value={this.props.todo.name}
                    onChange={this.props.onChange}
                    error={this.props.errors.name} />
                <label htmlFor="isComplete">Is Complete: {this.props.todo.isComplete.toString()}</label>
                <input
                    type="submit"
                    disabled={this.props.saving}
                    value={this.props.saving ? 'Saving...' : 'Save'}
                    className="btn btn-primary"
                    onClick={this.props.onSave} />
            </form >
        );
    };


}
