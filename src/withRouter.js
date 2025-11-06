// withRouter.js
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    return (
      <Component
        {...props}
        router={{ navigate, location, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}