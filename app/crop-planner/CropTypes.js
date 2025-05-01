const broadCropCategoriesMultiLang = [
    {
      category: {
        en: "Cereals/Grains",
        odia: "ଧାନ୍ୟ/ଶସ୍ୟ",
        hi: "अनाज/धान्य"
      },
      crops: [
        { value: "rice", label: { en: "Rice (Paddy)", odia: "ଧାନ (Dhana)", hi: "चावल (धान)" } },
        { value: "maize", label: { en: "Maize (Corn)", odia: "ମକା (Maka)", hi: "मक्का" } },
        { value: "millet_finger", label: { en: "Finger Millet (Mandia/Ragi)", odia: "ମାଣ୍ଡିଆ/ରାଗି (Mandia/Ragi)", hi: "रागी/मंडुआ" } },
        { value: "millet_pearl", label: { en: "Pearl Millet (Bajra)", odia: "ବାଜରା (Bajra)", hi: "बाजरा" } },
        { value: "millet_foxtail", label: { en: "Foxtail Millet (Kangu)", odia: "କାଙ୍ଗୁ (Kangu)", hi: "कंगनी" } },
        { value: "millet_little", label: { en: "Little Millet (Sua/Kutki)", odia: "ସୁଆଁ/କୁଟକି (Suan/Kutki)", hi: "कुटकी" } },
        { value: "sorghum", label: { en: "Sorghum (Jowar)", odia: "ଜୁଆର (Juar)", hi: "ज्वार" } },
        { value: "millet_barnyard", label: { en: "Barnyard Millet (Odia/Kodo)", odia: "ଓଡ଼ିଆ/କୋଦୋ (Odia/Kodo)", hi: "सांवा/कोदो" } },
      ],
    },
    {
      category: {
        en: "Pulses (Legumes)",
        odia: "ଡାଲି ଜାତୀୟ",
        hi: "दलहन"
      },
      crops: [
        { value: "greengram", label: { en: "Green Gram (Moong Bean)", odia: "ମୁଗ (Muga)", hi: "मूंग" } },
        { value: "blackgram", label: { en: "Black Gram (Urad Bean)", odia: "ବିରି (Biri)", hi: "उड़द" } },
        { value: "pigeonpea", label: { en: "Pigeon Pea (Arhar/Kandula)", odia: "ହରଡ଼/କନ୍ଦୁଳ (Harada/Kandula)", hi: "अरहर/तुअर" } },
        { value: "chickpea", label: { en: "Chickpea (Gram/Chana)", odia: "ବୁଟ (Buta)", hi: "चना" } },
        { value: "cowpea", label: { en: "Cowpea (Lobia)", odia: "ଗୋରୁସିମ୍ବ/ଲୋବିଆ (Gorusimba/Lobia)", hi: "लोबिया/चौला" } },
        { value: "lentil", label: { en: "Lentil (Masoor)", odia: "ମସୁର (Masura)", hi: "मसूर" } },
        { value: "horsegram", label: { en: "Horse Gram (Kulthi)", odia: "କୋଳଥ (Kolatha)", hi: "कुलथी" } },
      ],
    },
    {
      category: {
        en: "Oilseeds",
        odia: "ତୈଳବୀଜ",
        hi: "तिलहन"
      },
      crops: [
        { value: "groundnut", label: { en: "Groundnut (Peanut)", odia: "ଚିନାବାଦାମ (Chinabadama)", hi: "मूंगफली" } },
        { value: "mustard", label: { en: "Mustard (Rai)", odia: "ସୋରିଷ (Sorisha)", hi: "सरसों" } },
        { value: "sesame", label: { en: "Sesame (Til)", odia: "ରାଶି (Rashi)", hi: "तिल" } },
        { value: "niger", label: { en: "Niger (Alsi)", odia: "ଅଳସୀ (Alasi)", hi: "रामतिल/नाइजर" } },
        { value: "soybean", label: { en: "Soybean", odia: "ସୋୟାବିନ (Soyabin)", hi: "सोयाबीन" } },
        { value: "sunflower", label: { en: "Sunflower", odia: "ସୂର୍ଯ୍ୟମୁଖୀ (Suryamukhi)", hi: "सूरजमुखी" } },
        { value: "castor", label: { en: "Castor", odia: "ଏରଣ୍ଡି (Erandi)", hi: "अरंडी" } },
      ],
    },
    {
      category: {
        en: "Vegetables",
        odia: "ପନିପରିବା",
        hi: "सब्जियाँ"
      },
      crops: [
        {
          subcategory: { en: "Leafy Vegetables", odia: "ପତ୍ର ସାଗ", hi: "पत्तेदार सब्जियां" },
          items: [
            { value: "spinach", label: { en: "Spinach (Palak)", odia: "ପାଳଙ୍ଗ ଶାଗ (Palanga Saga)", hi: "पालक" } },
            { value: "amaranth", label: { en: "Amaranth (Saga)", odia: "ସାଗ (Saga)", hi: "चौलाई" } },
            { value: "fenugreek", label: { en: "Fenugreek (Methi)", odia: "ମେଥି ଶାଗ (Methi Saga)", hi: "मेथी" } },
            { value: "mustard_greens", label: { en: "Mustard Greens (Sarson Saga)", odia: "ସୋରିଷ ଶାଗ (Sorisha Saga)", hi: "सरसों का साग" } },
          ],
        },
        {
          subcategory: { en: "Root Vegetables", odia: "ମୂଳ ଜାତୀୟ ପନିପରିବା", hi: "जड़ वाली सब्जियां" },
          items: [
            { value: "radish", label: { en: "Radish (Mula)", odia: "ମୂଳା (Mula)", hi: "मूली" } },
            { value: "carrot", label: { en: "Carrot (Gajar)", odia: "ଗାଜର (Gajara)", hi: "गाजर" } },
            { value: "beetroot", label: { en: "Beetroot", odia: "ବିଟରୁଟ (Bitruta)", hi: "चुकंदर" } },
            { value: "sweet_potato", label: { en: "Sweet Potato (Kanda)", odia: "କନ୍ଦା (Kanda)", hi: "शकरकंद" } },
            { value: "yam", label: { en: "Yam (Desi Aloo)", odia: "ଦେଶୀ ଆଳୁ (Deshi Alu)", hi: "जिमीकंद" } },
          ],
        },
        {
          subcategory: { en: "Fruit Vegetables", odia: "ଫଳ ଜାତୀୟ ପନିପରିବା", hi: "फल वाली सब्जियां" },
          items: [
            { value: "tomato", label: { en: "Tomato (Tamatar)", odia: "ଟମାଟୋ (Tomato)", hi: "टमाटर" } },
            { value: "brinjal", label: { en: "Brinjal (Baingan)", odia: "ବାଇଗଣ (Baigana)", hi: "बैंगन" } },
            { value: "okra", label: { en: "Okra (Bhindi)", odia: "ଭେଣ୍ଡି (Bhendi)", hi: "भिंडी" } },
            { value: "chili", label: { en: "Chili (Mirchi)", odia: "ମରୀଚି (Marichi)", hi: "मिर्च" } },
            { value: "capsicum", label: { en: "Capsicum (Shimla Mirch)", odia: "କ୍ୟାପ୍ସିକମ୍ (Capsicum)", hi: "शिमला मिर्च" } },
            { value: "cucumber", label: { en: "Cucumber (Kheera)", odia: "କାକୁଡ଼ି (Kakudi)", hi: "खीरा" } },
            { value: "bottle_gourd", label: { en: "Bottle Gourd (Lau)", odia: "ଲାଉ (Lau)", hi: "लौकी" } },
            { value: "bitter_gourd", label: { en: "Bitter Gourd (Karela)", odia: "କଲରା (Kalara)", hi: "करेला" } },
            { value: "pumpkin", label: { en: "Pumpkin (Kaddu)", odia: "କଖାରୁ (Kakhāru)", hi: "कद्दू" } },
            { value: "ridge_gourd", label: { en: "Ridge Gourd (Janhi)", odia: "ଜହ୍ନି (Janhi)", hi: "तुरई" } },
            { value: "sponge_gourd", label: { en: "Sponge Gourd (Turi)", odia: "ତୁରୀ (Turi)", hi: "गिलकी" } },
          ],
        },
        {
          subcategory: { en: "Other Vegetables", odia: "ଅନ୍ୟ ପନିପରିବା", hi: "अन्य सब्जियां" },
          items: [
            { value: "onion", label: { en: "Onion (Piaza)", odia: "ପିଆଜ (Piaja)", hi: "प्याज" } },
            { value: "garlic", label: { en: "Garlic (Rasuna)", odia: "ରସୁଣ (Rasuna)", hi: "लहसुन" } },
            { value: "cabbage", label: { en: "Cabbage (Bandha Kobi)", odia: "ବନ୍ଧାକୋବି (Bandhakobi)", hi: "पत्ता गोभी" } },
            { value: "cauliflower", label: { en: "Cauliflower (Phul Kobi)", odia: "ଫୁଲକୋବି (Phulakobi)", hi: "फूल गोभी" } },
            { value: "beans", label: { en: "Beans (Sem)", odia: "ସିମ୍ (Sim)", hi: "बीन्स/सेम" } },
            { value: "peas", label: { en: "Peas (Matar)", odia: "ମଟର (Matara)", hi: "मटर" } },
          ],
        },
      ],
    },
    {
      category: {
        en: "Cash Crops",
        odia: "ଅର୍ଥକାରୀ ଫସଲ",
        hi: "नकदी फसलें"
      },
      crops: [
        { value: "sugarcane", label: { en: "Sugarcane", odia: "ଆଖୁ (Akhu)", hi: "गन्ना" } },
        { value: "cotton", label: { en: "Cotton", odia: "କପା (Kapa)", hi: "कपास" } },
        { value: "jute", label: { en: "Jute", odia: "ପାଟ (Pata)", hi: "जूट" } },
        { value: "turmeric", label: { en: "Turmeric", odia: "ହଳଦୀ (Haladi)", hi: "हल्दी" } },
        { value: "ginger", label: { en: "Ginger", odia: "ଅଦା (Ada)", hi: "अदरक" } },
        { value: "arecanut", label: { en: "Arecanut (Supari)", odia: "ଗୁଆ (Gua)", hi: "सुपारी" } },
        { value: "cashew", label: { en: "Cashew", odia: "କାଜୁ (Kaju)", hi: "काजू" } },
      ],
    },
    {
      category: {
        en: "Spices",
        odia: "ମସଲା",
        hi: "मसाले"
      },
      crops: [
        { value: "cumin", label: { en: "Cumin (Jeera)", odia: "ଜିରା (Jira)", hi: "जीरा" } },
        { value: "coriander", label: { en: "Coriander (Dhania)", odia: "ଧନିଆ (Dhania)", hi: "धनिया" } },
        { value: "fenugreek_seeds", label: { en: "Fenugreek (Methi Seeds)", odia: "ମେଥି (Methi)", hi: "मेथी" } },
        { value: "cardamom", label: { en: "Cardamom (Elaichi)", odia: "ଏଲାଇଚି (Elaichi)", hi: "इलायची" } },
        { value: "clove", label: { en: "Clove (Laung)", odia: "ଲବଙ୍ଗ (Labanga)", hi: "लौंग" } },
      ],
    },
    {
      category: {
        en: "Fruits",
        odia: "ଫଳ",
        hi: "फल"
      },
      crops: [
        { value: "mango", label: { en: "Mango (Amba)", odia: "ଆମ୍ବ (Amba)", hi: "आम" } },
        { value: "banana", label: { en: "Banana (Kadali)", odia: "କଦଳୀ (Kadali)", hi: "केला" } },
        { value: "guava", label: { en: "Guava (Pijuli)", odia: "ପିଜୁଳି (Pijuli)", hi: "अमरूद" } },
        { value: "citrus_fruits", label: { en: "Citrus Fruits (Lemon, Orange, Lime)", odia: "ଲେମ୍ବୁ, କମଳା, ଲାଇମ୍ (Lembu, Kamala, Lime)", hi: "खट्टे फल (नींबू, संतरा, लाइम)" } },
        { value: "papaya", label: { en: "Papaya (Amruta Bhanda)", odia: "ଅମୃତଭଣ୍ଡା (Amrutabhanda)", hi: "पपीता" } },
        { value: "watermelon", label: { en: "Watermelon (Tarbuja)", odia: "ତରଭୁଜ (Tarabhuja)", hi: "तरबूज" } },
        { value: "muskmelon", label: { en: "Muskmelon (Kharbuja)", odia: "ଖରଭୁଜ (Kharabhuja)", hi: "खरबूजा" } },
        { value: "pineapple", label: { en: "Pineapple (Sapuri)", odia: "ସପୁରୀ (Sapun)", hi: "अनानास" } },
      ],
    },
    {
      category: {
        en: "Fodder Crops (for livestock)",
        odia: "ଗୋଖାଦ୍ୟ ଫସଲ",
        hi: "चारा फसलें (पशुधन के लिए)"
      },
      crops: [
        { value: "sorghum_fodder", label: { en: "Sorghum (for fodder)", odia: "ଗୋଖାଦ୍ୟ ପାଇଁ ଜୁଆର (Gokhadya Pain Juar)", hi: "चारे के लिए ज्वार" } },
        { value: "maize_fodder", label: { en: "Maize (for fodder)", odia: "ଗୋଖାଦ୍ୟ ପାଇଁ ମକା (Gokhadya Pain Maka)", hi: "चारे के लिए मक्का" } },
        { value: "napier_grass", label: { en: "Napier Grass", odia: "ନେପିୟର ଘାସ (Napier Ghasa)", hi: "नेपियर घास" } },
        { value: "guinea_grass", label: { en: "Guinea Grass", odia: "ଗିନି ଘାସ (Guinea Ghasa)", hi: "गिनी घास" } },
        { value: "berseem", label: { en: "Berseem", odia: "ବର୍ସିମ୍ (Barsim)", hi: "बरसीम" } },
      ],
    },
    {
      category: {
        en: "Plantation Crops",
        odia: "ବଗିଚା ଫସଲ",
        hi: "बागवानी फसलें"
      },
      crops: [
        { value: "coconut", label: { en: "Coconut", odia: "ନଡ଼ିଆ (Nadia)", hi: "नारियल" } },
        { value: "rubber", label: { en: "Rubber", odia: "ରବର (Rabara)", hi: "रबर" } },
        { value: "coffee", label: { en: "Coffee", odia: "କଫି (Kafi)", hi: "कॉफी" } },
        { value: "tea", label: { en: "Tea", odia: "ଚା (Cha)", hi: "चाय" } },
      ],
    },
];

export default broadCropCategoriesMultiLang;








