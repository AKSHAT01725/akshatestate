/**
 * Akshat Estate - Property Data
 * 30 properties: 10 per area (Gurukul, Memnagar, Sola)
 * Each area: 1 for sale + 9 for rent
 * Replace demo data with real listings. Images are placeholders.
 */

const PROPERTIES = [
  {
    id: 1,
    title: "3 BHK Apartment for Sale in Gurukul",
    type: "apartment",
    status: "sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    areaUnit: "sq.ft",
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 8500000,
    priceDisplay: "₹85 Lakh",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3be14?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3be14?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80"
    ],
    description: "Spacious 3 BHK apartment in Gurukul with modern amenities, reserved parking and excellent connectivity to SG Highway.",
    amenities: ["Parking", "Lift", "Security", "Power Backup", "Gym"],
    featured: true
  },
  {
    id: 2,
    title: "2 BHK Flat for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    areaUnit: "sq.ft",
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 22000,
    priceDisplay: "₹22,000",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
    ],
    description: "Well-maintained 2 BHK flat for rent in Gurukul. Semi-furnished with modular kitchen and balcony.",
    amenities: ["Parking", "Lift", "Security", "Water Supply"],
    featured: true
  },
  {
    id: 3,
    title: "1 BHK Apartment for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    areaUnit: "sq.ft",
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 12000,
    priceDisplay: "₹12,000",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
    ],
    description: "Compact 1 BHK ideal for singles or couples. Close to markets and public transport in Gurukul.",
    amenities: ["Lift", "Security", "Water Supply"],
    featured: false
  },
  {
    id: 4,
    title: "3 BHK Furnished Flat for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1350,
    areaUnit: "sq.ft",
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "furnished",
    price: 32000,
    priceDisplay: "₹32,000",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3be14?w=800&q=80"
    ],
    description: "Fully furnished 3 BHK with AC, sofa and appliances. Family-friendly society in Gurukul.",
    amenities: ["Parking", "Lift", "Security", "Gym", "Power Backup"],
    featured: false
  },
  {
    id: 5,
    title: "2 BHK Semi-Furnished for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 2,
    bathrooms: 1,
    area: 950,
    areaUnit: "sq.ft",
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 18000,
    priceDisplay: "₹18,000",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
    ],
    description: "Semi-furnished 2 BHK with wardrobe and kitchen cabinets. Quiet residential pocket of Gurukul.",
    amenities: ["Parking", "Lift", "Security"],
    featured: false
  },
  {
    id: 6,
    title: "Shop for Rent in Gurukul",
    type: "shop",
    status: "rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 400,
    areaUnit: "sq.ft",
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 25000,
    priceDisplay: "₹25,000",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
    ],
    description: "Ground-floor shop on main road in Gurukul. Suitable for retail, clinic or office use.",
    amenities: ["Parking", "Power Backup", "Water Supply"],
    featured: false
  },
  {
    id: 8,
    title: "Office Space for Rent in Gurukul",
    type: "office",
    status: "rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 800,
    areaUnit: "sq.ft",
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 28000,
    priceDisplay: "₹28,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
    ],
    description: "Ready office space with cabin and open work area. Ideal for startups and small teams.",
    amenities: ["Parking", "Lift", "Power Backup", "Security"],
    featured: false
  },
  {
    id: 9,
    title: "1 BHK Studio for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    areaUnit: "sq.ft",
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 10000,
    priceDisplay: "₹10,000",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80"
    ],
    description: "Budget-friendly studio apartment near Gurukul circle. Perfect for students or working professionals.",
    amenities: ["Lift", "Security", "Water Supply"],
    featured: false
  },
  {
    id: 10,
    title: "2 BHK Unfurnished for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1050,
    areaUnit: "sq.ft",
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "furnished",
    price: 16000,
    priceDisplay: "₹16,000",
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80"
    ],
    description: "Unfurnished 2 BHK so you can set it up your way. Gated society with 24x7 security.",
    amenities: ["Parking", "Lift", "Security", "Power Backup"],
    featured: false
  },
  {
    id: 11,
    title: "2 BHK Apartment for Sale in Memnagar",
    type: "apartment",
    status: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1050,
    areaUnit: "sq.ft",
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 5800000,
    priceDisplay: "₹58 Lakh",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
    ],
    description: "Bright 2 BHK for sale in Memnagar with open kitchen and two balconies. Walking distance to markets.",
    amenities: ["Parking", "Lift", "Security", "Water Supply"],
    featured: true
  },
  {
    id: 12,
    title: "3 BHK Flat for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1400,
    areaUnit: "sq.ft",
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 35000,
    priceDisplay: "₹35,000",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3be14?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3be14?w=800&q=80"
    ],
    description: "Spacious 3 BHK rental in a reputed Memnagar society. Semi-furnished with covered parking.",
    amenities: ["Parking", "Lift", "Security", "Gym", "Power Backup"],
    featured: true
  },
  {
    id: 13,
    title: "1 BHK Flat for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    areaUnit: "sq.ft",
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 11000,
    priceDisplay: "₹11,000",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
    ],
    description: "Affordable 1 BHK near Memnagar crossroads. Ideal for students and first-time renters.",
    amenities: ["Lift", "Security", "Water Supply"],
    featured: false
  },
  {
    id: 14,
    title: "2 BHK Furnished for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    areaUnit: "sq.ft",
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "furnished",
    price: 24000,
    priceDisplay: "₹24,000",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80"
    ],
    description: "Fully furnished 2 BHK with AC and appliances. Ready to move in Memnagar.",
    amenities: ["Parking", "Lift", "Security", "Power Backup"],
    featured: false
  },
  {
    id: 15,
    title: "Shop for Rent in Memnagar",
    type: "shop",
    status: "rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 350,
    areaUnit: "sq.ft",
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 30000,
    priceDisplay: "₹30,000",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
    ],
    description: "Commercial shop on busy Memnagar road. High footfall location for retail or services.",
    amenities: ["Parking", "Power Backup"],
    featured: false
  },
  {
    id: 17,
    title: "Office for Rent in Memnagar",
    type: "office",
    status: "rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 600,
    areaUnit: "sq.ft",
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 20000,
    priceDisplay: "₹20,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
    ],
    description: "Compact office space suitable for consultants and small agencies. Lift and parking available.",
    amenities: ["Parking", "Lift", "Power Backup", "Security"],
    featured: false
  },
  {
    id: 18,
    title: "2 BHK Semi-Furnished in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 2,
    bathrooms: 1,
    area: 900,
    areaUnit: "sq.ft",
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 17000,
    priceDisplay: "₹17,000",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
    ],
    description: "Semi-furnished 2 BHK with basic fittings. Peaceful lane near Memnagar gardens.",
    amenities: ["Parking", "Lift", "Security"],
    featured: false
  },
  {
    id: 19,
    title: "3 BHK Unfurnished for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1300,
    areaUnit: "sq.ft",
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "furnished",
    price: 28000,
    priceDisplay: "₹28,000",
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80"
    ],
    description: "Unfurnished 3 BHK for families who want to furnish themselves. Well-connected location.",
    amenities: ["Parking", "Lift", "Security", "Water Supply"],
    featured: false
  },
  {
    id: 20,
    title: "1 BHK Studio for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 480,
    areaUnit: "sq.ft",
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 9500,
    priceDisplay: "₹9,500",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80"
    ],
    description: "Budget studio near bus routes in Memnagar. Good for working professionals.",
    amenities: ["Lift", "Security"],
    featured: false
  },
  {
    id: 22,
    title: "1 BHK Flat for Rent in Sola",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    areaUnit: "sq.ft",
    location: "Sola",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 12000,
    priceDisplay: "₹12,000",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
    ],
    description: "Compact 1 BHK near Sola Science City Road. Budget-friendly for professionals.",
    amenities: ["Parking", "Lift", "Security"],
    featured: true
  },
  {
    id: 23,
    title: "2 BHK Flat for Rent in Sola",
    type: "apartment",
    status: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    areaUnit: "sq.ft",
    location: "Sola",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 20000,
    priceDisplay: "₹20,000",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
    ],
    description: "Well-ventilated 2 BHK in Sola with balcony and reserved parking. Family society.",
    amenities: ["Parking", "Lift", "Security", "Water Supply"],
    featured: false
  },
  {
    id: 24,
    title: "3 BHK Furnished for Rent in Sola",
    type: "apartment",
    status: "rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    areaUnit: "sq.ft",
    location: "Sola",
    city: "Ahmedabad",
    furnishing: "furnished",
    price: 38000,
    priceDisplay: "₹38,000",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80"
    ],
    description: "Fully furnished 3 BHK near Science City. Includes furniture and appliances.",
    amenities: ["Parking", "Lift", "Security", "Gym", "Power Backup"],
    featured: false
  },
  {
    id: 25,
    title: "Shop for Rent in Sola",
    type: "shop",
    status: "rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    areaUnit: "sq.ft",
    location: "Sola",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 22000,
    priceDisplay: "₹22,000",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
    ],
    description: "Shop unit on Sola main road. Suitable for showroom, clinic or retail store.",
    amenities: ["Parking", "Power Backup"],
    featured: false
  },
  {
    id: 26,
    title: "Office Space for Rent in Sola",
    type: "office",
    status: "rent",
    bedrooms: 0,
    bathrooms: 2,
    area: 1200,
    areaUnit: "sq.ft",
    location: "Sola",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 40000,
    priceDisplay: "₹40,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
    ],
    description: "Corporate-style office floor with meeting room. Close to SG Highway and Science City.",
    amenities: ["Parking", "Lift", "Power Backup", "Security", "AC"],
    featured: false
  },
  {
    id: 27,
    title: "2 BHK Semi-Furnished in Sola",
    type: "apartment",
    status: "rent",
    bedrooms: 2,
    bathrooms: 1,
    area: 980,
    areaUnit: "sq.ft",
    location: "Sola",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 16500,
    priceDisplay: "₹16,500",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
    ],
    description: "Semi-furnished 2 BHK with modular kitchen. Quiet residential block in Sola.",
    amenities: ["Parking", "Lift", "Security"],
    featured: false
  },
  {
    id: 29,
    title: "1 BHK Unfurnished for Rent in Sola",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 520,
    areaUnit: "sq.ft",
    location: "Sola",
    city: "Ahmedabad",
    furnishing: "furnished",
    price: 9000,
    priceDisplay: "₹9,000",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80"
    ],
    description: "Budget 1 BHK unfurnished near Sola bridge. Simple and well-connected.",
    amenities: ["Lift", "Security", "Water Supply"],
    featured: false
  },
  {
    id: 30,
    title: "3 BHK Semi-Furnished for Rent in Sola",
    type: "apartment",
    status: "rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1380,
    areaUnit: "sq.ft",
    location: "Sola",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 30000,
    priceDisplay: "₹30,000",
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80"
    ],
    description: "Semi-furnished 3 BHK with wardrobe and kitchen set. Family-friendly gated society in Sola.",
    amenities: ["Parking", "Lift", "Security", "Power Backup", "Gym"],
    featured: false
  },
  {
    id: 31,
    title: "1 RK Flat for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 0,
    bedroomType: "1RK",
    bathrooms: 1,
    area: 450,
    areaUnit: "sq.ft",
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 8500,
    priceDisplay: "₹8,500",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"],
    description: "Compact 1 RK rental in Gurukul, suitable for a single tenant or student and close to everyday conveniences.",
    amenities: ["Lift", "Security", "Water Supply"],
    featured: false
  },
  {
    id: 32,
    title: "1 RK Flat for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 0,
    bedroomType: "1RK",
    bathrooms: 1,
    area: 420,
    areaUnit: "sq.ft",
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 9000,
    priceDisplay: "₹9,000",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"],
    description: "Well-located 1 RK rental in Memnagar with a practical layout and convenient access to local services.",
    amenities: ["Lift", "Security", "Water Supply"],
    featured: false
  },
  {
    id: 33,
    title: "1 RK Apartment for Rent in Sola",
    type: "apartment",
    status: "rent",
    bedrooms: 0,
    bedroomType: "1RK",
    bathrooms: 1,
    area: 400,
    areaUnit: "sq.ft",
    location: "Sola",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 8000,
    priceDisplay: "₹8,000",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80"],
    description: "Budget-friendly 1 RK apartment for rent in Sola, suitable for students and working professionals.",
    amenities: ["Security", "Water Supply"],
    featured: false
  }

];

