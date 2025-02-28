import React from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormControl, FormMessage } from "../ui/form"
import { Input } from "@/components/ui/input"
import { motion } from "motion/react"
import Clock from "./clock"
import { Badge } from "../ui/badge"

const KEYPAD_BUTTONS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "C",
  "B",
  "0",
]

const BundySchema = z.object({
  employeeNumber: z.string().nonempty({ message: "Username is required." }),
})

const BundyClock = () => {
  const form = useForm<z.infer<typeof BundySchema>>({
    resolver: zodResolver(BundySchema),
    values: {
      employeeNumber: "",
    },
  })

  const onSubmit = (payload: z.infer<typeof BundySchema>) =>
    alert(payload.employeeNumber)

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full h-[calc(100vh-5rem)] flex justify-center items-center"
    >
      <div className="flex flex-col gap-2 p-2.5 shadow-2xl bg-opacity-40 bg-white rounded-lg">
        <Form {...form}>
          <form
            className="w-full flex flex-col justify-center gap-3 h-1/2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="employeeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <div className="w-1/2 flex flex-col gap-2 justify-center">
                        <Webcam
                          videoConstraints={{
                            aspectRatio: 1,
                          }}
                          className="h-80 w-80 rounded-lg bg-slate-200"
                          screenshotFormat="image/jpeg"
                          mirrored={false}
                        />
                        <Input
                          placeholder="C0000"
                          {...field}
                          className="bg-white h-10 font-medium uppercase" // Changed text size here
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2 w-80 py-2">
                        {KEYPAD_BUTTONS.map((value: string) => (
                          <Button
                            key={value}
                            className="text-3xl h-[4.6rem] font-semibold"
                            variant="outline"
                            onClick={() =>
                              field.onChange(
                                form.getValues("employeeNumber") + value
                              )
                            }
                            type="button"
                          >
                            {value}
                          </Button>
                        ))}
                        <Button
                          className="h-10 text-3xl font-extrabold col-span-3"
                          type="button"
                          onClick={() =>
                            form.setValue(
                              "employeeNumber",
                              form.getValues("employeeNumber").slice(0, -1)
                            )
                          }
                        >
                          ⬅
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 -mt-2">
              <Button
                size="lg"
                variant="secondary"
                className="w-full bg-blue-900 text-white hover:bg-blue-900/90"
              >
                Time In
              </Button>
              <Button size="lg" variant="destructive" className="w-full">
                Time Out
              </Button>
            </div>
          </form>
        </Form>
        <Badge
          variant="secondary"
          className="flex items-center justify-center w-full h-10 gap-1"
        >
          <Clock
            className="text-xl font-medium text-primary"
            clockFormat="MMMM d, yyyy"
          />
          <Clock
            className="text-xl text-primary font-bold w-[5.3rem]"
            clockFormat="hh:mm:ss"
          />
          <Clock className="text-xl  text-primary font-bold" clockFormat="a" />
        </Badge>
      </div>
    </motion.div>
  )
}

export default BundyClock
