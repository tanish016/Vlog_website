import Navbar from "../Componentsforpage/nabvar";
import Footer from '../Componentsforpage/footer';
import Home from '../Pages/Home';

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Home />
            <Footer />
        </>
    );
};

export default HomeLayout;