function getPropertyById(id) {
  return PROPERTIES.find(p => p.id === parseInt(id, 10));
}

function getFeaturedProperties() {
  return PROPERTIES.filter(p => p.featured);
}

function filterProperties(filters) {
  const list = PROPERTIES.filter(p => {
    if (filters.status && filters.status !== "all" && p.status !== filters.status) return false;
    if (filters.type && filters.type !== "all" && p.type !== filters.type) return false;
    if (filters.location && filters.location !== "all") {
      var loc = filters.location.toLowerCase();
      // Ahmedabad page = all areas (Gurukul, Memnagar, Sola)
      if (loc === "ahmedabad") {
        var allowed = ["gurukul", "memnagar", "sola", "ahmedabad"];
        if (allowed.indexOf(p.location.toLowerCase()) === -1) return false;
      } else if (p.location.toLowerCase() !== loc) {
        return false;
      }
    }
    if (filters.bedroomType && filters.bedroomType !== "all") {
      if (filters.bedroomType === "1RK") {
        if (p.bedroomType !== "1RK") return false;
      } else if (filters.bedroomType === "1BHK") {
        if (p.bedroomType === "1RK" || p.bedrooms !== 1) return false;
      } else if (filters.bedroomType === "2BHK") {
        if (p.bedrooms !== 2) return false;
      }
    }
    if (filters.bedrooms && filters.bedrooms !== "all" && !filters.bedroomType) {
      if (filters.bedrooms === "1RK" || filters.bedrooms === "1rk") {
        if (p.bedroomType !== "1RK") return false;
      } else {
        const beds = parseInt(filters.bedrooms, 10);
        if (filters.bedrooms === "4+") {
          if (p.bedrooms < 4) return false;
        } else if (p.bedroomType === "1RK" || p.bedrooms !== beds) {
          return false;
        }
      }
    }
    if (filters.furnishing && filters.furnishing !== "all" && p.furnishing !== filters.furnishing) return false;
    if (filters.minPrice && p.price < parseInt(filters.minPrice, 10)) return false;
    if (filters.maxPrice && p.price > parseInt(filters.maxPrice, 10)) return false;
    if (isOn(filters.bachelors) && !(p.type === "apartment" && getPropertyExtras(p).bachelorsAllowed)) return false;
    if (isOn(filters.parking) && !hasParking(p)) return false;
    if (isOn(filters.furnishedOnly) && p.furnishing === "unfurnished") return false;
    return true;
  });
  return sortProperties(list, filters.sort);
}

