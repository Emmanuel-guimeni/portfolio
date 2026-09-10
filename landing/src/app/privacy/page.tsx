import type { Metadata } from 'next';
import { Footer } from '@/components/Closing';
import Nav from '@/components/Nav';
import { links, site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Comment Mr GUEHEDI Emmanuel collecte, stocke, utilise et protège les données personnelles transmises via ce site.',
  robots: { index: true, follow: true },
};

const UPDATED = '10 septembre 2026';

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="section" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container prose">
          <h1>Politique de confidentialité</h1>
          <p className="muted">Dernière mise à jour : {UPDATED}</p>

          <h2>1. Qui est responsable de vos données</h2>
          <p>
            {site.name}, {site.role}, établi à {site.location.label}, est le responsable
            du traitement des données personnelles collectées via ce site. Vous pouvez me
            joindre à <a href={links.mailto}>{site.email}</a> ou au{' '}
            <a href={links.tel}>{site.phone.display}</a>.
          </p>

          <h2>2. Quelles données sont collectées</h2>
          <p>
            Via le formulaire de contact de ce site, je ne collecte que ce que vous
            transmettez :
          </p>
          <ul>
            <li>Prénom et nom</li>
            <li>Adresse email professionnelle</li>
            <li>Numéro de téléphone / WhatsApp (facultatif)</li>
            <li>Pays, entreprise et fonction (facultatifs)</li>
            <li>Le service qui vous intéresse et votre tranche de budget</li>
            <li>Le message que vous rédigez</li>
            <li>
              Le contexte technique : la page depuis laquelle vous avez envoyé le
              formulaire, et les paramètres de campagne UTM si vous êtes arrivé par un
              lien de campagne
            </li>
          </ul>
          <p>
            Un score de qualification est calculé automatiquement à partir des champs
            ci-dessus. Il s’agit uniquement d’une aide interne à la priorisation : il ne
            produit aucun effet juridique et aucune décision n’est prise sur ce seul
            fondement.
          </p>

          <h2>3. Pourquoi elles sont collectées — et sur quelle base légale</h2>
          <p>
            Vos données servent exclusivement à répondre à votre demande, à préparer une
            proposition et à assurer le suivi de nos échanges. La base légale est votre
            consentement explicite, donné en cochant la case avant l’envoi du formulaire,
            ainsi que les mesures précontractuelles prises à votre demande.
          </p>
          <p>
            Je ne vends pas vos données, je ne les loue pas, et je ne les transmets à
            aucun tiers pour son propre marketing.
          </p>

          <h2>4. Où elles sont stockées</h2>
          <p>
            Les demandes sont enregistrées dans une base de données PostgreSQL (Supabase)
            dont l’accès m’est réservé. Les données peuvent être transmises aux
            sous-traitants suivants, utilisés strictement pour faire fonctionner ce site
            et assurer mon suivi : l’hébergeur, le fournisseur d’emails transactionnels
            et, le cas échéant, un CRM ou une plateforme d’automatisation utilisés pour
            gérer l’échange.
          </p>

          <h2>5. Combien de temps elles sont conservées</h2>
          <p>
            Les demandes qui ne débouchent pas sur une collaboration sont conservées au
            maximum 3 ans à compter de notre dernier contact, puis supprimées. Les données
            liées à une mission signée sont conservées pendant la durée du contrat, puis
            selon les durées légales applicables aux documents commerciaux et comptables.
          </p>

          <h2>6. Vos droits</h2>
          <p>
            Vous disposez d’un droit d’accès, de rectification, d’effacement, de
            limitation et de portabilité de vos données, d’un droit d’opposition au
            traitement, et du droit de retirer votre consentement à tout moment — sans
            effet sur les traitements réalisés avant ce retrait. Écrivez à{' '}
            <a href={links.mailto}>{site.email}</a> et je vous répondrai sous un mois.
          </p>
          <p>
            Au Maroc, vous pouvez également saisir la CNDP (Commission Nationale de
            contrôle de la protection des Données à caractère Personnel). Si vous résidez
            dans l’Union européenne, vous pouvez saisir l’autorité de contrôle de votre
            pays.
          </p>

          <h2>7. Cookies et mesure d’audience</h2>
          <p>
            Ce site ne charge aucun cookie de mesure d’audience ou de publicité tant que
            la balise correspondante n’a pas été explicitement configurée par
            l’éditeur du site. Lorsque Google Analytics 4, Google Tag Manager, le pixel
            Meta ou le tag LinkedIn Insight sont actifs, ils déposent des cookies de
            mesure d’audience et d’attribution de campagne. Une petite quantité de données
            est également conservée dans le stockage de session de votre navigateur pour
            mémoriser la campagne qui vous a amené ici ; elle ne quitte jamais votre
            navigateur tant que vous n’envoyez pas le formulaire.
          </p>

          <h2>8. Sécurité</h2>
          <p>
            Les données transitent en HTTPS, sont validées et nettoyées côté serveur, sont
            protégées par une limitation du débit contre les abus et par des mécanismes
            anti-spam. L’accès d’administration est authentifié et restreint. Aucun
            identifiant ni clé d’API n’est jamais exposé dans le navigateur.
          </p>

          <h2>9. Modifications</h2>
          <p>
            Cette politique peut être mise à jour. La date en haut de cette page
            correspond toujours à la version en vigueur.
          </p>

          <p style={{ marginTop: '2.5rem' }}>
            <a className="btn btn--ghost" href="/">
              ← Retour au site
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
