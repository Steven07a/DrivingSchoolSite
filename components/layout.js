import Navbar from "./navbar";
import { useRouter } from "next/router";

export default function Layout({children}) {
    const router = useRouter();

    // conditionally render the navbar so it doesn't show up on the login screen.
    const showNav = router.pathname == "/" ? false : true;

    return (
        <>
        {showNav && <Navbar/>}
        <main>{children}</main>
        </>
    )
}

