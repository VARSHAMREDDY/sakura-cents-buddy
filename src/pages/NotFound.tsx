import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center font-sakura" style={{ background: 'var(--gradient-sakura)' }}>
      <div className="card-sakura text-center max-w-md mx-4">
        <div className="text-6xl mb-6">🌸</div>
        <h1 className="mb-4 text-4xl font-cute font-bold text-primary">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! This sakura petal got lost in the wind</p>
        <a href="/" className="btn-sakura inline-flex items-center gap-2">
          🏠 Return to Garden
        </a>
      </div>
    </div>
  );
};

export default NotFound;
