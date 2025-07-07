import React from 'react';
import { Leaf, Users, TreePine, Award, Target, Heart } from 'lucide-react';
import salCom from '../../images/salcom1.jpeg'; 
import ddey from '../../images/ddey.jpg';
import rdey from '../../images/raimadey.jpg';
import rmitra from '../../images/ratulmitra.jpg';
import mission from '../../images/mission2.jpg'; // Adjust path as needed
export function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We prioritize environmental protection through sustainable harvesting practices that preserve Sal forests for future generations.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Our mission centers on empowering local communities through fair trade practices and direct economic support.'
    },
    {
      icon: TreePine,
      title: 'Forest Conservation',
      description: 'Every purchase contributes to forest conservation efforts and biodiversity protection initiatives.'
    },
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'We celebrate traditional craftsmanship while maintaining the highest quality standards in all our products.'
    }
  ];

  const team = [
    {
      name: 'Debabrata Dey',
      role: 'Founder & CEO',
      // image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      image: ddey,
      description: 'Environmental activist with 15+ years in sustainable business'
    },
    {
      name: 'Raima Dey',
      role: 'Community Relations',
      // image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
      image: rdey,
      description: 'Dedicated to building strong relationships with local artisans'
    },
    {
      name: 'Ratul Mitra',
      role: 'Sustainability Director',
      image: rmitra,
      // image: 'https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Forest conservation expert and environmental scientist'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            // backgroundImage: 'url(https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
            backgroundImage: `url(${salCom})`
          }}
        >
          <div className="absolute inset-0 bg-green-900 bg-opacity-70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Salbon Sustain
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Connecting conscious consumers with authentic Sal forest products
              while supporting local communities and preserving nature.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Salbon Sustain was born from a simple yet powerful vision: to create 
                a sustainable ecosystem where environmental conservation, community 
                empowerment, and conscious consumption work in harmony.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We believe that every purchase should make a positive impact. By 
                connecting you with authentic products from Sal forests, we're not 
                just selling goods – we're preserving traditions, protecting 
                ecosystems, and empowering communities.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Goal</h3>
                  <p className="text-gray-600">Supporting 1,000+ families by 2025</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                // src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800"
                src={mission}
                alt="Sustainable practices"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every 
              relationship we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to making a positive impact 
              through sustainable commerce.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Together, we're making a measurable difference in communities 
              and ecosystems across Sal forest regions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Families Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-green-100">Trees Protected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50</div>
              <div className="text-green-100">Tons CO₂ Offset</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Sustainability Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Every purchase you make helps preserve forests, empower communities, 
            and create a more sustainable future for all.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Start Shopping Sustainably
          </button>
        </div>
      </section>
    </div>
  );
}