function isOn(v) { return v === true || v === "1" || v === "on" || v === "true"; }

/* Parking: a stored car-parking count, or "Parking" listed in the amenities */
function hasParking(p) {
  return getPropertyExtras(p).carParking > 0 || (p.amenities || []).some(function (a) { return /parking/i.test(a); });
}

/* Sort a list of properties: "newest" (latest added first), "price-asc", "price-desc", "area-desc" */
function sortProperties(list, sort) {
  const out = list.slice();
  if (sort === "price-asc") out.sort(function (a, b) { return a.price - b.price || a.id - b.id; });
  else if (sort === "price-desc") out.sort(function (a, b) { return b.price - a.price || a.id - b.id; });
  else if (sort === "area-desc") out.sort(function (a, b) { return b.area - a.area || a.id - b.id; });
  else if (sort === "newest") out.sort(function (a, b) { return b.id - a.id; });
  return out;
}

function renderPropertyCard(property) {
  const badgeClass = property.status === "sale" ? "badge-sale" : "badge-rent";
  const badgeText = property.status === "sale" ? "For Sale" : "For Rent";
  const bedsText = property.bedroomType === "1RK" ? "1 RK" : (property.bedrooms > 0 ? property.bedrooms + " BHK" : "—");
  const bathsText = property.bathrooms > 0 ? property.bathrooms + " Bath" : "—";
  const typeLabel = property.type === "apartment" ? "Flat / Apartment" : (property.type === "shop" ? "Shop / Godown" : (property.type.charAt(0).toUpperCase() + property.type.slice(1)));

  return `
    <article class="property-card" data-id="${property.id}">
      <div class="property-image">
        <img src="${property.image}" alt="${property.title} in ${property.location}, Ahmedabad" class="img-blur" loading="lazy" width="400" height="220">
        <span class="property-badge badge ${badgeClass}">${badgeText}</span>
        <button class="request-image-btn" type="button" data-whatsapp data-whatsapp-msg="${escapeAttr(getPhotoRequestMessage(property))}">
          <i class="fas fa-camera"></i> Request Image
        </button>
        <span class="img-type-label">${typeLabel}</span>
        <button class="property-favorite" aria-label="Add to favorites" data-id="${property.id}">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="property-body">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;margin-bottom:0.25rem">
          <h3 class="property-title" style="margin:0"><a href="property-details.html?id=${property.id}">${property.title}</a></h3>
          <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
        </div>
        <div class="property-society" style="font-size:0.8125rem;color:var(--text-light);margin-bottom:0.35rem">${typeLabel}</div>
        <div class="property-price">${property.priceDisplay}</div>
        <div class="property-location">
          <i class="fas fa-map-marker-alt"></i>
          ${property.location}, ${property.city}
        </div>
        <div class="property-specs">
          <div class="property-spec"><i class="fas fa-ruler-combined"></i> ${property.area} ${property.areaUnit}</div>
          <div class="property-spec"><i class="fas fa-home"></i> ${typeLabel}</div>
          <div class="property-spec"><i class="fas fa-bed"></i> ${bedsText}</div>
          <div class="property-spec"><i class="fas fa-bath"></i> ${bathsText}</div>
          <div class="property-spec"><i class="fas fa-couch"></i> ${property.furnishing.charAt(0).toUpperCase() + property.furnishing.slice(1)}</div>
        </div>
        <div class="property-actions">
          <a href="property-details.html?id=${property.id}" class="btn btn-outline btn-sm">View Details</a>
          <a href="#" class="btn btn-whatsapp btn-sm" data-whatsapp data-whatsapp-msg="${escapeAttr(getPropertyWhatsAppMessage(property))}"><i class="fab fa-whatsapp"></i> WhatsApp</a>
          <button type="button" class="btn btn-outline btn-sm btn-share btn-share-icon" data-share-url="${escapeAttr(getPropertyUrl(property))}" title="Copy link to share" aria-label="Copy link to this property"><i class="fas fa-share-nodes"></i></button>
        </div>
      </div>
    </article>
  `;
}

