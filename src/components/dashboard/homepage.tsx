"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Users, BarChart3 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Homepage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="overflow-x-hidden">
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted text-foreground">
      
      {/* NAVBAR */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="w-full text-2xl font-bold text-pink-400 justify-start">STEER.</h1>

          <div className="flex gap-2">
            {!user ? (
              <>
                <Link href="/signin">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <Badge className="mb-4">New SaaS Platform</Badge>

        <h2 className="text-3xl md:text-4xl font-bold">
          Manage Projects with AI
        </h2>

        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Smart task planning, team collaboration, and AI-powered productivity.
        </p>
            
        <div className="mt-16 flex flex-wrap xl:pt-10  justify-center gap-3">
        <Button className="mt-6 px-6 py-2  hover:scale-105 transition">Start Free</Button>
        <Button variant="outline" className="mt-6 px-6 py-2 hover:scale-105 transition">Learn More</Button>        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Card className="border bg-card hover:shadow-lg transition-all">
            <CardHeader>
              <Rocket className="text-primary" />
              <CardTitle>AI Task Generation</CardTitle>
              <CardDescription>
                Generate tasks instantly using AI.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              Save hours of planning with smart automation.
            </CardContent>
          </Card>

          <Card className="border bg-card hover:shadow-lg transition-all">
            <CardHeader>
              <Users className="text-primary" />
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Work with your team in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              Assign roles and manage projects easily.
            </CardContent>
          </Card>

          <Card className="border bg-card hover:shadow-lg transition-all">
            <CardHeader>
              <BarChart3 className="text-primary" />
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Track performance and insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              Visualize productivity and progress.
            </CardContent>
          </Card>

        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 py-16 text-center ">
        <h3 className="text-xl font-semibold">
          Ready to boost your productivity?
        </h3>

        <p className="text-muted-foreground mt-2">
          Join now and start managing smarter.
        </p>

        <Button className="mt-6 px-6 py-2 hover:scale-105 transition">Get Started Free</Button>
      </section>

    </div>
</div>
  );

}