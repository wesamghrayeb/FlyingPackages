import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const withAuth = (WrappedComponent) => {
  const AuthComponent = () => {
    const history = useHistory();


    useEffect(() => {
        const token = localStorage.getItem('token');
      
        if (!token) {
          // Redirect to the login page if the token is missing
          history.push('/');
        } else {
          try {
            // Decode the token
            const decodedToken = jwt_decode(token);
      
            // Check if the token is expired
            const isTokenExpired = Date.now() > decodedToken.exp * 1000;
      
            if (isTokenExpired) {
              // Redirect to the login page if the token is expired
              history.push('/');
            }
            console.log(decodedToken)
            // Check the user's role
            const userRole = decodedToken.role;
      
            if (userRole === 'S') {
                history.push('/supplierForm');
              // Allow access to the supplierForm page
            } else if (userRole === 'C') {
              // Redirect to the courierForm page if the user is a courier
              history.push('/courierForm');
            } else if (userRole === 'M') {
              // Redirect to the managerForm page if the user is a manager
              history.push('/managerForm');
            } else {
              // Redirect to the login page for unknown roles
              history.push('/');
            }
          } catch (error) {
            console.error('Token decoding error:', error);
            // Redirect to the login page if there's an error decoding the token
            history.push('/');
          }
        }
      }, []);

    return <WrappedComponent />;
  };

  return AuthComponent;
};

export default withAuth;