function renderPropertyHCard(property) {
  const badgeClass = property.status === "sale" ? "badge-sale" : "badge-rent";
  const badgeText = property.status === "sale" ? "For Sale" : "For Rent";
  const bedsText = property.bedroomType === "1RK" ? "1 RK" : (property.bedrooms > 0 ? property.bedrooms + " BHK" : "—");
  const typeLabel = property.type === "apartment" ? "Flat / Apartment" : (property.type === "shop" ? "Shop / Godown" : (property.type.charAt(0).toUpperCase() + property.type.slice(1)));

  return `
    <article class="property-hcard" data-id="${property.id}">
      <div class="property-hcard-img">
        <img src="${property.image}" alt="${property.title}" class="img-blur" loading="lazy">
        <span class="property-badge badge ${badgeClass}" style="position:absolute;top:0.75rem;left:0.75rem;z-index:3">${badgeText}</span>
        <button class="request-image-btn" type="button" data-whatsapp data-whatsapp-msg="${escapeAttr(getPhotoRequestMessage(property))}">
          <i class="fas fa-camera"></i> Request Image
        </button>
        <span class="img-type-label">${typeLabel}</span>
        <div class="property-hcard-actions">
          <button class="icon-btn property-favorite" data-id="${property.id}" aria-label="Favorite"><i class="far fa-heart"></i></button>
        </div>
      </div>
      <div class="property-hcard-body">
        <div class="property-hcard-top">
          <h3 class="property-hcard-title"><a href="property-details.html?id=${property.id}">${property.title}</a></h3>
          <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
        </div>
        <div class="property-society">${typeLabel}</div>
        <div class="property-price-row">
          <span class="property-price">${property.priceDisplay}</span>
        </div>
        <div class="property-loc"><i class="fas fa-map-marker-alt"></i> ${property.location}, ${property.city}</div>
        <div class="property-meta">
          <span><span class="property-meta-label">Area</span><strong>${property.area} ${property.areaUnit}</strong></span>
          <span><span class="property-meta-label">Type</span><strong>${typeLabel}</strong></span>
          <span><span class="property-meta-label">BHK</span><strong>${bedsText}</strong></span>
          <span><span class="property-meta-label">Furnishing</span><strong>${property.furnishing.charAt(0).toUpperCase() + property.furnishing.slice(1)}</strong></span>
          <span><span class="property-meta-label">Posted By</span><strong>Verified User</strong></span>
        </div>
        <div class="property-hcard-cta">
          <a href="property-details.html?id=${property.id}" class="btn btn-outline btn-sm">View Property</a>
          <a href="#" class="btn btn-whatsapp btn-sm" data-whatsapp data-whatsapp-msg="${escapeAttr(getPropertyWhatsAppMessage(property))}"><i class="fab fa-whatsapp"></i> WhatsApp Inquiry</a>
          <button type="button" class="btn btn-outline btn-sm btn-share" data-share-url="${escapeAttr(getPropertyUrl(property))}" aria-label="Copy link to this property"><i class="fas fa-share-nodes"></i> Share</button>
        </div>
      </div>
    </article>
  `;
}


