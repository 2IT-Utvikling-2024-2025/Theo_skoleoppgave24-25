import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Innleding</h1>
      <p>
        I denne oppgaven skal vi installere Windows, pinge hverandre for å teste kommunikasjon mellom PC-er og sende
        hverandre filer ved hjelp av en lokal server i FileZilla. Vi skulle starte med å planlegge prosessen vår.
      </p>
      <h1>Planlegging</h1>
      <p>
        IP-adressen jeg vil bruke er 192.168.1.84. Navnestandarden min vil være skolePc18. Jeg vil partisjonere disken min
        i 40/160, der 40 av dem vil være til Windows.
      </p>
      <h1>Prosess</h1>
      <p>
        Jeg startet med å gå inn i BIOS. Deretter skrudde jeg av "beepen" fordi den var irriterende. Så plugget jeg inn minnebrikken 
        i PC-en min og fikk hjelp av Kevin med å laste ned Windows 11 via minnebrikken. Jeg jobbet meg gjennom installasjonen 
        til jeg kom til robot-sjekken, som jeg feilet flere ganger. Etter flere forsøk satt jeg fast og bestemte meg for å 
        installere Windows 10 i stedet. Brannmuren blokkerte forsøkene våre på å pinge hverandre, så vi justerte brannmurinnstillingene, 
        og da fungerte det. Vi installerte deretter FileZilla, koblet en klient til serveren, og etter noen justeringer fikk vi det til.
      </p>
      <h1>Brukerveiledning på brannmur</h1>
      <p> Vanligvis blokkerer Windows Firewall ping-meldinger. Dette kan du gjøre:
          Gå inn på Firewall instillinger
          Klikk på Start / Administrative Tools / Windows Firewall med avansert sikkerhet.
          I vinduet for Windows Firewall med avansert sikkerhet, klikk på Inngående regler og deretter på Ny regel i handlinger-panelet.
          Velg Tilpasset regel og klikk Neste.
          Velg Alle programmer og klikk Neste.
          Velg protokolltypen som ICMPv4, og trykk på Tilpass-knappen.
          Velg Spesifikke ICMP-typer og deretter Echo Request. Trykk OK og deretter Neste.
          Velg enten Alle IP-adresser eller spesifikke IP-adresser for å tillate hvilke IP-er du vil godta.
          Klikk Neste når du har gjort innstillingene.
          Velg Tillat tilkoblingen og trykk Neste.
          Gi regelen et navn og klikk Fullfør.
      </p>
      <h1>Notasjoner</h1>
      <p>
        Partisjonering av en harddisk betyr å dele den opp logisk. Dette kan være nyttig for å skille data som endres ofte 
        fra statiske data, noe som kan gjøre sikkerhetskopiering raskere. Under Windows-installasjonen måtte vi logge på med Wi-Fi, 
        men dette kan fjernes senere. Å installere Windows 10 er lettere enn 11 på grunn av mindre innloggingsstyr. Brannmuren 
        blokkerte mer enn nødvendig, så vi måtte justere den etter behov.
      </p>
      <h1>Refleksjon</h1>
      <p>
        Det vi har lært er nyttig, ettersom det gir muligheten til å gjenopprette PC-en ved problemer som virus eller ødelagte filer. 
        Dette understreker viktigheten av å bruke OneDrive til sikkerhetskopiering. FileZilla er et svært effektivt verktøy for 
        filoverføring, men krever justeringer i brannmuren for å fungere optimalt.
      </p>
      <h1>Svar på oppgaven 4 </h1>
      <p>
          Jeg har lært hvordan man installerer Windows, setter opp en server i filezilla og kontrollerer brannmuren. 
          Min Innsatts og fokus har vært på oppgaven, men jeg har falt ut iblant når det blir vanskelig. Alt i alt synes jeg at jeg har stått på.
          Om jeg skulle gjøre oppgaven på nytt ville jeg ha instalert windows 10 istedenfor 11 med en gang og jeg ville brukt mer fokus på å lære meg ting som jeg så andre gjøre. Jeg føler at jeg så på geniene gjøre noe også gjorde jeg det samme uten å tenke meg virkelig om.

      </p>
    </>
  )
}

export default App
