
import { Navigate } from "react-router-dom";

function HomePage() {

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>Home</div>
  );
}

export default HomePage;