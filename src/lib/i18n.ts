export type Locale = "da" | "en" | "de" | "sv" | "no";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "da", label: "Dansk", flag: "🇩🇰" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
];

export const DEFAULT_LOCALE: Locale = "da";

const translations: Record<string, Record<Locale, string>> = {
  // ─── Navbar ───
  "nav.katalog": { da: "Katalog", en: "Shop", de: "Kollektion", sv: "Katalog", no: "Katalog" },
  "nav.blog": { da: "Blog", en: "Blog", de: "Blog", sv: "Blogg", no: "Blogg" },
  "nav.about": { da: "Om os", en: "About", de: "Über uns", sv: "Om oss", no: "Om oss" },
  "nav.contact": { da: "Kontakt", en: "Contact", de: "Kontakt", sv: "Kontakt", no: "Kontakt" },
  "nav.cart": { da: "Vis indkøbskurv", en: "View cart", de: "Warenkorb anzeigen", sv: "Visa varukorg", no: "Vis handlekurv" },

  // ─── Hero ───
  "hero.title": { da: "Autentisk afrikansk mode", en: "Authentic African Fashion", de: "Authentische afrikanische Mode", sv: "Autentiskt afrikanskt mode", no: "Autentisk afrikansk mote" },
  "hero.subtitle": { da: "Unikke designs inspireret af Afrikas rige kulturarv", en: "Unique designs inspired by Africa's rich cultural heritage", de: "Einzigartige Designs inspiriert von Afrikas reichem Kulturerbe", sv: "Unika designs inspirerade av Afrikas rika kulturarv", no: "Unike design inspirert av Afrikas rike kulturarv" },
  "hero.cta": { da: "Se kollektion", en: "Shop now", de: "Jetzt shoppen", sv: "Se kollektion", no: "Se kolleksjon" },

  // ─── USP Banner ───
  "usp.shipping": { da: "Gratis fragt over 500 kr.", en: "Free shipping over 500 kr.", de: "Kostenloser Versand ab 500 kr.", sv: "Fri frakt över 500 kr.", no: "Gratis frakt over 500 kr." },
  "usp.shipping.sub": { da: "Levering i hele Norden", en: "Delivery across the Nordics", de: "Lieferung in ganz Skandinavien", sv: "Leverans i hela Norden", no: "Levering i hele Norden" },
  "usp.handmade": { da: "Håndlavet i Nigeria", en: "Handmade in Nigeria", de: "Handgefertigt in Nigeria", sv: "Handgjord i Nigeria", no: "Håndlaget i Nigeria" },
  "usp.handmade.sub": { da: "Autentisk afrikansk håndværk", en: "Authentic African craftsmanship", de: "Authentisches afrikanisches Handwerk", sv: "Autentiskt afrikanskt hantverk", no: "Autentisk afrikansk håndverk" },
  "usp.returns": { da: "30 dages returret", en: "30-day returns", de: "30 Tage Rückgaberecht", sv: "30 dagars returrätt", no: "30 dagers returrett" },
  "usp.returns.sub": { da: "Fuld tilfredshedsgaranti", en: "Full satisfaction guarantee", de: "Volle Zufriedenheitsgarantie", sv: "Full nöjdhetsgaranti", no: "Full tilfredshetsgaranti" },

  // ─── Categories ───
  "cat.title": { da: "Shop efter kategori", en: "Shop by category", de: "Nach Kategorie shoppen", sv: "Shoppa efter kategori", no: "Handle etter kategori" },
  "cat.subtitle": { da: "Find din stil i vores håndlavede kollektioner", en: "Find your style in our handmade collections", de: "Finden Sie Ihren Stil in unseren handgefertigten Kollektionen", sv: "Hitta din stil i våra handgjorda kollektioner", no: "Finn din stil i våre håndlagde kolleksjoner" },
  "cat.dresses": { da: "Kjoler", en: "Dresses", de: "Kleider", sv: "Klänningar", no: "Kjoler" },
  "cat.kimonos": { da: "Kimono-jakker", en: "Kimono Jackets", de: "Kimono-Jacken", sv: "Kimonojackor", no: "Kimonojakker" },
  "cat.twopiece": { da: "Two-Piece Sæt", en: "Two-Piece Sets", de: "Zweiteilige Sets", sv: "Tvådelade set", no: "Two-Piece sett" },
  "cat.cta": { da: "Se udvalg →", en: "Browse →", de: "Entdecken →", sv: "Se utbud →", no: "Se utvalg →" },

  // ─── Featured Products ───
  "featured.title": { da: "Udvalgte produkter", en: "Featured Products", de: "Ausgewählte Produkte", sv: "Utvalda produkter", no: "Utvalgte produkter" },
  "featured.subtitle": { da: "Håndplukkede favoritter fra vores kollektion", en: "Handpicked favorites from our collection", de: "Handverlesene Favoriten aus unserer Kollektion", sv: "Handplockade favoriter från vår kollektion", no: "Håndplukkede favoritter fra vår kolleksjon" },
  "featured.all": { da: "Se alle produkter →", en: "View all products →", de: "Alle Produkte ansehen →", sv: "Se alla produkter →", no: "Se alle produkter →" },

  // ─── Quote Banner ───
  "quote.text": { da: "Hvert stykke tøj bærer en historie om tradition, håndværk og kreativitet", en: "Every piece of clothing carries a story of tradition, craftsmanship and creativity", de: "Jedes Kleidungsstück trägt eine Geschichte von Tradition, Handwerk und Kreativität", sv: "Varje plagg bär en historia om tradition, hantverk och kreativitet", no: "Hvert plagg bærer en historie om tradisjon, håndverk og kreativitet" },
  "quote.cta": { da: "Læs vores historie", en: "Read our story", de: "Unsere Geschichte lesen", sv: "Läs vår historia", no: "Les vår historie" },

  // ─── New in Shop ───
  "new.title": { da: "Nyt i shoppen", en: "New Arrivals", de: "Neuheiten", sv: "Nytt i butiken", no: "Nytt i butikken" },
  "new.subtitle": { da: "De seneste tilføjelser til vores kollektion", en: "Latest additions to our collection", de: "Die neuesten Ergänzungen unserer Kollektion", sv: "De senaste tillskotten i vår kollektion", no: "De siste tilskuddene i vår kolleksjon" },
  "new.all": { da: "Se alle →", en: "View all →", de: "Alle ansehen →", sv: "Se alla →", no: "Se alle →" },

  // ─── Testimonials ───
  "testimonials.title": { da: "Hvad vores kunder siger", en: "What our customers say", de: "Was unsere Kunden sagen", sv: "Vad våra kunder säger", no: "Hva kundene våre sier" },

  // ─── Brand Story ───
  "story.label": { da: "Vores historie", en: "Our Story", de: "Unsere Geschichte", sv: "Vår historia", no: "Vår historie" },
  "story.title": { da: "Fra Nigeria til Norden", en: "From Nigeria to the Nordics", de: "Von Nigeria nach Skandinavien", sv: "Från Nigeria till Norden", no: "Fra Nigeria til Norden" },
  "story.p1": { da: "Yetitrends fejrer skønheden i afrikansk mode og kultur. Vi bringer autentiske, håndlavede designs fra talentfulde afrikanske kunstnere direkte til Skandinavien.", en: "Yetitrends celebrates the beauty of African fashion and culture. We bring authentic, handmade designs from talented African artisans directly to Scandinavia.", de: "Yetitrends feiert die Schönheit afrikanischer Mode und Kultur. Wir bringen authentische, handgefertigte Designs von talentierten afrikanischen Künstlern direkt nach Skandinavien.", sv: "Yetitrends firar skönheten i afrikanskt mode och kultur. Vi bringar autentiska, handgjorda designs från talangfulla afrikanska konstnärer direkt till Skandinavien.", no: "Yetitrends feirer skjønnheten i afrikansk mote og kultur. Vi bringer autentiske, håndlagde design fra talentfulle afrikanske kunstnere direkte til Skandinavia." },
  "story.p2": { da: "Hvert stykke tøj fortæller en historie om tradition, håndværk og kreativitet. Vi tror på bæredygtig mode, der respekterer både mennesker og planeten.", en: "Every piece of clothing tells a story of tradition, craftsmanship and creativity. We believe in sustainable fashion that respects both people and the planet.", de: "Jedes Kleidungsstück erzählt eine Geschichte von Tradition, Handwerk und Kreativität. Wir glauben an nachhaltige Mode, die sowohl Menschen als auch den Planeten respektiert.", sv: "Varje plagg berättar en historia om tradition, hantverk och kreativitet. Vi tror på hållbart mode som respekterar både människor och planeten.", no: "Hvert plagg forteller en historie om tradisjon, håndverk og kreativitet. Vi tror på bærekraftig mote som respekterer både mennesker og planeten." },
  "story.cta": { da: "Læs mere om os", en: "Learn more about us", de: "Mehr über uns erfahren", sv: "Läs mer om oss", no: "Les mer om oss" },

  // ─── Instagram ───
  "instagram.title": { da: "Følg os på Instagram", en: "Follow us on Instagram", de: "Folgen Sie uns auf Instagram", sv: "Följ oss på Instagram", no: "Følg oss på Instagram" },

  // ─── Why Yetitrends ───
  "why.title": { da: "Hvorfor Yetitrends?", en: "Why Yetitrends?", de: "Warum Yetitrends?", sv: "Varför Yetitrends?", no: "Hvorfor Yetitrends?" },
  "why.craft.title": { da: "Autentisk håndværk", en: "Authentic Craftsmanship", de: "Authentisches Handwerk", sv: "Autentiskt hantverk", no: "Autentisk håndverk" },
  "why.craft.desc": { da: "Hvert design er lavet af dygtige håndværkere med generationers erfaring", en: "Every design is made by skilled artisans with generations of experience", de: "Jedes Design wird von erfahrenen Handwerkern mit generationenlanger Erfahrung gefertigt", sv: "Varje design är gjord av skickliga hantverkare med generationers erfarenhet", no: "Hvert design er laget av dyktige håndverkere med generasjoners erfaring" },
  "why.cotton.title": { da: "Premium bomuld", en: "Premium Cotton", de: "Premium-Baumwolle", sv: "Premiumhampa", no: "Premium bomull" },
  "why.cotton.desc": { da: "100% bomuld — åndbart, holdbart og komfortabelt i alle klimaer", en: "100% cotton — breathable, durable and comfortable in all climates", de: "100% Baumwolle — atmungsaktiv, langlebig und bequem in jedem Klima", sv: "100% bomull — andningsbart, hållbart och bekvämt i alla klimat", no: "100% bomull — pustende, holdbart og komfortabelt i alle klima" },
  "why.fair.title": { da: "Fair trade", en: "Fair Trade", de: "Fairer Handel", sv: "Rättvis handel", no: "Rettferdig handel" },
  "why.fair.desc": { da: "Direkte samarbejde med producenter i Nigeria. Retfærdig løn og vilkår", en: "Direct collaboration with producers in Nigeria. Fair wages and conditions", de: "Direkte Zusammenarbeit mit Produzenten in Nigeria. Faire Löhne und Bedingungen", sv: "Direkt samarbete med producenter i Nigeria. Rättvisa löner och villkor", no: "Direkte samarbeid med produsenter i Nigeria. Rettferdig lønn og vilkår" },
  "why.service.title": { da: "Nordisk service", en: "Nordic Service", de: "Nordischer Service", sv: "Nordisk service", no: "Nordisk service" },
  "why.service.desc": { da: "Dansk kundeservice, hurtig levering til hele Norden", en: "Danish customer service, fast delivery across the Nordics", de: "Dänischer Kundenservice, schnelle Lieferung in ganz Skandinavien", sv: "Dansk kundtjänst, snabb leverans till hela Norden", no: "Dansk kundeservice, rask levering til hele Norden" },

  // ─── Blog Preview ───
  "blog.title": { da: "Fra bloggen", en: "From the Blog", de: "Aus dem Blog", sv: "Från bloggen", no: "Fra bloggen" },
  "blog.subtitle": { da: "Inspiration og guides om afrikansk mode", en: "Inspiration and guides about African fashion", de: "Inspiration und Anleitungen zur afrikanischen Mode", sv: "Inspiration och guider om afrikanskt mode", no: "Inspirasjon og guider om afrikansk mote" },
  "blog.all": { da: "Se alle indlæg →", en: "View all posts →", de: "Alle Beiträge ansehen →", sv: "Se alla inlägg →", no: "Se alle innlegg →" },

  // ─── Newsletter ───
  "newsletter.title": { da: "Bliv en del af fællesskabet", en: "Join the Community", de: "Werden Sie Teil der Community", sv: "Bli en del av gemenskapen", no: "Bli en del av fellesskapet" },
  "newsletter.subtitle": { da: "Tilmeld dig vores nyhedsbrev og vær den første til at se nye kollektioner og eksklusive tilbud.", en: "Subscribe to our newsletter and be the first to see new collections and exclusive offers.", de: "Abonnieren Sie unseren Newsletter und seien Sie die Ersten, die neue Kollektionen und exklusive Angebote sehen.", sv: "Prenumerera på vårt nyhetsbrev och var först med att se nya kollektioner och exklusiva erbjudanden.", no: "Meld deg på nyhetsbrevet vårt og vær den første til å se nye kolleksjoner og eksklusive tilbud." },

  // ─── Cart ───
  "cart.title": { da: "Indkøbskurv", en: "Shopping Cart", de: "Warenkorb", sv: "Varukorg", no: "Handlekurv" },
  "cart.empty": { da: "Din indkøbskurv er tom", en: "Your cart is empty", de: "Ihr Warenkorb ist leer", sv: "Din varukorg är tom", no: "Handlekurven din er tom" },
  "cart.checkout": { da: "Gå til betaling", en: "Proceed to checkout", de: "Zur Kasse gehen", sv: "Gå till kassan", no: "Gå til betaling" },
  "cart.continue": { da: "Fortsæt med at handle", en: "Continue shopping", de: "Weiter einkaufen", sv: "Fortsätt handla", no: "Fortsett å handle" },
  "cart.add": { da: "Tilføj til kurv", en: "Add to cart", de: "In den Warenkorb", sv: "Lägg i varukorg", no: "Legg i handlekurv" },
  "cart.added": { da: "Tilføjet!", en: "Added!", de: "Hinzugefügt!", sv: "Tillagd!", no: "Lagt til!" },
  "cart.size": { da: "Størrelse", en: "Size", de: "Größe", sv: "Storlek", no: "Størrelse" },
  "cart.subtotal": { da: "Subtotal", en: "Subtotal", de: "Zwischensumme", sv: "Delsumma", no: "Delsum" },

  // ─── Footer ───
  "footer.shop": { da: "Shop", en: "Shop", de: "Shop", sv: "Butik", no: "Butikk" },
  "footer.about": { da: "Om Yetitrends", en: "About Yetitrends", de: "Über Yetitrends", sv: "Om Yetitrends", no: "Om Yetitrends" },
  "footer.newsletter": { da: "Nyhedsbrev", en: "Newsletter", de: "Newsletter", sv: "Nyhetsbrev", no: "Nyhetsbrev" },
  "footer.newsletter.sub": { da: "Tilmeld dig og vær den første til at se nye kollektioner.", en: "Subscribe and be the first to see new collections.", de: "Abonnieren Sie und sehen Sie neue Kollektionen zuerst.", sv: "Prenumerera och var först med att se nya kollektioner.", no: "Meld deg på og vær den første til å se nye kolleksjoner." },
  "footer.newsletter.placeholder": { da: "Din e-mail", en: "Your email", de: "Ihre E-Mail", sv: "Din e-post", no: "Din e-post" },
  "footer.newsletter.submit": { da: "Tilmeld", en: "Subscribe", de: "Abonnieren", sv: "Prenumerera", no: "Abonner" },
  "footer.copyright": { da: "Alle rettigheder forbeholdes.", en: "All rights reserved.", de: "Alle Rechte vorbehalten.", sv: "Alla rättigheter förbehållna.", no: "Alle rettigheter forbeholdt." },
  "footer.history": { da: "Vores historie", en: "Our Story", de: "Unsere Geschichte", sv: "Vår historia", no: "Vår historie" },
  "footer.terms": { da: "Handelsbetingelser", en: "Terms & Conditions", de: "AGB", sv: "Villkor", no: "Vilkår" },
  "footer.privacy": { da: "Privatlivspolitik", en: "Privacy Policy", de: "Datenschutz", sv: "Integritetspolicy", no: "Personvern" },

  // ─── Cart Page (kurv) ───
  "cart.empty.title": { da: "Din kurv er tom", en: "Your cart is empty", de: "Ihr Warenkorb ist leer", sv: "Din varukorg är tom", no: "Handlekurven din er tom" },
  "cart.empty.desc": { da: "Du har ikke tilføjet nogen produkter endnu.", en: "You haven't added any products yet.", de: "Sie haben noch keine Produkte hinzugefügt.", sv: "Du har inte lagt till några produkter ännu.", no: "Du har ikke lagt til noen produkter ennå." },
  "cart.empty.cta": { da: "Se vores katalog", en: "Browse our catalog", de: "Unseren Katalog ansehen", sv: "Se vår katalog", no: "Se vår katalog" },
  "cart.your": { da: "Din kurv", en: "Your cart", de: "Ihr Warenkorb", sv: "Din varukorg", no: "Din handlekurv" },
  "cart.close": { da: "Luk kurv", en: "Close cart", de: "Warenkorb schließen", sv: "Stäng varukorg", no: "Lukk handlekurv" },
  "cart.empty.msg": { da: "Din kurv er tom.", en: "Your cart is empty.", de: "Ihr Warenkorb ist leer.", sv: "Din varukorg är tom.", no: "Handlekurven din er tom." },
  "cart.size.label": { da: "Str.", en: "Size", de: "Gr.", sv: "Strl.", no: "Str." },
  "cart.remove": { da: "Fjern", en: "Remove", de: "Entfernen", sv: "Ta bort", no: "Fjern" },
  "cart.redirecting": { da: "Omdirigerer...", en: "Redirecting...", de: "Weiterleitung...", sv: "Omdirigerar...", no: "Omdirigerer..." },
  "cart.noimage": { da: "Intet billede", en: "No image", de: "Kein Bild", sv: "Ingen bild", no: "Intet bilde" },

  // ─── Testimonials ───
  "review.1": { da: "Fantastisk kvalitet og super hurtig levering! Min ankara-kjole er endnu smukkere i virkeligheden end på billederne.", en: "Amazing quality and super fast delivery! My ankara dress is even more beautiful in person than in the photos.", de: "Fantastische Qualität und superschnelle Lieferung! Mein Ankara-Kleid ist in Wirklichkeit noch schöner als auf den Bildern.", sv: "Fantastisk kvalitet och supersnabb leverans! Min ankara-klänning är ännu vackrare i verkligheten än på bilderna.", no: "Fantastisk kvalitet og superrask levering! Min ankara-kjole er enda vakrere i virkeligheten enn på bildene." },
  "review.2": { da: "Min kimono-jakke får komplimenter hver eneste gang jeg har den på. Det er mit yndlingsstykke tøj!", en: "My kimono jacket gets compliments every single time I wear it. It's my favorite piece of clothing!", de: "Meine Kimono-Jacke bekommt jedes Mal Komplimente, wenn ich sie trage. Es ist mein Lieblingskleidungsstück!", sv: "Min kimonojacka får komplimanger varje gång jag har den på mig. Det är mitt favoritplagg!", no: "Kimonojakken min får komplimenter hver eneste gang jeg har den på. Det er favorittplaggget mitt!" },
  "review.3": { da: "Elsker de unikke mønstre og at det er ægte afrikansk håndværk. Man kan mærke kvaliteten.", en: "Love the unique patterns and that it's genuine African craftsmanship. You can feel the quality.", de: "Liebe die einzigartigen Muster und dass es echtes afrikanisches Handwerk ist. Man spürt die Qualität.", sv: "Älskar de unika mönstren och att det är äkta afrikanskt hantverk. Man kan känna kvaliteten.", no: "Elsker de unike mønstrene og at det er ekte afrikansk håndverk. Man kan kjenne kvaliteten." },
  "review.4": { da: "Bedste online-shopping oplevelse i lang tid. Tøjet sidder perfekt og stoffet er fantastisk blødt.", en: "Best online shopping experience in a long time. The clothes fit perfectly and the fabric is amazingly soft.", de: "Bestes Online-Shopping-Erlebnis seit langem. Die Kleidung sitzt perfekt und der Stoff ist fantastisch weich.", sv: "Bästa shoppingupplevelsen online på länge. Kläderna sitter perfekt och tyget är fantastiskt mjukt.", no: "Beste netthandelsopplevelse på lenge. Klærne sitter perfekt og stoffet er fantastisk mykt." },
  "review.5": { da: "Jeg har købt tre kimonoer nu — hver enkelt er unik og får mig til at føle mig som en dronning.", en: "I've bought three kimonos now — each one is unique and makes me feel like a queen.", de: "Ich habe jetzt drei Kimonos gekauft — jeder einzelne ist einzigartig und lässt mich wie eine Königin fühlen.", sv: "Jag har köpt tre kimonor nu — var och en är unik och får mig att känna mig som en drottning.", no: "Jeg har kjøpt tre kimonoer nå — hver enkelt er unik og får meg til å føle meg som en dronning." },
  "review.6": { da: "Virkelig flot two-piece sæt. Farverne er præcis som på billederne. Kommer til at købe mere!", en: "Really beautiful two-piece set. The colors are exactly as in the photos. Will definitely buy more!", de: "Wirklich schönes Zweiteiliges Set. Die Farben sind genau wie auf den Bildern. Werde definitiv mehr kaufen!", sv: "Riktigt fint tvådelat set. Färgerna är precis som på bilderna. Kommer definitivt att köpa mer!", no: "Virkelig flott two-piece sett. Fargene er akkurat som på bildene. Kommer til å kjøpe mer!" },
  "review.7": { da: "Hurtig levering til Norge og pakken var smukt indpakket. Føles som en gave til mig selv.", en: "Fast delivery to Norway and the package was beautifully wrapped. Feels like a gift to myself.", de: "Schnelle Lieferung nach Norwegen und die Verpackung war wunderschön. Fühlt sich wie ein Geschenk an mich selbst an.", sv: "Snabb leverans till Norge och paketet var vackert inslaget. Känns som en present till mig själv.", no: "Rask levering til Norge og pakken var vakkert innpakket. Føles som en gave til meg selv." },
  "review.8": { da: "Modtog så mange komplimenter til min venindes bryllup. Alle ville vide hvor kjolen var fra!", en: "Received so many compliments at my friend's wedding. Everyone wanted to know where the dress was from!", de: "Habe so viele Komplimente auf der Hochzeit meiner Freundin bekommen. Alle wollten wissen, woher das Kleid stammt!", sv: "Fick så många komplimanger på min väns bröllop. Alla ville veta var klänningen kom ifrån!", no: "Fikk så mange komplimenter i venninnas bryllup. Alle ville vite hvor kjolen var fra!" },

  // ─── Product Page ───
  "product.notfound": { da: "Produkt ikke fundet", en: "Product not found", de: "Produkt nicht gefunden", sv: "Produkt hittades inte", no: "Produkt ikke funnet" },

  // ─── Katalog ───
  "katalog.title": { da: "Katalog", en: "Shop", de: "Kollektion", sv: "Katalog", no: "Katalog" },
  "katalog.empty": { da: "Ingen produkter fundet.", en: "No products found.", de: "Keine Produkte gefunden.", sv: "Inga produkter hittades.", no: "Ingen produkter funnet." },
};

export function t(key: string, locale: Locale): string {
  return translations[key]?.[locale] ?? translations[key]?.["da"] ?? key;
}