/* ==========================================================
   Rental-first helpers
   ========================================================== */

/* Homepage "Featured Rental Properties" (edit this list to change what is featured) */
const FEATURED_RENTAL_IDS = [14, 5, 27, 13, 4, 22, 10, 24, 32];

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getFeaturedRentals() {
  /* Live listings (admin panel) carry a homeFeatured flag; use it when present */
  if (PROPERTIES.some(function (p) { return typeof p.homeFeatured === "boolean"; })) {
    return PROPERTIES
      .filter(function (p) { return p.homeFeatured === true && p.status === "rent"; })
      .sort(function (a, b) { return (a.homeRank || 999) - (b.homeRank || 999) || a.id - b.id; });
  }
  return FEATURED_RENTAL_IDS
    .map(function (id) { return getPropertyById(id); })
    .filter(function (p) { return p && p.status === "rent"; });
}

function getPropertyLabel(property) {
  if (property.bedroomType === "1RK") return "1 RK property";
  if (property.type === "apartment" && property.bedrooms > 0) return property.bedrooms + " BHK property";
  if (property.type === "shop") return "shop";
  if (property.type === "office") return "office";
  return "property";
}

/* Absolute link to a property's page, built from wherever the site is hosted (no hard-coded domain) */
function getPropertyUrl(property) {
  return new URL("property-details.html?id=" + property.id, document.baseURI).href;
}

/* Pre-filled WhatsApp message for a single property: the property page link, a blank line, then the message, e.g.
   <site>/property-details.html?id=14
   Hi, I'm interested in the 2 BHK property in Memnagar listed on Akshat Estate. Please share more details. */
