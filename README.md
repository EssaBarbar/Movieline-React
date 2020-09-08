
Titel: Movieline

/*..................................... */

Grupp 7:
Michelle, Essa, Yanica, Samer

/*..................................... */

Beskrivning 
             Vi byggde en e-shop som säljer filmer, inspirerad av en gammal butik som fanns i Göteborg (Movieline).
             Man kommer in på Startsida där man se alla produkter. För att ha en Detail View trycker man på Titel av en vald produkt.
             Det är möjligt att lägga till en produkt till kundvagn både från Startsida och DetailView sida.
             Antal produkter i kundvagnen visas på navbar.
             Trycker man på cart-icon kommer man till kundvagnssida.
             Här ser man beställningen.
             Delete knappen ta bort en singel produkt.
             Total pris visas i botten.
             För att komma till CheckOut sida trycker man på CHECKOUT längst ner.
             I checkoutsida får man en sammanfattning av beställning, uppdelad såhär:
             - Summary of your order: produkterna som finns i cart, med antalet, pris x antalet och igen, totalpriset av alla produkter.
             - Your Info: här filler man in formulär. Fälten är obligatoriska, utan "Phone". Alla fält som är obligatoriska har i sig validering.
               Lämna man fält tom, får man ett felmeddelande.
               Försöker man skriva siffror i "name" "adress" eller "email" får man ett felmeddelande.
               Det går bara att skriva siffror i "Phone".
               Om alla fält fyllas i korrekt, data sparas genom att trycka på Save knapp.
               Autocomplete sätts på "On".
             -  Delivery: Man får välja mellan 3 olika alternativ: varje alternativ har ett namn, ett pris och en leveransdatum.
               Beroende på vilket Fraktsätt man väljer, ändras Totalpris och leveransdatum.
             -  Payment method:   Det går att välja bland tre olika betalningsätt: Visa, Swish och Paypal. När man har väl valt ett så kan man fylla i formulär, som kommer också med validering.
             -  Prisarna som visas på Startsida och DetailView är inklusiv moms. Frakt läggas till i checkout sida.
             -  Totalpris inkl. moms och frakt visas på checkout sida.
             -  När man bekräftar sitt order tömmas alla sparade informationer.

/*..................................... */

Installerade webpack och designsystem
             Vi har använt oss av Blueprint som designsystem. --> https://blueprintjs.com/docs/#blueprint
             Till validering av formulär har vi använt oss av react-hook-form som dependencie.  terminal kommando: < npm install react-hook-form >
                                                                                                documents: https://react-hook-form.com/get-started#Quickstart 
             Till routing har vi använt oss av react-router-dom.   terminal kommando: < npm install --save react-router-dom >
                                                                   documents: https://www.npmjs.com/package/react-router-dom


