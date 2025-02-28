import React from "react"
import { motion } from "motion/react"
import { Card } from "../ui/card"
import Team from "@/assets/svg/team.svg"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form"
import { Separator } from "../ui/separator"
import Icon from "@/assets/images/icon.png"

const LoginSchema = z.object({
  employeeNumber: z.string().nonempty({ message: "Employee No. is required." }),
  password: z.string().nonempty({ message: "Password is required." }),
})

const LoginPage = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    values: {
      employeeNumber: "",
      password: "",
    },
  })

  const onSubmit = (payload: z.infer<typeof LoginSchema>) =>
    alert(payload.employeeNumber)

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full h-[calc(100vh-5rem)] flex justify-center items-center bg-white rounded-lg bg-opacity-50 gap-2"
    >
      <Card className="bg-white w-full h-full flex items-center justify-center p-3">
        <div className="h-full w-3/4 flex items-center justify-center flex-col">
          <Image
            src={Team}
            alt=""
            className="h-3/5 flex-1 drop-shadow-lg shadow-black"
          />
        </div>
        <Separator orientation="vertical" />
        <div className="h-full w-[540px] flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-3/4">
            <Image
              src={Icon}
              alt="icon"
              className="drop-shadow-lg w-1/3 object-contain"
            />
          </div>
          <Form {...form}>
            <form
              className="flex flex-col gap-1.5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="employeeNumber"
                render={({ field }) => (
                  <FormItem className="w-96">
                    <FormLabel>Employee No.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="C0000"
                        {...field}
                        className="bg-white h-10 font-medium uppercase"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-96">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="•••••••"
                        {...field}
                        className="bg-white h-10 font-medium"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-96 mt-2">Sign In</Button>
            </form>
          </Form>
          <span className="absolute bottom-8 text-sm text-muted-foreground">
            (c) C-ONE Development Team 2025
          </span>
        </div>
      </Card>
    </motion.div>
  )
}

export default LoginPage