function getPropertyWhatsAppMessage(property) {
  return getPropertyUrl(property) + "\n\n" +
    "Hi, I'm interested in the " + getPropertyLabel(property) +
    (property.status === "sale" ? " for sale" : "") +
    " in " + property.location + " listed on Akshat Estate. Please share more details.";
}

function getPhotoRequestMessage(property) {
  return getPropertyUrl(property) + "\n\n" +
    "Hello Akshat Estate, please share photos for: " + property.title + " in " + property.location + ".";
}

function formatFurnishing(value) {
  return (value || "").split("-").map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join("-");
}

/* ----------------------------------------------------------
   Listing details: Type, Super Built-up Area, Bathrooms, Furnishing, Listed By,
   Bachelors Allowed, Carpet Area, Floor No, Total Floors, Car Parking.
   Type, area, bathrooms and furnishing come from each property above.
   The rest are set here: PROPERTY_DETAIL_DEFAULTS apply to every property, and
   PROPERTY_EXTRAS overrides them per property ID, e.g.
     14: { carpetArea: 820, bachelorsAllowed: false, floorNo: 3, totalFloors: 5, carParking: 1 }
   ---------------------------------------------------------- */
const PROPERTY_DETAIL_DEFAULTS = { bachelorsAllowed: true, floorNo: 1, totalFloors: 2, carParking: 0 };
const PROPERTY_EXTRAS = {
  /* id: { carpetArea, bachelorsAllowed, floorNo, totalFloors, carParking } */
};

function getPropertyExtras(property) {
  /* Extras saved on the property itself (from the admin panel) win over the defaults above */
  var own = {};
  ["carpetArea", "bachelorsAllowed", "floorNo", "totalFloors", "carParking"].forEach(function (k) {
    if (property[k] !== undefined && property[k] !== null && property[k] !== "") own[k] = property[k];
  });
  return Object.assign({ carpetArea: property.area }, PROPERTY_DETAIL_DEFAULTS, PROPERTY_EXTRAS[property.id] || {}, own);
}

function formatPropertyType(property) {
  if (property.type === "apartment") return "Flat / Apartment";
  return property.type.charAt(0).toUpperCase() + property.type.slice(1);
}

function getBhkText(property) {
  if (property.bedroomType === "1RK") return "1 RK";
  return property.bedrooms > 0 ? property.bedrooms + " BHK" : "";
}

/* Rows shown on the property detail page, in this order */
function getPropertyDetailRows(property) {
  const x = getPropertyExtras(property);
  const unit = property.areaUnit || "sq.ft";
  const isHome = property.type === "apartment";
  const rows = [["Type", formatPropertyType(property)]];
  if (getBhkText(property)) rows.push(["BHK", getBhkText(property)]);
  rows.push(["Super Built-up Area", property.area + " " + unit]);
  if (property.bathrooms > 0) rows.push(["Bathrooms", property.bathrooms]);
  rows.push(["Furnishing", formatFurnishing(property.furnishing)]);
  rows.push(["Listed By", "Verified User"]);
  if (isHome) rows.push(["Bachelors Allowed", x.bachelorsAllowed ? "Yes" : "No"]);
  rows.push(["Carpet Area", x.carpetArea + " " + unit]);
  rows.push(["Floor No", x.floorNo]);
  rows.push(["Total Floors", x.totalFloors]);
  rows.push(["Car Parking", x.carParking]);
  return rows;
}

function renderSpecItems(rows) {
  return rows.map(function (r) {
    return '<div class="spec-item"><div class="spec-label">' + r[0] + '</div><div class="spec-value">' + r[1] + '</div></div>';
  }).join("\n          ");
}

