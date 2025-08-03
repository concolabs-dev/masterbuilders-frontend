import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible"
import Image from "next/image"

export default function AboutUsSection() {
    return (
        <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h2>
                <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
BuildMarketLK is a pioneering joint venture formed by four industry leaders: the Ceylon Institute of Builders (CIOB), QSERVE, VFORM Consultants, and Concolabs. Together, we are reshaping Sri Lanka's construction landscape by technology-driven virtual and informative single window construction market access platform for all construction industry stakeholders and all other users.
                </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ceylon Institute of Builders */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardHeader className="text-center">
                <div className="w-25 aspect-square mx-auto flex items-center justify-center">
                    <Image
                        src="/images/ciob.jpg"
                        alt="CIOB Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">Ceylon Institute of Builders</CardTitle>
                </CardHeader>
                <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    The leading professional body representing construction management in Sri Lanka, CIOB SL upholds industry excellence through membership accreditation, continuing professional development, and policy advocacy. Acting as a catalyst for elevating construction standards, the institute promotes ethical conduct, managerial competence, and knowledge exchange, driving the local industry in line with international best practices.
                </CardDescription>
                </CardContent>
            </Card>

            {/* VFORM Consultants */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardHeader className="text-center">
                <div className="w-25 aspect-square mx-auto flex items-center justify-center">
                    <Image
                        src="/images/vform.jpeg"
                        alt="VFORM Consultants Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">VFORM Consultants</CardTitle>
                </CardHeader>
                <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    A long standing reputed Quantity Surveying firm, contributes its expertise in cost and contracts management in providing contemporary cost data, cost information analysis, cost estimation, contract formulation advisory, contractual document reviews and Research and Development inputs together with commercial mediation services ensuring reliable and synergetic professional inputs across the platform with the other partners.
                </CardDescription>
                </CardContent>
            </Card>

            {/* Qserve */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardHeader className="text-center">
                <div className="w-25 aspect-square mx-auto flex items-center justify-center">
                    <Image
                        src="/images/qserve.jpeg"
                        alt="qserve Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">Qserve</CardTitle>
                </CardHeader>
                <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    A well-established and respected Quantity Surveying consultancy, offering specialized services in cost management, contract administration, procurement advisory, dispute resolution, and construction economics. With a strong foundation in industry best practices, QServe contributes analytical cost data, tender documentation support, and professional consultancy, ensuring dependable and collaborative inputs across multidisciplinary project environments.
                </CardDescription>
                </CardContent>
            </Card>

            {/* Concolabs */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardHeader className="text-center">
                <div className="w-25 aspect-square mx-auto flex items-center justify-center">
                    <Image
                        src="/images/concolabs.svg"
                        alt="Concolabs Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">Concolabs</CardTitle>
                </CardHeader>
                <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    An emerging force in construction technology, Concolabs Inc. delivers specialized digital solutions focused on automation, artificial intelligence, and integrated platforms for the built environment. Through innovative applications in BIM integration, SaaS product development, and data-driven decision systems, the company provides agile and intelligent tools that empower industry professionals and streamline construction project delivery.
                </CardDescription>
                </CardContent>
            </Card>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    )
}