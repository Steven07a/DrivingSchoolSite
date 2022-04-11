import Link from "next/link";
import { useRouter } from "next/router";
import { Nav, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";

export default function Navbar() {
  const router = useRouter();
  const handleClick = async () => {
    try {
      await Auth.signOut();
      router.push("/");
    } catch (error) {
      // need to implement error handling here
    }
  };
  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-xl">
        <Link href="/">
          <a className="navbar-brand">SPass</a>
        </Link>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowraap">
            <Button className="btn btn-light" onClick={handleClick}>
              Sign out
            </Button>
          </li>
        </ul>
      </div>
    </Nav>
  );
}
