import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/api/axios";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/provider/authProvider";
import { useState } from "react";
import { toast } from "react-toastify";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
  firstname: Yup.string()
    .matches(/^[a-zA-Z]+$/, "First name must contain only letters")
    .required("First name is required"),
  lastname: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Last name must contain only letters")
    .required("Last name is required"),
});

export default function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: RegisterFormValues): Promise<void> => {
    setErrorMessage(null); // Clear any previous error
    try {
      const response = await axios.post("/auth/sign-up", values);
      setToken(response.data.accessToken);
      toast.success("Registration successful!. Please login to continue.");
      navigate("/login");
    } catch (error: any) {
      toast.error("Registration failed: " + error?.response?.data?.message?.[0]);
      setErrorMessage("Registration failed: " + error?.response?.data?.message?.[0]);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">
          Register for Matchable
        </h2>
        {errorMessage && (
          <div className="text-sm text-red-600">{errorMessage}</div>
        )}
        <Formik<RegisterFormValues>
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            firstname: "", // Add initial values for firstname and lastname
            lastname: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* First Name Field */}
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <Field
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 mt-1 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                  as={Input}
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Last Name Field */}
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <Field
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 mt-1 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                  as={Input}
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mt-1 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                  as={Input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 mt-1 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                  as={Input}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 mt-1 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                  as={Input}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