/* Clean, minimal rental card: clear photo, rent, BHK, area, furnishing, location, short description, 2 actions */
function renderRentalCard(property) {
  const bhk = getBhkText(property);
  const detailUrl = "property-details.html?id=" + property.id;
  const msg = escapeAttr(getPropertyWhatsAppMessage(property));
  const facts = [
    ["fa-ruler-combined", "Built-up Area", property.area + " " + property.areaUnit],
    ["fa-house", "Type", formatPropertyType(property)]
  ];
  if (bhk) facts.push(["fa-bed", "BHK", bhk]);
  if (property.bathrooms > 0) facts.push(["fa-bath", "Bathrooms", property.bathrooms + " Bath"]);
  facts.push(["fa-couch", "Furnishing", formatFurnishing(property.furnishing)]);
  const factsHTML = facts.map(function (f) {
    return '<li title="' + f[1] + '"><i class="fas ' + f[0] + '" aria-hidden="true"></i><span><span class="sr-only">' + f[1] + ': </span>' + f[2] + '</span></li>';
  }).join("");

  return `
    <article class="rental-card" data-id="${property.id}">
      <div class="rental-card-img">
        <a class="rental-card-link" href="${detailUrl}" tabindex="-1" aria-hidden="true">
          <img src="${property.image}" alt="${escapeAttr(property.title)}" class="img-blur" loading="lazy" width="400" height="280" draggable="false">
        </a>
        <button type="button" class="request-image-btn" data-whatsapp data-whatsapp-msg="${escapeAttr(getPhotoRequestMessage(property))}">
          <i class="fas fa-camera"></i> Request Image
        </button>
        <button type="button" class="rental-fav property-favorite" data-id="${property.id}" title="Save to shortlist" aria-label="Save to shortlist"><i class="far fa-heart"></i></button>
        <button type="button" class="rental-share btn-share btn-share-icon" data-share-url="${escapeAttr(getPropertyUrl(property))}" title="Copy link to share" aria-label="Copy link to this property"><i class="fas fa-share-nodes"></i></button>
      </div>
      <div class="rental-card-body">
        <div class="rental-price">${property.priceDisplay}<span> / month</span></div>
        <h3 class="rental-title"><a href="${detailUrl}">${property.title}</a></h3>
        <div class="rental-loc"><i class="fas fa-map-marker-alt"></i> ${property.location}, ${property.city}</div>
        <ul class="rental-meta">${factsHTML}</ul>
        <div class="rental-actions">
          <a href="${detailUrl}" class="btn btn-outline btn-sm">View Property</a>
          <a href="#" class="btn btn-whatsapp btn-sm" data-whatsapp data-whatsapp-msg="${msg}"><i class="fab fa-whatsapp"></i> WhatsApp Inquiry</a>
        </div>
      </div>
    </article>
  `;
}


/* ==========================================================
   LIVE LISTINGS (Firebase)
   Listings managed in admin.html are stored in Firestore ("properties").
   This replaces the built-in PROPERTIES above with the live list before the
   page renders (search.js waits for window.propertiesReady).
   If Firebase is unreachable, blocked, still empty, or the page is opened
   from a file:// path, the built-in listings above are used instead.
   ========================================================== */
