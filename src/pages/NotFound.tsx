import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground">Oops! This snack isn't on the menu 🍪</p>
        <p className="text-sm text-muted-foreground">Looks like you've wandered off the snack path!</p>
        <a 
          href="/" 
          className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
        >
          Return to Kitchen 🏠
        </a>
      </div>
    </div>
  );
};

export default NotFound;
