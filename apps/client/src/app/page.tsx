"use client"
import BundyClock from "@/components/custom/bundy"
import LoginPage from "@/components/custom/login"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Key, Clock } from "lucide-react"
import React from "react"

const page = () => {
  return (
    <Tabs
      defaultValue="login"
      className="h-screen flex flex-col items-center justify-center w-full bg-slate-200 from-green-900/30 to-green-900/60 overflow-hidden p-3 gap-2"
      orientation="vertical"
    >
      <TabsList className="sm:w-80 md:w-96 shadow-lg">
        <TabsTrigger className="w-1/2" value="login">
          <Key className="h-3" />
          Login Page
        </TabsTrigger>
        <TabsTrigger className="w-1/2" value="bundy">
          <Clock className="h-3" />
          Bundy Clock
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login" asChild>
        <LoginPage />
      </TabsContent>
      <TabsContent value="bundy" asChild>
        <BundyClock />
      </TabsContent>
    </Tabs>
  )
}

export default page
