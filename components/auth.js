import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

export default function LoginSignUp() {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    mode: "onBlur", //Need to add input validation
  });

  // Sign-in function
  const onSubmit = async (data) => {
    try {
      const user = await Auth.signIn(data.username, data.password);
      router.push("/users");
    } catch (error) {
      console.log("error signing in ", error);
    }
  };

  // Sign-up

  // Forgot Password

  return (
    <>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-outline form-white mb-4">
                      <input
                        id="username"
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email Address"
                        {...register("username")}
                      />
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        id="password"
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                      />
                    </div>
                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        LOGIN
                      </button>
                    </div>
                  </form>
                </div>

                <div>
                  <p className="mb-0">
                    Forgot your password?{" "}
                    <a href="#!" className="text-white-50 fw-bold">
                      Reset it here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// password 6jvL2Gp5tkrSMM
