"use client"


import Link from "next/link";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

import {Button} from "@/components/ui/button"
import {
    Form
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import Image from "next/image";
import {toast} from "sonner";
import FormField from "@/components/FormField";

const formSchema = z.object({
    username: z.string().min(2).max(50),
})

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-in" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}

const AuthForm = ({type}: { type: FormType }) => {
    const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {

            } else {

            }

        } catch (error) {
            console.log(error);
            toast.error("There was an error:")
        }
    }

    const isSignIn = type === "sign-in";

    return (
        <div className={" card-border lg:min-w-[566px]"}>
            <div className={" flex flex-col gap-5 card py-14 px-10 "}>
                <div className={" flex gap-2 justify-center"}>
                    <Image src="/logo.svg" alt="logo" height={32} width={38}/>
                    <h2>MockMate</h2>
                </div>
                <h3>Practice Interview with MockMate</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full mt-3 form space-y-5">
                        {!isSignIn &&
                            <FormField control={form.control} name="name" label="Name" placeholder="Enter your Name"/>}
                        <FormField control={form.control} name="email" label="Email" placeholder="Enter your Email Address"
                                   type="email"/>
                        <FormField control={form.control} name="password" label="Password"
                                   placeholder="Enter your Password" type="password"/>
                        <Button className={"btn"}
                                type="submit">{isSignIn ? 'SignIn' : 'Create an Account'}</Button>
                    </form>
                </Form>

                <p className={" text-center"}>{isSignIn ? "Doesn't Have an Account Yet?" : "Already  Have an Account"}
                    <Link className={" font-bold ml-1"} href={!isSignIn ? '/signin' : '/signup'}>
                        {!isSignIn ? 'Sign In' : 'Sign up'}
                    </Link>
                </p>
            </div>
        </div>
    )
};
export default AuthForm;
