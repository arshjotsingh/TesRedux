import * as React from "react";
import * as ReactRedux from 'react-redux';

export interface IWithPersonalizationProps {
    name: string;
}

type HOCWrapped<P, PHoc> = React.ComponentClass<P & PHoc> | React.SFC<P & PHoc>;

export function withPersonalization<P, S>(Component: HOCWrapped<P, IWithPersonalizationProps>): React.ComponentClass<P> {

    class C extends React.Component<P & IWithPersonalizationProps, S> {
        public render(): JSX.Element {
            console.log(this.props);

            const { name, ...rest } = this.props as any;

            return (
                <Component name="Arsh" {...rest} />
                );
        }
    }

    const mapStateToProps = (state: any, ownProps: P): IWithPersonalizationProps => ({
        name: state.name
    });

    return C;
}

export default withPersonalization;

