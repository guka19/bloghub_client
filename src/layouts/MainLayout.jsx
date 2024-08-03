import { Outlet } from "react-router-dom";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
