
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Users, Mail, Download, Phone, BarChart2, Star, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const features = [
    "One-click attendance marking.",
    "Automated attendance reports.",
    "SMS/email notifications to parents.",
    "Real-time data synchronization.",
    "Offline mode for low-connectivity areas."
];

const benefits = {
    teachers: "Reduces administrative work by up to 3 hours per week.",
    students: "Increases instructional time by up to 15 minutes per day.",
    administrators: "Ensures 100% accurate data for government reporting.",
    government: "Enables data-driven decision-making for resource allocation."
}

const team = [
    { name: "Priya Sharma", role: "Lead Developer", skills: "Full-stack development, AI/ML integration.", avatar: "https://picsum.photos/100/100?random=1", dataAiHint: "woman smiling" },
    { name: "Amit Patel", role: "Project Manager", skills: "Agile methodologies, Ed-Tech expert.", avatar: "https://picsum.photos/100/100?random=2", dataAiHint: "man professional" },
    { name: "Sunita Reddy", role: "UI/UX Designer", skills: "User-centric design for low-literacy users.", avatar: "https://picsum.photos/100/100?random=3", dataAiHint: "woman happy" },
]

const testimonials = [
    { quote: "VidyaAttend has transformed our attendance process. It's simple, fast, and frees up so much time for teaching.", name: "Mrs. Anjali Mehta", role: "Teacher, Pilot School" },
    { quote: "The accuracy of the reports is a game-changer for our administrative tasks and for meeting government compliance.", name: "Mr. Rajeev Verma", role: "School Principal" },
    { quote: "Finally, a solution that understands the challenges of rural education. The offline mode is a lifesaver for us.", name: "Ms. Deepa Krishnan", role: "NGO Partner" },
]

const costData = [
  { name: "Manual System", cost: 3000, fill: "hsl(var(--destructive))" },
  { name: "VidyaAttend", cost: 500, fill: "hsl(var(--primary))" },
]

