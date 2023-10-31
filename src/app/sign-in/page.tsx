import SignIn from "../_components/sign-in";

function SignUpPage() {
  return (
    <div className="flex h-screen w-full  bg-white">
      <div className="h-full flex-1 border-r"></div>
      <div className="flex h-full w-[500px] items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}

export default SignUpPage;
