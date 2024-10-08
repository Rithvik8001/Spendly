"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank, BarChart2, Target, Star } from "lucide-react";

const HighlightedText = ({ text }: { text: string }) => (
  <div className="relative inline-block">
    <svg
      className="absolute top-0 left-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M0,50 Q25,45 50,50 T100,50"
        fill="none"
        stroke="hsl(var(--primary) / 0.3)"
        strokeWidth="85"
        strokeLinecap="round"
      />
    </svg>
    <span className="relative z-10 text-7xl font-extrabold text-primary">
      {text}
    </span>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              SPENDLY
            </span>
          </Link>
          <div>
            <Link href="/login">
              <Button variant="ghost" className="mr-2">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-24"
        >
          <div className="mb-8">
            <HighlightedText text="Spendly" />
          </div>
          <p className="text-2xl text-gray-600 mb-4">
            Wisely. Easily. Intelligently.
          </p>
          <p className="text-xl text-gray-500 mb-8">
            Your personal finance companion for smart spending and saving.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-semibold mb-12 text-center">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: PiggyBank,
                title: "Easy Expense Tracking",
                description: "Effortlessly log and categorize your expenses.",
              },
              {
                icon: BarChart2,
                title: "Insightful Analytics",
                description:
                  "Visualize your spending patterns with intuitive charts.",
              },
              {
                icon: Target,
                title: "Budget Planning",
                description:
                  "Set and monitor financial goals with smart budgeting tools.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <feature.icon size={48} className="text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-semibold mb-12 text-center">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "John Doe",
                role: "Freelancer",
                text: "Spendly has revolutionized how I manage my finances! It's intuitive and powerful.",
              },
              {
                name: "Jane Smith",
                role: "Small Business Owner",
                text: "I love how easy it is to track expenses with Spendly. It's a game-changer for my business.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Star className="text-yellow-400 mr-1" />
                      <Star className="text-yellow-400 mr-1" />
                      <Star className="text-yellow-400 mr-1" />
                      <Star className="text-yellow-400 mr-1" />
                      <Star className="text-yellow-400" />
                    </div>
                    <p className="text-gray-600 mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-100 py-8 text-center">
        <p className="text-gray-600">Made with ❤️ by Rithvik</p>
      </footer>
    </div>
  );
}
