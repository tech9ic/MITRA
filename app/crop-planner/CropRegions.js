const cropRegionsMultiLang = {
    rice: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal"],
        label: { en: "Rice (Paddy)", odia: "ଧାନ (Dhana)", hi: "चावल (धान)" }
    },
    maize: {
        regions: ["highlands", "tribal"],
        label: { en: "Maize (Corn)", odia: "ମକା (Maka)", hi: "मक्का" }
    },
    millet_finger: {
        regions: ["highlands", "tribal", "drought_prone"],
        label: { en: "Finger Millet (Mandia/Ragi)", odia: "ମାଣ୍ଡିଆ/ରାଗି (Mandia/Ragi)", hi: "रागी/मंडुआ" }
    },
    millet_pearl: {
        regions: ["drought_prone"],
        label: { en: "Pearl Millet (Bajra)", odia: "ବାଜରା (Bajra)", hi: "बाजरा" }
    },
    millet_foxtail: {
        regions: ["tribal"],
        label: { en: "Foxtail Millet (Kangu)", odia: "କାଙ୍ଗୁ (Kangu)", hi: "कंगनी" }
    },
    millet_little: {
        regions: ["tribal"],
        label: { en: "Little Millet (Sua/Kutki)", odia: "ସୁଆଁ/କୁଟକି (Suan/Kutki)", hi: "कुटकी" }
    },
    sorghum: {
        regions: ["highlands"],
        label: { en: "Sorghum (Jowar)", odia: "ଜୁଆର (Juar)", hi: "ज्वार" }
    },
    millet_barnyard: {
        regions: ["highlands"], // Assuming similar to other millets in highlands
        label: { en: "Barnyard Millet (Odia/Kodo)", odia: "ଓଡ଼ିଆ/କୋଦୋ (Odia/Kodo)", hi: "सांवा/कोदो" }
    },
    greengram: {
        regions: ["coastal", "drought_prone"],
        label: { en: "Green Gram (Moong Bean)", odia: "ମୁଗ (Muga)", hi: "मूंग" }
    },
    blackgram: {
        regions: ["coastal"],
        label: { en: "Black Gram (Urad Bean)", odia: "ବିରି (Biri)", hi: "उड़द" }
    },
    pigeonpea: {
        regions: ["western_irrigated", "highlands"],
        label: { en: "Pigeon Pea (Arhar/Kandula)", odia: "ହରଡ଼/କନ୍ଦୁଳ (Harada/Kandula)", hi: "अरहर/तुअर" }
    },
    chickpea: {
        regions: ["drought_prone"],
        label: { en: "Chickpea (Gram/Chana)", odia: "ବୁଟ (Buta)", hi: "चना" }
    },
    cowpea: {
        regions: ["tribal", "drought_prone"], // Assuming some presence in both
        label: { en: "Cowpea (Lobia)", odia: "ଗୋରୁସିମ୍ବ/ଲୋବିଆ (Gorusimba/Lobia)", hi: "लोबिया/चौला" }
    },
    lentil: {
        regions: ["western_irrigated", "drought_prone"], // Assuming some presence in both
        label: { en: "Lentil (Masoor)", odia: "ମସୁର (Masura)", hi: "मसूर" }
    },
    horsegram: {
        regions: ["tribal", "drought_prone"],
        label: { en: "Horse Gram (Kulthi)", odia: "କୋଳଥ (Kolatha)", hi: "कुलथी" }
    },
    groundnut: {
        regions: ["coastal", "drought_prone"],
        label: { en: "Groundnut (Peanut)", odia: "ଚିନାବାଦାମ (Chinabadama)", hi: "मूंगफली" }
    },
    mustard: {
        regions: ["highlands", "western_irrigated"], // Assuming some presence in both
        label: { en: "Mustard (Rai)", odia: "ସୋରିଷ (Sorisha)", hi: "सरसों" }
    },
    sesame: {
        regions: ["drought_prone", "coastal"], // Assuming some presence in both
        label: { en: "Sesame (Til)", odia: "ରାଶି (Rashi)", hi: "तिल" }
    },
    niger: {
        regions: ["tribal"],
        label: { en: "Niger (Alsi)", odia: "ଅଳସୀ (Alasi)", hi: "रामतिल/नाइजर" }
    },
    soybean: {
        regions: ["western_irrigated", "highlands"], // Assuming some presence in both
        label: { en: "Soybean", odia: "ସୋୟାବିନ (Soyabin)", hi: "सोयाबीन" }
    },
    sunflower: {
        regions: ["western_irrigated", "drought_prone"], // Assuming some presence in both
        label: { en: "Sunflower", odia: "ସୂର୍ଯ୍ୟମୁଖୀ (Suryamukhi)", hi: "सूरजमुखी" }
    },
    castor: {
        regions: ["drought_prone"],
        label: { en: "Castor", odia: "ଏରଣ୍ଡି (Erandi)", hi: "अरंडी" }
    },
    spinach: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Spinach (Palak)", odia: "ପାଳଙ୍ଗ ଶାଗ (Palanga Saga)", hi: "पालक" }
    },
    amaranth: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Amaranth (Saga)", odia: "ସାଗ (Saga)", hi: "चौलाई" }
    },
    fenugreek: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Fenugreek (Methi)", odia: "ମେଥି ଶାଗ (Methi Saga)", hi: "मेथी" }
    },
    mustard_greens: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Mustard Greens (Sarson Saga)", odia: "ସୋରିଷ ଶାଗ (Sorisha Saga)", hi: "सरसों का साग" }
    },
    radish: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Radish (Mula)", odia: "ମୂଳା (Mula)", hi: "मूली" }
    },
    carrot: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Carrot (Gajar)", odia: "ଗାଜର (Gajara)", hi: "गाजर" }
    },
    beetroot: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Beetroot", odia: "ବିଟରୁଟ (Bitruta)", hi: "चुकंदर" }
    },
    sweet_potato: {
        regions: ["coastal", "tribal", "drought_prone"],
        label: { en: "Sweet Potato (Kanda)", odia: "କନ୍ଦା (Kanda)", hi: "शकरकंद" }
    },
    yam: {
        regions: ["coastal", "tribal", "highlands"],
        label: { en: "Yam (Desi Aloo)", odia: "ଦେଶୀ ଆଳୁ (Deshi Alu)", hi: "जिमीकंद" }
    },
    tomato: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Tomato (Tamatar)", odia: "ଟମାଟୋ (Tomato)", hi: "टमाटर" }
    },
    brinjal: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Brinjal (Baingan)", odia: "ବାଇଗଣ (Baigana)", hi: "बैंगन" }
    },
    okra: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Okra (Bhindi)", odia: "ଭେଣ୍ଡି (Bhendi)", hi: "भिंडी" }
    },
    chili: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Chili (Mirchi)", odia: "ମରୀଚି (Marichi)", hi: "मिर्च" }
    },
    capsicum: {
        regions: ["coastal", "western_irrigated", "highlands"], // More common in irrigated and slightly cooler areas
        label: { en: "Capsicum (Shimla Mirch)", odia: "କ୍ୟାପ୍ସିକମ୍ (Capsicum)", hi: "शिमला मिर्च" }
    },
    cucumber: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Cucumber (Kheera)", odia: "କାକୁଡ଼ି (Kakudi)", hi: "खीरा" }
    },
    bottle_gourd: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Bottle Gourd (Lau)", odia: "ଲାଉ (Lau)", hi: "लौकी" }
    },
    bitter_gourd: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Bitter Gourd (Karela)", odia: "କଲରା (Kalara)", hi: "करेला" }
    },
    pumpkin: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Grown widely
        label: { en: "Pumpkin (Kaddu)", odia: "କଖାରୁ (Kakhāru)", hi: "कद्दू" }
    },
    ridge_gourd: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal"],
        label: { en: "Ridge Gourd (Janhi)", odia: "ଜହ୍ନି (Janhi)", hi: "तुरई" }
    },
    sponge_gourd: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal"],
        label: { en: "Sponge Gourd (Turi)", odia: "ତୁରୀ (Turi)", hi: "गिलकी" }
    },
    onion: {
        regions: ["coastal", "western_irrigated", "highlands", "drought_prone"],
        label: { en: "Onion (Piaza)", odia: "ପିଆଜ (Piaja)", hi: "प्याज" }
    },
    garlic: {
        regions: ["coastal", "western_irrigated", "highlands", "drought_prone"],
        label: { en: "Garlic (Rasuna)", odia: "ରସୁଣ (Rasuna)", hi: "लहसुन" }
    },
    cabbage: {
        regions: ["coastal", "western_irrigated", "highlands"], // Prefers cooler conditions
        label: { en: "Cabbage (Bandha Kobi)", odia: "ବନ୍ଧାକୋବି (Bandhakobi)", hi: "पत्ता गोभी" }
    },
    cauliflower: {
        regions: ["coastal", "western_irrigated", "highlands"], // Prefers cooler conditions
        label: { en: "Cauliflower (Phul Kobi)", odia: "ଫୁଲକୋବି (Phulakobi)", hi: "फूल गोभी" }
    },
    beans: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal"],
        label: { en: "Beans (Sem)", odia: "ସିମ୍ (Sim)", hi: "बीन्स/सेम" }
    },
    peas: {
        regions: ["coastal", "western_irrigated", "highlands"], // Prefers cooler conditions
        label: { en: "Peas (Matar)", odia: "ମଟର (Matara)", hi: "मटर" }
    },
    sugarcane: {
        regions: ["western_irrigated"],
        label: { en: "Sugarcane", odia: "ଆଖୁ (Akhu)", hi: "गन्ना" }
    },
    cotton: {
        regions: ["western_irrigated", "drought_prone"], // Specific soil and climate needs
        label: { en: "Cotton", odia: "କପା (Kapa)", hi: "कपास" }
    },
    jute: {
        regions: ["coastal"], // Needs high humidity and alluvial soil
        label: { en: "Jute", odia: "ପାଟ (Pata)", hi: "जूट" }
    },
    turmeric: {
        regions: ["tribal", "highlands"], // Prefers warm and humid conditions
        label: { en: "Turmeric", odia: "ହଳଦୀ (Haladi)", hi: "हल्दी" }
    },
    ginger: {
        regions: ["tribal", "highlands"], // Similar to turmeric
        label: { en: "Ginger", odia: "ଅଦା (Ada)", hi: "अदरक" }
    },
    arecanut: {
        regions: ["coastal", "highlands"], // Needs humid and warm climate
        label: { en: "Arecanut (Supari)", odia: "ଗୁଆ (Gua)", hi: "सुपारी" }
    },
    cashew: {
        regions: ["coastal", "highlands", "drought_prone"], // Adaptable to various conditions
        label: { en: "Cashew", odia: "କାଜୁ (Kaju)", hi: "काजू" }
    },
    cumin: {
        regions: ["drought_prone", "western_irrigated"], // Requires dry and cool climate during flowering
        label: { en: "Cumin (Jeera)", odia: "ଜିରା (Jira)", hi: "जीरा" }
    },
    coriander: {
        regions: ["coastal", "western_irrigated", "highlands", "drought_prone"], // Adaptable
        label: { en: "Coriander (Dhania)", odia: "ଧନିଆ (Dhania)", hi: "धनिया" }
    },
    fenugreek_seeds: {
        regions: ["coastal", "western_irrigated", "highlands", "drought_prone"], // Adaptable
        label: { en: "Fenugreek (Methi Seeds)", odia: "ମେଥି (Methi)", hi: "मेथी" }
    },
    cardamom: {
        regions: ["highlands"], // Requires cool and humid climate
        label: { en: "Cardamom (Elaichi)", odia: "ଏଲାଇଚି (Elaichi)", hi: "इलायची" }
    },
    clove: {
        regions: ["highlands"], // Tropical humid climate
        label: { en: "Clove (Laung)", odia: "ଲବଙ୍ଗ (Labanga)", hi: "लौंग" }
    },
    mango: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Adaptable
        label: { en: "Mango (Amba)", odia: "ଆମ୍ବ (Amba)", hi: "आम" }
    },
    banana: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal"], // Warm and humid
        label: { en: "Banana (Kadali)", odia: "କଦଳୀ (Kadali)", hi: "केला" }
    },
    guava: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Adaptable
        label: { en: "Guava (Pijuli)", odia: "ପିଜୁଳି (Pijuli)", hi: "अमरूद" }
    },
    citrus_fruits: {
        regions: ["coastal", "western_irrigated", "highlands"], // Moderate climate
        label: { en: "Citrus Fruits (Lemon, Orange, Lime)", odia: "ଲେମ୍ବୁ, କମଳା, ଲାଇମ୍ (Lembu, Kamala, Lime)", hi: "खट्टे फल (नींबू, संतरा, लाइम)" }
    },
    papaya: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal"], // Warm and humid
        label: { en: "Papaya (Amruta Bhanda)", odia: "ଅମୃତଭଣ୍ଡା (Amrutabhanda)", hi: "पपीता" }
    },
    watermelon: {
        regions: ["coastal", "western_irrigated", "drought_prone"], // Warm and dry
        label: { en: "Watermelon (Tarbuja)", odia: "ତରଭୁଜ (Tarabhuja)", hi: "तरबूज" }
    },
    muskmelon: {
        regions: ["coastal", "western_irrigated", "drought_prone"], // Similar to watermelon
        label: { en: "Muskmelon (Kharbuja)", odia: "ଖରଭୁଜ (Kharabhuja)", hi: "खरबूजा" }
    },
    pineapple: {
        regions: ["coastal", "highlands"], // Tropical humid climate
        label: { en: "Pineapple (Sapuri)", odia: "ସପୁରୀ (Sapun)", hi: "अनानास" }
    },
    sorghum_fodder: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Adaptable
        label: { en: "Sorghum (for fodder)", odia: "ଗୋଖାଦ୍ୟ ପାଇଁ ଜୁଆର (Gokhadya Pain Juar)", hi: "चारे के लिए ज्वार" }
    },
    maize_fodder: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal"], // Adaptable
        label: { en: "Maize (for fodder)", odia: "ଗୋଖାଦ୍ୟ ପାଇଁ ମକା (Gokhadya Pain Maka)", hi: "चारे के लिए मक्का" }
    },
    napier_grass: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Adaptable
        label: { en: "Napier Grass", odia: "ନେପିୟର ଘାସ (Napier Ghasa)", hi: "नेपियर घास" }
    },
    guinea_grass: {
        regions: ["coastal", "western_irrigated", "highlands", "tribal", "drought_prone"], // Adaptable
        label: { en: "Guinea Grass", odia: "ଗିନି ଘାସ (Guinea Ghasa)", hi: "गिनी घास" }
    },
    berseem: {
        regions: ["coastal", "western_irrigated"], // Requires good irrigation
        label: { en: "Berseem", odia: "ବର୍ସିମ୍ (Barsim)", hi: "बरसीम" }
    },
    coconut: {
        regions: ["coastal"], // Coastal climate
        label: { en: "Coconut", odia: "ନଡ଼ିଆ (Nadia)", hi: "नारियल" }
    },
    rubber: {
        regions: ["highlands"], // Warm and humid
        label: { en: "Rubber", odia: "ରବର (Rabara)", hi: "रबर" }
    },
    coffee: {
        regions: ["highlands"], // Cool and humid, hilly areas
        label: { en: "Coffee", odia: "କଫି (Kafi)", hi: "कॉफी" }
    },
    tea: {
        regions: ["highlands"], // Cool and humid, hilly areas
        label: { en: "Tea", odia: "ଚା (Cha)", hi: "चाय" }
    }
};