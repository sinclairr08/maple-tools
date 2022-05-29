import { NextPage } from "next";
import Footer from "./Footer";
import Header from "./Header";

const Layout: NextPage = ({ children }) => {
  return (
    <div className="w-full ">
      <Header />
      <div className="my-20">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