window.propertiesReady = (function () {
  var scriptSrc = document.currentScript && document.currentScript.src;
  if (window.AE_ADMIN || !scriptSrc || location.protocol === "file:") return Promise.resolve(false);

  var CACHE_KEY = "ae_live_properties_v1";
  var FRESH_MS = 2 * 60 * 1000;        /* reuse the last download for 2 minutes */
  var STALE_OK_MS = 24 * 60 * 60 * 1000; /* only if Firebase can't be reached */
  var WAIT_MS = 3500;                  /* give up waiting for Firebase after this */
  var GS = "https://www.gstatic.com/firebasejs/";
  var PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560"><rect width="100%" height="100%" fill="#e8e5f0"/></svg>');

  function str(v, max) { return String(v == null ? "" : v).replace(/[<>]/g, "").trim().slice(0, max || 600); }
  function num(v, d) { var n = Number(v); return isFinite(n) ? n : d; }
  function link(v) { v = str(v, 1500); return (/^https?:\/\//i.test(v) || !/^[a-z][a-z0-9+.\-]*:/i.test(v)) ? v : ""; }
  function pick(v, list, d) { return list.indexOf(v) > -1 ? v : d; }

  /* Normalise one Firestore document into the shape the site expects */
  function clean(d) {
    var id = parseInt(d && d.id, 10);
    if (!id) return null;
    var gallery = (Array.isArray(d.gallery) ? d.gallery : []).map(link).filter(Boolean);
    var image = link(d.image) || gallery[0] || PLACEHOLDER;
    if (!gallery.length) gallery = [image];
    var price = num(d.price, 0);
    var p = {
      id: id,
      title: str(d.title, 160) || "Property",
      type: pick(d.type, ["apartment", "bungalow", "office", "shop"], "apartment"),
      status: pick(d.status, ["rent", "sale"], "rent"),
      bedrooms: num(d.bedrooms, 0),
      bathrooms: num(d.bathrooms, 0),
      area: num(d.area, 0),
      areaUnit: str(d.areaUnit, 12) || "sq.ft",
      location: str(d.location, 60) || "Ahmedabad",
      city: str(d.city, 60) || "Ahmedabad",
      furnishing: pick(d.furnishing, ["unfurnished", "semi-furnished", "furnished"], "unfurnished"),
      price: price,
      priceDisplay: str(d.priceDisplay, 40) || ("\u20B9" + price.toLocaleString("en-IN")),
      image: image,
      gallery: gallery,
      description: str(d.description, 2000),
      amenities: (Array.isArray(d.amenities) ? d.amenities : []).map(function (a) { return str(a, 40); }).filter(Boolean),
      featured: d.featured === true,
      active: d.active !== false,
      homeFeatured: d.homeFeatured === true,
      homeRank: num(d.homeRank, 999)
    };
    if (d.bedroomType === "1RK") p.bedroomType = "1RK";
    ["carpetArea", "floorNo", "totalFloors", "carParking"].forEach(function (k) {
      if (d[k] !== undefined && d[k] !== null && d[k] !== "") p[k] = num(d[k], 0);
    });
    if (typeof d.bachelorsAllowed === "boolean") p.bachelorsAllowed = d.bachelorsAllowed;
    return p;
  }

  function apply(list) {
    PROPERTIES.length = 0;
    list.forEach(function (p) { PROPERTIES.push(p); });
  }

  function readCache() {
    try {
      var c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      if (c && Array.isArray(c.list) && c.t) return { list: c.list, age: Date.now() - c.t };
    } catch (e) {}
    return null;
  }
  function writeCache(list) {
    try {
      if (list) localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), list: list }));
      else localStorage.removeItem(CACHE_KEY);
    } catch (e) {}
  }

  var appPromise = null;
  function getFirebaseApp() {
    if (!appPromise) {
      appPromise = import(new URL("firebase-config.js", scriptSrc).href).then(function (cfg) {
        var base = GS + cfg.FIREBASE_VERSION + "/";
        return import(base + "firebase-app.js").then(function (m) {
          return { base: base, app: m.getApps().length ? m.getApp() : m.initializeApp(cfg.firebaseConfig) };
        });
      });
    }
    return appPromise;
  }

  function fetchLive() {
    return getFirebaseApp().then(function (ctx) {
      return import(ctx.base + "firebase-firestore.js").then(function (fs) {
        return fs.getDocs(fs.collection(fs.getFirestore(ctx.app), "properties")).then(function (snap) {
          if (snap.empty) return null; /* not set up yet: keep the built-in listings */
          var list = [];
          snap.forEach(function (doc) {
            var p = clean(doc.data());
            if (p && p.active) list.push(p);
          });
          list.sort(function (a, b) { return a.id - b.id; });
          return list;
        });
      });
    });
  }

  /* Analytics (Firebase), loaded after the page is interactive */
  window.addEventListener("load", function () {
    setTimeout(function () {
      getFirebaseApp().then(function (ctx) {
        return import(ctx.base + "firebase-analytics.js").then(function (an) {
          return an.isSupported().then(function (ok) { if (ok) an.getAnalytics(ctx.app); });
        });
      }).catch(function () {});
    }, 1500);
  });

  var cached = readCache();
  if (cached && cached.age < FRESH_MS) { apply(cached.list); return Promise.resolve(true); }

  var live = fetchLive().then(function (list) { writeCache(list); return list; });
  var timer = new Promise(function (resolve) { setTimeout(function () { resolve("timeout"); }, WAIT_MS); });
  var usable = cached && cached.age < STALE_OK_MS;

  return Promise.race([live, timer]).then(function (res) {
    if (Array.isArray(res)) { apply(res); return true; }
    if (res === "timeout" && usable) { apply(cached.list); return true; }
    return false;
  }).catch(function () {
    if (usable) { apply(cached.list); return true; }
    return false;
  });
})();


/* ==========================================================
   Shortlist + area rent stats
   ========================================================== */

/* Saved (hearted) property IDs, stored in this browser only */
function getSavedIds() {
  try {
    const ids = JSON.parse(localStorage.getItem("ae_favorites") || "[]");
    return Array.isArray(ids) ? ids.map(String) : [];
  } catch (e) { return []; }
}

function formatINR(n) {
  return "\u20B9" + Number(n).toLocaleString("en-IN");
}

/* Rent range per size for an area, worked out from the rental listings currently on the site.
   area: "Gurukul" | "Memnagar" | "Sola" | "Ahmedabad" (all three areas) */
function getAreaRentStats(area) {
  const key = String(area || "").toLowerCase();
  const rows = [
    { label: "1 RK", test: function (p) { return p.bedroomType === "1RK"; } },
    { label: "1 BHK", test: function (p) { return p.bedroomType !== "1RK" && p.bedrooms === 1; } },
    { label: "2 BHK", test: function (p) { return p.bedrooms === 2; } },
    { label: "3 BHK", test: function (p) { return p.bedrooms === 3; } },
    { label: "4+ BHK", test: function (p) { return p.bedrooms >= 4; } }
  ];
  const rentals = PROPERTIES.filter(function (p) {
    return p.status === "rent" && p.type === "apartment" && p.price > 0 &&
      (key === "ahmedabad" || String(p.location).toLowerCase() === key);
  });
  const stats = rows.map(function (r) {
    const prices = rentals.filter(r.test).map(function (p) { return p.price; });
    return { label: r.label, count: prices.length, min: Math.min.apply(null, prices), max: Math.max.apply(null, prices) };
  }).filter(function (r) { return r.count > 0; });
  return { total: rentals.length, rows: stats };
}
