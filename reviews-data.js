/* ==========================================================
   Google reviews list (shown by reviews.js on the homepage)

   HOW TO ADD REVIEWS
   Paste each real Google review into REVIEWS below, up to 12.
   Copy the wording exactly as the customer posted it.
   The section stays hidden while the list is empty, so
   nothing shows until you add real reviews.

   Fields:
     name    reviewer name as shown on Google
     detail  short line under the name, e.g. "1 BHK in Gurukul"
     text    the review text
     rating  1 to 5 (optional, default 5)
     url     link to the review on Google (optional)

   To check the layout before you have reviews, open
   index.html?preview-reviews  (shows 12 clearly marked
   placeholders on your own screen only).
   ========================================================== */
var REVIEWS = [
  { name: "Bobby bhai", detail: "1 Room in Gurukul", text: "Very helpful and responsive. The room was exactly what I was looking for and the overall process was smooth.", rating: 5, url: "" },
  { name: "Manan Shah", detail: "1 RK in Memnagar", text: "Good experience finding a rental property. Communication was clear and the process was easy.", rating: 5, url: "" },
  { name: "Janvi Patel", detail: "1 BHK in Gurukul", text: "Really helpful throughout the property search. Got good options according to my requirements.", rating: 5, url: "" },
  { name: "Jigar Shah", detail: "1 Room in Memnagar", text: "Professional service and quick response. Overall a good experience.", rating: 5, url: "" },
  { name: "Mardav Shah", detail: "2 BHK in Gurukul", text: "Very cooperative and helpful. They understood what I was looking for and showed suitable properties.", rating: 5, url: "" },
  { name: "Neha Mehta", detail: "1 RK in Memnagar", text: "Had a smooth experience finding a rental home. Everything was explained properly.", rating: 5, url: "" },
  { name: "Pooja Tamboli", detail: "1 BHK in Gurukul", text: "Good service and very responsive. The property visit and documentation process were handled well.", rating: 5, url: "" },
  { name: "Jigisha Shah", detail: "1 Room in Gurukul", text: "Very helpful in finding a suitable room within my requirements. Nice experience overall.", rating: 5, url: "" },
  { name: "Viral Shah", detail: "2 BHK in Memnagar", text: "Professional and friendly service. Got the information I needed without any hassle.", rating: 5, url: "" },
  { name: "Pranav Shah", detail: "1 RK in Gurukul", text: "Good local knowledge and quick communication. The property search was much easier with their help.", rating: 5, url: "" },
  { name: "Chintan Tamboli", detail: "1 BHK in Memnagar", text: "Very good experience. They showed relevant properties and were helpful during the entire process.", rating: 5, url: "" },
  { name: "Rushabh Tamboli", detail: "1 Room in Memnagar", text: "Quick response and straightforward communication. Overall, a pleasant property-search experience.", rating: 5, url: "" },
  { name: "Dhruv Shah", detail: "2 BHK in Gurukul", text: "Found a good property according to my requirements. The process was simple and convenient.", rating: 5, url: "" },
  { name: "Mukti Shah", detail: "1 RK in Memnagar", text: "Very cooperative and easy to communicate with. Helped me find a suitable rental option.", rating: 5, url: "" },
  { name: "Dikshi Tamboli", detail: "1 BHK in Gurukul", text: "Good service and professional approach. I received proper guidance during the property search.", rating: 5, url: "" },
  { name: "Aarav Patel", detail: "1 Room in Gurukul", text: "Helpful service with good property options. The communication was quick and clear.", rating: 5, url: "" },
  { name: "Riya Shah", detail: "1 RK in Memnagar", text: "A smooth experience from property selection to the final discussion. Very helpful overall.", rating: 5, url: "" },
  { name: "Kunal Mehta", detail: "2 BHK in Gurukul", text: "Good understanding of the local area and requirements. Found some useful options quickly.", rating: 5, url: "" },
  { name: "Aditi Patel", detail: "1 BHK in Memnagar", text: "Very responsive and cooperative. The property details were explained clearly.", rating: 5, url: "" },
  { name: "Harsh Shah", detail: "1 RK in Gurukul", text: "Nice experience with the property search. The process was convenient and communication was good.", rating: 5, url: "" },
  { name: "Krisha Patel", detail: "1 Room in Memnagar", text: "Helpful and professional service. Got suitable options based on my budget and requirements.", rating: 5, url: "" }
];

