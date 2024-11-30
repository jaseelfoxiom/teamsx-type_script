// "use client"

// import React, { useState } from "react"
// import { Eye, EyeOff } from 'lucide-react'
// import { Formik, Form, Field, FormikProps } from "formik"
// import * as Yup from "yup"
// import { useMutation, UseMutationResult } from '@tanstack/react-query'
// import { apiCall } from "@/service/apiCall"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useAuth } from "@/provider/AuthProvider"
// import { toast } from "@/hooks/use-toast"

// interface LoginFormValues {
//   email: string
//   password: string
// }

// // Validation schema
// const validationSchema = Yup.object({
//   email: Yup.string().required("Email is required"),
//   password: Yup.string().required("Password is required"),
// })

// // API call for login (using apiCall utility)
// const loginUser = async (credentials: LoginFormValues) => {
//   const response = await apiCall("post", "/login", credentials) // Adjust endpoint as needed
//   return response.message // Assuming your response structure has 'message' containing user data or token
// }

// export default function Login() {
//   const { login } = useAuth()
//   const [showPassword, setShowPassword] = useState(false)

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   // React Query's useMutation hook to handle login
//   const LoginMutation: UseMutationResult<any, Error, LoginFormValues, unknown> = useMutation({
//     mutationFn: (values) => login(values),
//     onSuccess: (data) => {
//         toast({
//             variant: "success",
//             description: "Logged in successfully",
//           });
//           navigate(PATHS.BASE_PATH, { replace: true });
//     },
//     onError: (error: Error) => {
//       console.error("Login error:", error.message)
//     },
//   })

//   const handleSubmit = (values: LoginFormValues) => {
//     LoginMutation.mutate(values) // Use mutate directly in the onSubmit function
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//           <CardDescription className="text-center">
//             Enter your credentials to access your account
//           </CardDescription>
//         </CardHeader>
//         <Formik
//           initialValues={{ email: "", password: "" }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ handleChange, handleBlur, values, errors, touched }: FormikProps<LoginFormValues>) => (
//             <Form>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Field
//                     as={Input}
//                     id="email"
//                     name="email"
//                     type="text"
//                     placeholder="Enter your email"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.email}
//                   />
//                   {errors.email && touched.email && (
//                     <p className="text-sm text-red-500">{errors.email}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <div className="relative">
//                     <Field
//                       as={Input}
//                       id="password"
//                       name="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       value={values.password}
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="icon"
//                       className="absolute right-0 top-0 h-full px-3 py-2"
//                       onClick={togglePasswordVisibility}
//                       aria-label={showPassword ? "Hide password" : "Show password"}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </Button>
//                   </div>
//                   {errors.password && touched.password && (
//                     <p className="text-sm text-red-500">{errors.password}</p>
//                   )}
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button
//                   className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold"
//                   type="submit"
//                   disabled={LoginMutation.isPending} // Use isLoading from mutation
//                 >
//                   {LoginMutation.isPending ? 'Logging in...' : 'Log in'}
//                 </Button>
//                 {LoginMutation.isError && (
//                   <p className="text-sm text-red-500 mt-2">Error: {LoginMutation.error?.message}</p>
//                 )}
//               </CardFooter>
//             </Form>
//           )}
//         </Formik>
//       </Card>
//     </div>
//   )
// }
"use client"

import React, { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'
import { Formik, Form, Field, FormikProps } from "formik"
import * as Yup from "yup"
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { apiCall } from "@/service/apiCall"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/provider/AuthProvider"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom" // Add this import
import { PATHS } from "@/constants/paths"
interface LoginFormValues {
  email: string
  password: string
}

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
})

// API call for login (using apiCall utility)
const loginUser = async (credentials: LoginFormValues) => {
  const response = await apiCall("post", "/login", credentials) // Adjust endpoint as needed
  return response.message // Assuming your response structure has 'message' containing user data or token
}

export default function Login() {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate() // Initialize navigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // React Query's useMutation hook to handle login
  const LoginMutation: UseMutationResult<any, Error, LoginFormValues, unknown> = useMutation({
    mutationFn: (values) => login(values),
    onSuccess: (data) => {
        toast({
            variant: "default", // Change this to "default" or another valid variant
            description: "Logged in successfully",
          });
          navigate(PATHS.BASE_PATH, { replace: true });
    },
    onError: (error: Error) => {
      console.error("Login error:", error.message)
    },
  })

  const handleSubmit = (values: LoginFormValues) => {
    LoginMutation.mutate(values) // Use mutate directly in the onSubmit function
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values, errors, touched }: FormikProps<LoginFormValues>) => (
            <Form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold"
                  type="submit"
                  disabled={LoginMutation.isPending} // Use isLoading from mutation
                >
                  {LoginMutation.isPending ? 'Logging in...' : 'Log in'}
                </Button>
                {LoginMutation.isError && (
                  <p className="text-sm text-red-500 mt-2">Error: {LoginMutation.error?.message}</p>
                )}
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}
