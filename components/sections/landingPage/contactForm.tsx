import { Button } from "@/components/ui/button";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        });

        const result = await response.json();
        setResponseMessage(result.message);
    } catch (error) {
        console.error("Error sending email:", error);
        setResponseMessage("Error sending email");
    } finally {
        setIsSubmitting(false);
    }
    };

    return (
        <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeInWhenVisible>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                    <p className="md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Ready to transform your construction business? Contact us today and discover how BuildMarketLk can help
                        you succeed.
                    </p>
                </div>
            </FadeInWhenVisible>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <FadeInWhenVisible>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Address</h4>
                            <p className="text-gray-600 text-sm">
                                4, 1/2 Bambalapitiya Dr,
                                <br />
                                Colombo 00400, Sri Lanka
                            </p>
                        </div>
                    </div>

                    <a href="tel:+94771234567" className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Phone</h4>
                                <p className="text-gray-600">+94 72 040 0929</p>
                            </div>
                    </a>

                    <a href="mailto:info@buildmarketlk.com" className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Mail className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Email</h4>
                                <p className="text-gray-600">info@buildmarketlk.com</p>
                            </div>
                    </a>
                </div>
              </FadeInWhenVisible>

              {/* Contact Form */}
              <FadeInWhenVisible>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                        </label>
                        <Input
                        id="name"
                        type="text"
                        required
                        className="w-full"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        />
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <Input id="email" type="email" required className="w-full" placeholder="Enter your email address" value={formData.email} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                        </label>
                        <Input id="subject" type="text" required className="w-full" placeholder="How can we help you?" value={formData.subject} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                        </label>
                        <Textarea
                            id="message"
                            required
                            rows={5}
                            className="w-full"
                            placeholder="Tell us more about your inquiry..."
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-start space-x-3">
                        <input
                            id="consent"
                            type="checkbox"
                            required
                            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor="consent" className="text-sm text-gray-600">
                            I agree to receive communications from BuildMarketLk and understand that I can unsubscribe at any
                            time.
                        </label>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending" : "Send Message"}
                        {isSubmitting ? <Loader className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                    </Button>
                </form>
                {responseMessage && <p className="mt-4 text-center text-sm text-gray-600">{responseMessage}</p>}
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </section>
    )
}