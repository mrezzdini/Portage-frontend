import { useLocation, useNavigate, useParams } from 'react-router-dom';

/**
 * withRouter HOC: provides the location, navigate and params to the component.
 *
 * @param {node} Component : component to wrap
 * @author Peter Mollet
 */
const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return (
            <Component
                {...props}
                router={{
                    location,
                    navigate,
                    params,
                }}
            />
        );
    };

    return ComponentWithRouterProp;
};

export default withRouter;
