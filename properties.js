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
  return PROPERTIES.filter(p => {
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
    return true;
  });
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
        <button class="request-image-btn" type="button" data-whatsapp data-whatsapp-msg="Hello Akshat Estate, please share photos for: ${property.title} in ${property.location} (ID: ${property.id}).">
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
          <a href="property-details.html?id=${property.id}" class="btn btn-primary btn-sm">View Details</a>
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
        <button class="request-image-btn" type="button" data-whatsapp data-whatsapp-msg="Hello Akshat Estate, please share photos for: ${property.title} in ${property.location} (ID: ${property.id}).">
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
      </div>
    </article>
  `;
}