export default function LandingPage() {
    return (
        <div className="bg-background text-foreground">
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <h1 className="text-2xl font-bold text-primary font-headline">VidyaAttend</h1>
                    <nav className="hidden md:flex gap-6">
                       <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary">Features</Link>
                       <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary">How It Works</Link>
                       <Link href="#impact" className="text-sm font-medium text-muted-foreground hover:text-primary">Impact</Link>
                       <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary">Contact</Link>
                    </nav>
                    <Button asChild>
                        <Link href="/login">Login / Sign Up</Link>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8 space-y-24">
                {/* Hero Section */}
                <section className="text-center pt-8">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">Revolutionizing Attendance in Rural Schools</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        VidyaAttend is a smart, simple, and scalable solution to ensure every child's presence is counted, bridging the gap between technology and rural education.
                    </p>
                    <div className="flex justify-center">
                        <Image src="https://picsum.photos/800/400" width={800} height={400} alt="Happy students in a classroom" className="rounded-lg shadow-2xl" data-ai-hint="happy students" />
                    </div>
                </section>

                {/* Key Features */}
                <section id="features">
                    <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="transform hover:scale-105 transition-transform duration-300">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <CheckCircle className="text-primary w-8 h-8 shrink-0"/>
                                    <p className="font-medium">{feature}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Technology and System Flow */}
                <section id="how-it-works" className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="text-3xl font-bold mb-4">Technology & System Flow</h3>
                        <p className="text-muted-foreground mb-4">
                            We use modern, reliable technology to create a lightweight and accessible system. The entire application is built on the Next.js framework with React, ensuring a fast and responsive user experience. Facial recognition is powered by cutting-edge AI models from Google.
                        </p>
                         <p className="text-muted-foreground mb-6">
                            Hardware requirements are minimal: just a basic smartphone with a camera. The software is a lightweight web application designed to work well even in low-bandwidth environments.
                        </p>
                        <Card>
                            <CardHeader>
                                <CardTitle>The 3-Step Process</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                                        <div className="w-px h-16 bg-border"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Capture Photo</h4>
                                        <p className="text-sm text-muted-foreground">Teacher captures a single photo of entering students using a simple smartphone.</p>
                                    </div>
                                </div>
                                 <div className="flex items-start gap-4">
                                     <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                                        <div className="w-px h-16 bg-border"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">AI Recognition</h4>
                                        <p className="text-sm text-muted-foreground">The photo is securely analyzed by our AI to identify students from the enrolled roster.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                     <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h4 className="font-semibold">Generate Reports</h4>
                                        <p className="text-sm text-muted-foreground">Attendance is automatically logged, and reports are instantly available for administrators.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="flex justify-center">
                        <Image src="https://picsum.photos/600/700" width={600} height={700} alt="System flowchart diagram" className="rounded-lg shadow-xl" data-ai-hint="system flowchart" />
                    </div>
                </section>
                
                 {/* Reports and Analytics Section */}
                <section id="reports">
                     <h3 className="text-3xl font-bold text-center mb-4">Powerful, Role-Based Dashboards</h3>
                     <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">Get the right information to the right people, instantly. VidyaAttend provides tailored dashboards for every stakeholder.</p>
                     <Tabs defaultValue="teacher" className="w-full">
                        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                            <TabsTrigger value="teacher">For Teachers</TabsTrigger>
                            <TabsTrigger value="admin">For Admins</TabsTrigger>
                            <TabsTrigger value="gov">For Government</TabsTrigger>
                        </TabsList>
                        <TabsContent value="teacher">
                             <Card className="mt-6">
                                <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-center">
                                    <Image src="https://picsum.photos/600/400?random=4" width={600} height={400} alt="Teacher Dashboard" className="rounded-md" data-ai-hint="dashboard analytics" />
                                    <div>
                                        <h4 className="text-xl font-semibold mb-2">Daily Classroom Management</h4>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> At-a-glance summary of present, absent, and tardy students.</li>
                                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> Actionable insights on students with frequent absences.</li>
                                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> Quick access to mark attendance and view student history.</li>
                                        </ul>
                                    </div>
                                </CardContent>
                             </Card>
                        </TabsContent>
                        <TabsContent value="admin">
                             <Card className="mt-6">
                                <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-center">
                                     <Image src="https://picsum.photos/600/400?random=5" width={600} height={400} alt="Admin Dashboard" className="rounded-md" data-ai-hint="school administration" />
                                    <div>
                                        <h4 className="text-xl font-semibold mb-2">School-Wide Oversight</h4>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> Real-time attendance rate for the entire school.</li>
                                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> Class-wise breakdown to identify areas needing attention.</li>
                                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> Automated mid-day meal counts and government-ready reports.</li>
                                        </ul>
                                    </div>
                                </CardContent>
                             </Card>
                        </TabsContent>
                        <TabsContent value="gov">
                            <Card className="mt-6">
                                <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-center">
                                     <Image src="https://picsum.photos/600/400?random=6" width={600} height={400} alt="Government Dashboard" className="rounded-md" data-ai-hint="government data" />
                                    <div>
                                        <h4 className="text-xl font-semibold mb-2">District & Regional Insights</h4>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> Aggregated attendance data across multiple schools.</li>
                                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> Data-driven insights for resource allocation and policy making.</li>
                                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> Compliance tracking for government education schemes.</li>
                                        </ul>
                                    </div>
                                </CardContent>
                             </Card>
                        </TabsContent>
                    </Tabs>
                </section>


                {/* The Impact */}
                <section id="impact" className="bg-muted -mx-4 md:-mx-8 p-4 md:p-12 rounded-lg">
                    <div className="container mx-auto">
                        <h3 className="text-3xl font-bold text-center mb-12">Why It Matters: The Impact</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>For Teachers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{benefits.teachers}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>For Students</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{benefits.students}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>For Admins</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{benefits.administrators}</p>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle>For Government</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{benefits.government}</p>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className="mt-12">
                            <CardHeader>
                                <CardTitle className="flex items-center"><TrendingUp className="mr-2"/>Cost-Benefit Analysis</CardTitle>
                                <CardDescription>Estimated annual cost per school for attendance management.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[250px] w-full">
                               <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={costData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => `₹${value}`} />
                                    <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                                        {costData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                               </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </section>
                
                {/* Testimonials */}
                <section id="testimonials">
                    <h3 className="text-3xl font-bold text-center mb-12">Trusted by Educators</h3>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="flex flex-col">
                                <CardContent className="p-6 flex-1">
                                    <Star className="text-amber-400 fill-amber-400 mb-2" />
                                    <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                                </CardContent>
                                <CardHeader className="pt-0">
                                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                    <CardDescription>{testimonial.role}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>

                 {/* Team Section */}
                <section id="team">
                    <h3 className="text-3xl font-bold text-center mb-12">Our Team</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                       {team.map(member => (
                           <div key={member.name} className="text-center">
                               <Image src={member.avatar} width={100} height={100} alt={member.name} className="rounded-full mx-auto mb-4" data-ai-hint={member.dataAiHint} />
                               <h4 className="font-bold text-lg">{member.name}</h4>
                               <p className="text-primary font-medium">{member.role}</p>
                               <p className="text-sm text-muted-foreground">{member.skills}</p>
                           </div>
                       ))}
                    </div>
                </section>


                {/* CTA and Contact */}
                <section id="contact" className="text-center bg-card p-8 rounded-lg shadow-lg">
                     <h3 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h3>
                     <p className="text-muted-foreground max-w-2xl mx-auto mb-6">We're looking for NGO partners, pilot schools, and funding opportunities to expand our reach. Connect with us to learn more.</p>
                     <div className="flex flex-wrap justify-center gap-4">
                         <Button size="lg" variant="default">
                            <Mail className="mr-2"/> Partner with Us
                         </Button>
                         <Button size="lg" variant="secondary">
                            <Download className="mr-2"/> Download Media Kit
                         </Button>
                     </div>
                </section>

                {/* FAQ */}
                <section id="faq">
                     <h3 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
                     <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>What is the cost of the system?</AccordionTrigger>
                                <AccordionContent>
                                The software is open-source and free. We aim to keep hardware requirements minimal (a basic smartphone) to ensure accessibility for all schools.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>How is data privacy and security handled?</AccordionTrigger>
                                <AccordionContent>
                                All data is stored locally on the device, not on external servers. Photos are processed in memory and immediately discarded. We adhere to strict privacy principles to protect student data.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Do you provide technical support?</AccordionTrigger>
                                <AccordionContent>
                                Yes, we provide documentation and community support. For our official pilot school partners, we offer dedicated technical assistance to ensure smooth implementation.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                     </div>
                </section>
            </main>

            <footer className="border-t mt-24">
                <div className="container mx-auto p-8 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} VidyaAttend. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

    