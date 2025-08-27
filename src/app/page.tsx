import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Users, Mail, Download, Phone } from "lucide-react";

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

export default function LandingPage() {
    return (
        <div className="bg-background text-foreground">
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <h1 className="text-2xl font-bold text-primary font-headline">VidyaAttend</h1>
                    <Button asChild>
                        <Link href="/login">Login / Sign Up</Link>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8 space-y-16">
                {/* Hero Section */}
                <section className="text-center">
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
                    <h3 className="text-3xl font-bold text-center mb-8">Key Features</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index}>
                                <CardContent className="p-6 flex items-center gap-4">
                                    <CheckCircle className="text-primary w-8 h-8 shrink-0"/>
                                    <p className="font-medium">{feature}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Technology and System Flow */}
                <section id="how-it-works" className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl font-bold mb-4">Technology & System Flow</h3>
                        <p className="text-muted-foreground mb-4">
                            We use modern, reliable technology to create a lightweight and accessible system. The entire application is built on the Next.js framework with React, ensuring a fast and responsive user experience. Facial recognition is powered by cutting-edge AI models from Google.
                        </p>
                        <Card>
                            <CardHeader>
                                <CardTitle>System Flow</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                                        <div className="w-px h-16 bg-border"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Student Entry</h4>
                                        <p className="text-sm text-muted-foreground">Teacher captures a photo of entering students using a simple smartphone.</p>
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
                                        <h4 className="font-semibold">Report Generation</h4>
                                        <p className="text-sm text-muted-foreground">Attendance is automatically logged, and reports are instantly generated for administrators.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="flex justify-center">
                        <Image src="https://picsum.photos/600/700" width={600} height={700} alt="System flowchart diagram" className="rounded-lg shadow-xl" data-ai-hint="system flowchart" />
                    </div>
                </section>

                {/* The Impact */}
                <section id="impact" className="bg-muted -mx-4 md:-mx-8 p-4 md:p-8 rounded-lg">
                    <div className="container mx-auto">
                        <h3 className="text-3xl font-bold text-center mb-8">Why It Matters: The Impact</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    </div>
                </section>
                
                 {/* Team Section */}
                <section id="team">
                    <h3 className="text-3xl font-bold text-center mb-8">Our Team</h3>
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
                     <div className="max-w-3xl mx-auto space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>What is the cost of the system?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>The software is open-source and free. We aim to keep hardware requirements minimal (a basic smartphone) to ensure accessibility for all schools.</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>How is data privacy and security handled?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>All data is stored locally on the device, not on external servers. Photos are processed in memory and immediately discarded. We adhere to strict privacy principles to protect student data.</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Do you provide technical support?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Yes, we provide documentation and community support. For our official pilot school partners, we offer dedicated technical assistance to ensure smooth implementation.</p>
                            </CardContent>
                        </Card>
                     </div>
                </section>
            </main>

            <footer className="border-t">
                <div className="container mx-auto p-8 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} VidyaAttend. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
