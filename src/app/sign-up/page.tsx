import SignUp from "../_components/sign-up";

function SignUpPage() {
  return (
    <div className="flex h-screen w-full  bg-white">
      <div className="hidden h-full flex-1 border-r lg:flex"></div>
      <div className="flex h-full w-full items-center justify-center px-6 lg:w-[500px] lg:px-0">
        <SignUp />
      </div>
    </div>
  );
}

export default SignUpPage;
