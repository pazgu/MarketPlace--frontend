/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { USER_BASE_URL } from '../constants/url.constant';

const UserProfilePage = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get(`${USER_BASE_URL}/${loggedInUser.userId}`);
        setProducts(response.data.products);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };

    if (loggedInUser) {
      fetchUserProducts();
    }
  }, [loggedInUser, user]);

  if (!loggedInUser) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome, {user?.username}!</p>
      <p>Name: {user?.firstName} {user?.lastName}</p>

      {/* <h2>Products Associated with You</h2>
      {products?.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products?.map((product) => (
            <li key={product._id}>
              <p>{product.name}</p>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default UserProfilePage;