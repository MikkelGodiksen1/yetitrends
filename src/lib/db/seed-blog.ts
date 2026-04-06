import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const posts = [
  {
    title: "Afrikanske kjoler: Din guide til autentisk afrikansk mode",
    slug: "afrikanske-kjoler-guide",
    excerpt:
      "Alt du skal vide om afrikanske kjoler — fra ankara-prints til moderne silhuetter. Lær hvordan du vælger den perfekte afrikanske kjole til enhver lejlighed.",
    imageUrl: "/images/products/maxi-1.png",
    body: `<h2>Hvad er afrikanske kjoler?</h2>
<p>Afrikanske kjoler er langt mere end blot tøj — de er et udtryk for kulturel identitet, håndværkstradition og kreativ selvstændighed. Med rødder i vestafrikansk tekstilkunst kombinerer moderne afrikanske kjoler traditionelle mønstre med samtidige snit.</p>

<p>Hos <a href="/katalog">Yetitrends</a> bringer vi autentiske afrikanske designs til Norden. Vores kjoler er håndlavet i Nigeria med premium ankara-stoffer, og hvert stykke fortæller en historie om afrikansk kultur og traditionsrigt håndværk.</p>

<h2>De mest populære typer afrikanske kjoler</h2>
<p><strong>Ankara maxi-kjoler</strong> er blandt de mest eftertragtede styles. Med deres lange, flydende silhuet og farverige print er de perfekte til både hverdagen og festlige lejligheder. Ankara-stoffet er kendt for sine dristige geometriske mønstre og levende farvekombinationer.</p>

<p><strong>Two-piece sæt</strong> bestående af matchende top og bukser eller nederdel er en anden elsket stil. Disse sæt giver dig fleksibilitet — bær dem sammen for et komplet look, eller mix dem med andre dele i din garderobe.</p>

<p><strong>Kimono-jakker</strong> med afrikansk print er perfekte som et statement-piece over et enkelt outfit. De kombinerer den japanske kimonos afslappede elegance med afrikanske tekstilers kraftfulde udtryk.</p>

<h2>Sådan vælger du den rette afrikanske kjole</h2>
<p>Når du vælger en afrikansk kjole, bør du overveje lejligheden, dit kropsform og hvilke farver der fremhæver din hudtone. Ankara-stoffer fås i utallige farvekombinationer — fra dæmpede jordfarver til explosive neoner.</p>

<p>For hverdagen anbefaler vi et komfortabelt two-piece sæt i bomuld. Til fester og særlige lejligheder er en maxi-kjole i premium ankara-stof et sikkert valg, der vil skille dig ud fra mængden.</p>

<p>Udforsk vores <a href="/katalog">komplette kollektion</a> og find din næste afrikanske favoritkjole.</p>`,
  },
  {
    title: "Ankara-stof: Alt du skal vide om Afrikas mest populære tekstil",
    slug: "ankara-stof-guide",
    excerpt:
      "Ankara-stof er hjertet af afrikansk mode. Lær om stoffets historie, fremstilling og hvorfor det er blevet et globalt modefænomen.",
    imageUrl: "/images/products/two-piece-1.png",
    body: `<h2>Historien bag ankara-stof</h2>
<p>Ankara-stof, også kendt som African wax print, har en fascinerende historie der strækker sig over flere kontinenter. Oprindeligt inspireret af indonesisk batik-teknik, blev stoffet introduceret til Vestafrika i det 19. århundrede og har siden udviklet sin helt egen identitet.</p>

<p>I dag er ankara-stof synonymt med afrikansk mode og kultur. De karakteristiske voksprint-mønstre produceres primært i lande som Nigeria, Ghana og Senegal, hvor lokale designere skaber unikke mønstre med kulturel betydning.</p>

<h2>Hvad gør ankara-stof særligt?</h2>
<p>Ankara adskiller sig fra andre stoffer på flere måder. For det første er hvert mønster et kunstværk — designet med omhu og ofte med symbolsk betydning. For det andet er stoffet fremstillet af 100% bomuld, hvilket gør det åndbart og komfortabelt i alle klimaer.</p>

<p>Den særlige vokstryk-teknik sikrer, at mønsteret er identisk på begge sider af stoffet. Dette giver tøjet en unik kvalitet og holdbarhed, som du sjældent finder i masseproduceret mode.</p>

<h2>Ankara i moderne mode</h2>
<p>Ankara-stof er ikke længere begrænset til traditionelt afrikansk tøj. Internationale modehuse og designere har omfavnet stoffet, og det ses nu på catwalks verden over. Fra kjoler og jakker til tasker og accessories — ankara er overalt.</p>

<p>Hos <a href="/katalog">Yetitrends</a> arbejder vi med premium ankara-stoffer direkte fra Nigeria. Vores <a href="/katalog">two-piece sæt</a> og maxi-kjoler er skabt med ægte voksprint-stoffer, der bevarer deres farver og mønstre vask efter vask.</p>

<h2>Pleje af ankara-tøj</h2>
<p>For at bevare dit ankara-tøjs skønhed anbefaler vi håndvask eller skånevask ved 30 grader. Undgå tørretumbler og tør i stedet tøjet fladt eller på bøjle. Med korrekt pleje holder ankara-stoffer i årevis.</p>`,
  },
  {
    title: "Sådan styler du afrikansk print i din hverdag",
    slug: "style-afrikansk-print",
    excerpt:
      "Afrikanske prints behøver ikke være forbeholdt fester. Her får du 5 nemme tips til at integrere afrikansk mode i din daglige stil.",
    imageUrl: "/images/products/kimono-1.png",
    body: `<h2>Afrikansk mode i hverdagen</h2>
<p>Mange tror, at afrikanske prints kun hører til ved festlige lejligheder. Men sandheden er, at afrikansk mode er utroligt alsidig og kan styles til enhver situation — fra kontormøder til weekendbrunch.</p>

<h2>Tip 1: Start med ét statement-piece</h2>
<p>Hvis du er ny i verden af afrikansk mode, er det bedste råd at starte simpelt. Vælg ét stykke afrikansk tøj og kombiner det med neutrale basics. En <a href="/katalog">afrikansk kimono-jakke</a> over en sort t-shirt og jeans er et perfekt udgangspunkt.</p>

<h2>Tip 2: Mix prints med solide farver</h2>
<p>Afrikanske prints er ofte farverige og detaljerede. Balancer dit look ved at parre printet med ensfarvet tøj. Vælg en farve fra printet og match den med dine accessories eller sko for et sammenhængende look.</p>

<h2>Tip 3: Brug accessories</h2>
<p>Hvis hele outfits føles som et stort spring, så start med accessories. Et ankara-tørklæde, en printed taske eller et par statement-øreringe kan tilføje et afrikansk touch til ethvert outfit.</p>

<h2>Tip 4: Layer med en kimono</h2>
<p>En <a href="/katalog">afrikansk patchwork kimono</a> er det ultimative layering-piece. Bær den over en kjole, med jeans og top, eller endda over et arbejdsunifit. Kimonoen tilføjer øjeblikkeligt personlighed og farve.</p>

<h2>Tip 5: Ejer din stil</h2>
<p>Det vigtigste tip er selvtillid. Afrikansk mode handler om at fejre farve, kultur og individualitet. Bær det med stolthed, og du vil opdage, at omgivelserne reagerer positivt.</p>

<p>Find dit næste statement-piece i vores <a href="/katalog">kollektion af afrikansk mode</a>.</p>`,
  },
  {
    title: "Bæredygtig afrikansk mode: Håndværk møder moderne design",
    slug: "baeredygtig-afrikansk-mode",
    excerpt:
      "Hvorfor afrikansk mode er et naturligt valg for den bevidste forbruger. Om håndværk, fair trade og bæredygtige materialer.",
    imageUrl: "/images/products/brand-1.png",
    body: `<h2>Mode med mening</h2>
<p>I en tid hvor fast fashion dominerer, tilbyder afrikansk mode et alternativ der er rodfæstet i håndværk, kvalitet og fællesskab. Når du vælger et håndlavet afrikansk stykke tøj, vælger du mere end stil — du vælger en bæredygtig tilgang til mode.</p>

<h2>Håndværk frem for masseproduktion</h2>
<p>Hos <a href="/katalog">Yetitrends</a> er hvert eneste produkt håndlavet af dygtige håndværkere i Nigeria. Denne tilgang sikrer ikke kun overlegen kvalitet, men også at hvert stykke er unikt. I modsætning til masseproduceret tøj fra fabrikker, bærer håndlavet tøj spor af menneskelig omhu og kreativitet.</p>

<p>Vores producenter arbejder med traditionelle teknikker, der er gået i arv gennem generationer. Ved at støtte dette håndværk hjælper vi med at bevare vigtige kulturelle traditioner.</p>

<h2>Fair trade og lokale fællesskaber</h2>
<p>Vi samarbejder direkte med vores producenter for at sikre retfærdige arbejdsforhold og fair løn. Når du køber fra Yetitrends, bidrager du direkte til lokale fællesskabers økonomi i Nigeria.</p>

<p>Denne direkte forbindelse mellem forbruger og håndværker er kernen i bæredygtig mode. Ingen mellemled, ingen udnyttelse — kun ærligt håndværk til en fair pris.</p>

<h2>Naturlige materialer</h2>
<p>Vores tøj er fremstillet af 100% bomuld og naturlige ankara-stoffer. Disse materialer er åndbare, holdbare og nedbrydelige — et langt bedre valg for miljøet end syntetiske alternativer.</p>

<h2>Kvalitet der holder</h2>
<p>Et af de mest bæredygtige valg du kan træffe er at købe tøj af høj kvalitet, der holder i årevis. Vores <a href="/katalog">afrikanske kjoler og jakker</a> er designet til at bestå — både i stil og holdbarhed.</p>

<p>Investér i tøj med historie og kvalitet. <a href="/katalog">Se vores kollektion</a>.</p>`,
  },
  {
    title: "Kimono-jakker med afrikansk inspiration: Sæsonens must-have",
    slug: "kimono-jakker-afrikansk",
    excerpt:
      "Kimono-jakken er den perfekte fusion af østlig elegance og afrikansk kreativitet. Lær hvordan du bærer sæsonens mest alsidige stykke tøj.",
    imageUrl: "/images/products/kimono-b-1.png",
    body: `<h2>Den afrikanske kimono: Et kulturelt møde</h2>
<p>Kimono-jakken har sine rødder i japansk tradition, men i afrikansk modes hænder er den blevet transformeret til noget helt unikt. Med farverige patchwork-mønstre og ankara-prints bliver kimonoen et statement-piece, der forener to rige kulturelle traditioner.</p>

<h2>Hvorfor kimono-jakken er årets must-have</h2>
<p>Der er flere grunde til, at den afrikanske kimono-jakke har taget modeverdenen med storm:</p>

<p><strong>Alsidighed:</strong> Bær den til jeans og sneakers i hverdagen, eller over en kjole til en aften ude. Kimonoen tilpasser sig enhver situation og gør selv det enkleste outfit interessant.</p>

<p><strong>One size:</strong> Kimonoens løse pasform gør den inkluderende — den passer de fleste kropsformer og kan styles på utallige måder. Brug et bælte for en mere defineret silhuet, eller lad den hænge løst for en afslappet vibe.</p>

<p><strong>Praktisk:</strong> Vores <a href="/katalog">patchwork kimono-jakker</a> kommer med praktiske lommer — et plus der kombinerer stil med funktionalitet.</p>

<h2>Sådan styler du din afrikanske kimono</h2>
<p><strong>Casual look:</strong> Par din kimono med en hvid t-shirt, sorte jeans og hvide sneakers. Lad kimonoen være midtpunktet i dit outfit.</p>

<p><strong>Kontor-look:</strong> Brug kimonoen som et alternativ til en blazer over en pæn bluse og bukser. Det tilføjer personlighed uden at gå på kompromis med professionalismen.</p>

<p><strong>Fest-look:</strong> Over en sort kjole eller jumpsuit bliver kimonoen det perfekte statement-piece til en aften ude.</p>

<h2>Vores kimono-kollektion</h2>
<p>Hos <a href="/katalog">Yetitrends</a> tilbyder vi håndlavede patchwork kimono-jakker i autentiske afrikanske stoffer. Hver jakke er unik takket være patchwork-teknikken, der kombinerer forskellige ankara-prints i ét harmonisk design.</p>

<p>Find din perfekte kimono i vores <a href="/katalog">kollektion</a>.</p>`,
  },
];

async function seedBlog() {
  console.log("Seeding blog posts...");

  await db.delete(schema.blogPosts);

  for (const post of posts) {
    await db.insert(schema.blogPosts).values(post);
  }

  console.log(`Seeded ${posts.length} blog posts!`);
}

seedBlog().catch(console.error);
