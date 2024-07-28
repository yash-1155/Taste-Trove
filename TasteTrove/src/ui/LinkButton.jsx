/* eslint-disable react/prop-types */

import { Link, useNavigation } from 'react-router-dom';

/* eslint-disable no-unused-vars */
function LinkButton({ children, to }) {
  const navigate = useNavigation();
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
