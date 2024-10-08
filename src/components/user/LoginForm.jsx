import { useForm } from "react-hook-form"
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
    const {register, handleSubmit} = useForm();
    const {login, isPending} = useLogin();

    function onSubmit(data) {
        login(data);
    }

    return (
        <div className="flex justify-center items-center min-h-screen mt-3 mb-5">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                alt="Login Banner"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h5 className="text-xl font-bold mb-4 text-center">Login</h5>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="form-input border-2 p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      type="text"
                      id="username"
                      name="username"
                      autoFocus
                      {...register('username', {required: true})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-input border-2 p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      type="password"
                      id="password"
                      name="password"
                      {...register('password', {required: true})}  
                    />
                  </div>
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                      {isPending ? <SpinnerMini /> : 'Login'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
}

export default LoginForm
